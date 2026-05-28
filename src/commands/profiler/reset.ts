import {Command, Flags} from '@oclif/core'
import {resolve} from 'node:path'
import prompts from 'prompts'

import {
  connectMongo,
  dropProfileCollection,
  exportProfileCollection,
  getProfilingStatus,
  hasProfileCollection,
  listDatabases,
  setProfilingLevel,
} from '../../lib/profiler.js'

export default class ProfilerReset extends Command {
  static override description = '重置 MongoDB 的 Profiler，将采集粒度设置为 1（slow operations）'
static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> -u mongodb://localhost:27017',
    '<%= config.bin %> <%= command.id %> --slowms 50',
  ]
static override flags = {
    slowms: Flags.integer({
      description: 'profiler 慢操作阈值（毫秒），未指定则保持 MongoDB 当前 slowms',
    }),
    uri: Flags.string({
      char: 'u',
      default: 'mongodb://localhost:27017',
      description: 'MongoDB 连接 URI',
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(ProfilerReset)

    this.log(`正在连接到 ${flags.uri} ...`)
    const client = await connectMongo(flags.uri)

    try {
      // #region 选择数据库
      const databases = await listDatabases(client)
      if (databases.length === 0) {
        this.error('未发现任何数据库')
      }

      const {dbName} = await prompts({
        choices: databases.map((name) => ({title: name, value: name})),
        message: '请选择要重置 Profiler 的数据库：',
        name: 'dbName',
        type: 'autocomplete',
      })

      if (!dbName) {
        this.log('已取消')
        return
      }

      const db = client.db(dbName)
      // #endregion

      // #region 处理已有的 system.profile
      if (await hasProfileCollection(db)) {
        const {action} = await prompts({
          choices: [
            {title: '导出后删除', value: 'export'},
            {title: '直接删除', value: 'drop'},
            {title: '取消', value: 'cancel'},
          ],
          initial: 0,
          message: `数据库 "${dbName}" 已存在 system.profile，请选择处理方式：`,
          name: 'action',
          type: 'select',
        })

        if (!action || action === 'cancel') {
          this.log('已取消')
          return
        }

        if (action === 'export') {
          const ts = new Date().toISOString().replaceAll(/[:.]/g, '-')
          const outFile = resolve(process.cwd(), `system.profile.${dbName}.${ts}.jsonl`)
          this.log(`正在导出到 ${outFile} ...`)
          const count = await exportProfileCollection(db, outFile)
          this.log(`已导出 ${count} 条记录`)
        }

        this.log('正在删除 system.profile ...')
        await dropProfileCollection(db)
      }
      // #endregion

      // #region 设置并验证 Profiler
      this.log('正在设置 Profiler 采集粒度为 1 ...')
      await setProfilingLevel(db, 1, {slowms: flags.slowms})

      const status = await getProfilingStatus(db)
      const sampleInfo = status.sampleRate === undefined ? '' : `, sampleRate=${status.sampleRate}`
      this.log(`当前 Profiler 状态：level=${status.was}, slowms=${status.slowms}${sampleInfo}`)

      if (status.was !== 1) {
        this.error(`Profiler 设置失败，当前 level=${status.was}`)
      }

      this.log('Profiler 重置成功！')
      // #endregion
    } finally {
      await client.close()
    }
  }
}
