import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) throw new Error('MONGODB_URI not set in .env')

let cached = global.mongoose || { conn: null, promise: null }
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

  // If disconnected or disconnecting, reset and reconnect
  try {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: 'fglifts',
      serverSelectionTimeoutMS: 4000, // Fail fast after 4 seconds
      connectTimeoutMS: 4000
    })
    cached.conn = await cached.promise
  } catch (err) {
    console.warn(`[MongoDB] Atlas connection failed (${err.message}). Trying local database fallback...`)
    const LOCAL_URI = 'mongodb://127.0.0.1:27017/fglifts'
    try {
      cached.promise = mongoose.connect(LOCAL_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 2000, // Fail fast after 2 seconds
        connectTimeoutMS: 2000
      })
      cached.conn = await cached.promise
      console.log(`[MongoDB] Successfully connected to local database: ${LOCAL_URI}`)
    } catch (localErr) {
      console.error(`[MongoDB] Database connection failed completely: ${localErr.message}`)
      cached.promise = null
      cached.conn = null
      throw new Error(`Database connection failed completely: ${localErr.message}`)
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
