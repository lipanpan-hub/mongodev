import {Command, Flags} from '@oclif/core'
import Table from 'cli-table3'
import {BSON} from 'mongodb'
import prompts from 'prompts'

import {
  connectMongo,
  hasProfileCollection,
  listDatabases,
  type ProfileEntry,
  queryProfileEntries,
} from '../../lib/profiler.js'

const {EJSON} = BSON

export default class ProfilerList extends Command {
  static override description = '列出指定数据库的 system.profile 记录，按 ts 降序排列'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> -d mydb',
    '<%= config.bin %> <%= command.id %> -d mydb -l 100 --full',
    '<%= config.bin %> <%= command.id %> -d mydb -f \'{"op":"query","millis":{"$gte":100}}\'',
  ]
  static override flags = {
    db: Flags.string({
      char: 'd',
      description: '数据库名，未指定则通过交互方式选择',
    }),
    filter: Flags.string({
      char: 'f',
      description: 'MongoDB 查询过滤器（EJSON 字符串），例如 \'{"op":"query"}\'',
    }),
    full: Flags.boolean({
      default: false,
      description: '输出每条记录的完整字段（默认仅显示关键字段）',
    }),
    limit: Flags.integer({
      char: 'l',
      default: 50,
      description: '最多返回多少条记录',
    }),
    uri: Flags.string({
      char: 'u',
      default: 'mongodb://localhost:27017',
      description: 'MongoDB 连接 URI',
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(ProfilerList)

    // #region 解析过滤器
    let filter: Record<string, unknown> = {}
    if (flags.filter) {
      try {
        filter = EJSON.parse(flags.filter) as Record<string, unknown>
      } catch (error) {
        this.error(`过滤器解析失败：${(error as Error).message}`)
      }
    }
    // #endregion

    this.log(`正在连接到 ${flags.uri} ...`)
    const client = await connectMongo(flags.uri)

    try {
      // #region 选择数据库
      let dbName = flags.db
      if (!dbName) {
        const databases = await listDatabases(client)
        if (databases.length === 0) {
          this.error('未发现任何数据库')
        }

        const response = await prompts({
          choices: databases.map((name) => ({title: name, value: name})),
          message: '请选择要查看 Profiler 数据的数据库：',
          name: 'dbName',
          type: 'autocomplete',
        })

        if (!response.dbName) {
          this.log('已取消')
          return
        }

        dbName = response.dbName as string
      }

      const db = client.db(dbName)
      // #endregion

      // #region 检查 system.profile 是否存在
      if (!(await hasProfileCollection(db))) {
        this.error(`数据库 "${dbName}" 不存在 system.profile 集合，请先开启 Profiler`)
      }
      // #endregion

      // #region 查询并输出
      const entries = await queryProfileEntries(db, filter, flags.limit)
      if (entries.length === 0) {
        this.log('没有匹配的记录')
        return
      }

      this.log(`共 ${entries.length} 条记录（按 ts 降序）：`)
      if (flags.full) {
        for (const entry of entries) {
          this.log(EJSON.stringify(entry))
        }
      } else {
        const table = new Table({
          head: ['timestamp', 'op', 'ns', 'millis', 'planSummary', 'nreturned', 'examined'],
          style: {head: ['cyan']},
        })
        for (const entry of entries) {
          const ts = entry.ts ? new Date(entry.ts).toISOString() : '-'
          table.push([
            ts,
            entry.op ?? '-',
            entry.ns ?? '-',
            entry.millis === undefined ? '-' : `${entry.millis}ms`,
            entry.planSummary ?? '-',
            entry.nreturned ?? '-',
            entry.docsExamined ?? '-',
          ])
        }

        this.log(table.toString())
      }
      // #endregion
    } finally {
      await client.close()
    }
  }
}
