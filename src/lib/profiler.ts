import {BSON, type Db, MongoClient} from 'mongodb'
import {createWriteStream} from 'node:fs'
import {mkdir} from 'node:fs/promises'
import {dirname} from 'node:path'

const {EJSON} = BSON

export async function connectMongo(uri: string): Promise<MongoClient> {
  const client = new MongoClient(uri)
  await client.connect()
  return client
}

export async function listDatabases(client: MongoClient): Promise<string[]> {
  const result = await client.db('admin').admin().listDatabases()
  return result.databases.map((d) => d.name)
}

export async function hasProfileCollection(db: Db): Promise<boolean> {
  const cols = await db.listCollections({name: 'system.profile'}, {nameOnly: true}).toArray()
  return cols.length > 0
}

export async function exportProfileCollection(db: Db, outFile: string): Promise<number> {
  // 把 system.profile 全部文档以 EJSON Lines 格式写入 outFile，返回导出条数
  await mkdir(dirname(outFile), {recursive: true})
  const stream = createWriteStream(outFile, {encoding: 'utf8'})
  const cursor = db.collection('system.profile').find({})
  let count = 0
  try {
    for await (const doc of cursor) {
      stream.write(EJSON.stringify(doc) + '\n')
      count++
    }
  } finally {
    stream.end()
  }

  await new Promise<void>((res, rej) => {
    stream.on('finish', () => res())
    stream.on('error', rej)
  })
  return count
}

export async function dropProfileCollection(db: Db): Promise<void> {
  // MongoDB 要求 drop system.profile 前必须先关闭 profiler，否则会报错
  await db.command({profile: 0})
  await db.collection('system.profile').drop()
}

export interface SetProfilingLevelOptions {
  slowms?: number
}

export async function setProfilingLevel(
  db: Db,
  level: 0 | 1 | 2,
  options: SetProfilingLevelOptions = {},
): Promise<void> {
  const cmd: Record<string, unknown> = {profile: level}
  if (options.slowms !== undefined) cmd.slowms = options.slowms
  await db.command(cmd)
}

export interface ProfilingStatus {
  sampleRate?: number
  slowms: number
  was: number
}

export async function getProfilingStatus(db: Db): Promise<ProfilingStatus> {
  const r = await db.command({profile: -1})
  return {sampleRate: r.sampleRate, slowms: r.slowms, was: r.was}
}

export interface ProfileEntry {
  [key: string]: unknown
  docsExamined?: number
  keysExamined?: number
  millis?: number
  nreturned?: number
  ns?: string
  op?: string
  planSummary?: string
  ts?: Date
}

export async function queryProfileEntries(
  db: Db,
  query: Record<string, unknown>,
  limit: number,
): Promise<ProfileEntry[]> {
  // eslint-disable-next-line unicorn/no-array-callback-reference
  return db.collection<ProfileEntry>('system.profile').find(query).sort({ts: -1}).limit(limit).toArray()
}
