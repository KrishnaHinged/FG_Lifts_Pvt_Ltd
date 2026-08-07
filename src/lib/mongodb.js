import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) throw new Error('MONGODB_URI not set in .env')

let cached = global.mongoose || { conn: null, promise: null, activeUri: null }
global.mongoose = cached

export async function connectDB() {
  const readyState = mongoose.connection.readyState

  // If already connected, return the connection
  if (readyState === 1) {
    return mongoose.connection
  }

  // If connecting, wait for the existing promise
  if (readyState === 2 && cached.promise) {
    try {
      await cached.promise
      return mongoose.connection
    } catch (e) {
      cached.promise = null
    }
  }

  const LOCAL_URI = 'mongodb://127.0.0.1:27017/fglifts'
  const targetUri = cached.activeUri || global._activeMongoUri || MONGODB_URI

  try {
    cached.promise = mongoose.connect(targetUri, {
      bufferCommands: false,
      dbName: 'fglifts',
      serverSelectionTimeoutMS: targetUri === MONGODB_URI ? 800 : 500,
      connectTimeoutMS: targetUri === MONGODB_URI ? 800 : 500
    })
    cached.conn = await cached.promise
    cached.activeUri = targetUri
    global._activeMongoUri = targetUri
  } catch (err) {
    if (targetUri !== LOCAL_URI) {
      console.warn(`[MongoDB] Atlas connection failed (${err.message}). Connecting to local database...`)
      try {
        cached.promise = mongoose.connect(LOCAL_URI, {
          bufferCommands: false,
          serverSelectionTimeoutMS: 500,
          connectTimeoutMS: 500
        })
        cached.conn = await cached.promise
        cached.activeUri = LOCAL_URI
        global._activeMongoUri = LOCAL_URI
        console.log(`[MongoDB] Connected to local database: ${LOCAL_URI}`)
      } catch (localErr) {
        console.error(`[MongoDB] Database connection failed completely: ${localErr.message}`)
        cached.promise = null
        cached.conn = null
        throw new Error(`Database connection failed completely: ${localErr.message}`)
      }
    } else {
      cached.promise = null
      cached.conn = null
      throw err
    }
  }

  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || !!process.env.VERCEL
  if (typeof window === 'undefined' && !isBuildPhase) {
    // Dynamic import to prevent client bundling issues in dev/standalone environments
    import('./email-worker.js').then((worker) => {
      worker.startEmailWorker()
    }).catch(err => console.error('Failed to load email worker:', err))
  }
  return cached.conn
}
