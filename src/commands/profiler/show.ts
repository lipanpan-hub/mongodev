import {Command, Flags} from '@oclif/core'
import prompts from 'prompts'

import {
  connectMongo,
  getProfilingStatus,
  hasProfileCollection,
  listDatabases,
} from '../../lib/profiler.js'

const LEVEL_DESCRIPTIONS: Record<number, string> = {
  0: '0 (关闭)',
  1: '1 (仅采集慢操作)',
  2: '2 (采集所有操作)',
}

export default class ProfilerShow extends Command {
  static override description = '查看指定数据库的 Profiler 状态信息'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> -d mydb',
    '<%= config.bin %> <%= command.id %> -d mydb -u mongodb://localhost:27017',
  ]
  static override flags = {
    db: Flags.string({
      char: 'd',
      description: '数据库名，未指定则通过交互方式选择',
    }),
    uri: Flags.string({
      char: 'u',
      default: 'mongodb://localhost:27017',
      description: 'MongoDB 连接 URI',
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(ProfilerShow)

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
          message: '请选择要查看 Profiler 状态的数据库：',
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

      // #region 查询并输出 Profiler 状态
      const status = await getProfilingStatus(db)
      const hasProfile = await hasProfileCollection(db)

      this.log(`数据库 "${dbName}" 的 Profiler 状态：`)
      this.log(`  level         : ${LEVEL_DESCRIPTIONS[status.was] ?? status.was}`)
      this.log(`  slowms        : ${status.slowms} ms`)
      if (status.sampleRate !== undefined) {
        this.log(`  sampleRate    : ${status.sampleRate}`)
      }

      this.log(`  system.profile: ${hasProfile ? '已存在' : '不存在'}`)
      if (hasProfile) {
        const count = await db.collection('system.profile').estimatedDocumentCount()
        this.log(`  记录数量      : ${count}`)
      }
      // #endregion
    } finally {
      await client.close()
    }
  }
}
