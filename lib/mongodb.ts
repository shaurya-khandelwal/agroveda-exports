import { MongoClient } from 'mongodb'

function getMongoUri() {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL
  if (!uri) {
    throw new Error('Missing MONGODB_URI (or DATABASE_URL) environment variable')
  }
  return uri
}

function getMongoDbName() {
  const fromEnv = process.env.MONGODB_DB
  if (fromEnv) return fromEnv

  const uri = getMongoUri()
  try {
    const url = new URL(uri)
    const pathname = url.pathname.replace(/^\//, '')
    if (pathname) return pathname
  } catch {
    // ignore; fall back below
  }

  return 'agroveda'
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = getMongoUri()

const clientPromise =
  globalThis._mongoClientPromise ??
  new MongoClient(uri, {
    maxPoolSize: 10,
  }).connect()

if (process.env.NODE_ENV !== 'production') {
  globalThis._mongoClientPromise = clientPromise
}

export async function getDb() {
  const client = await clientPromise
  return client.db(getMongoDbName())
}

