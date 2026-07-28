import mongoose from 'mongoose'

const DEFAULT_MONGODB_URI = 'mongodb+srv://salesfirozgerelevator_db_user:yPvOETDfYwwCoJjT@cluster0.6zok6qu.mongodb.net/'
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI

let cached = global.mongoose || { conn: null, promise: null }
global.mongoose = cached

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: 'fglifts'
    })
  }
  cached.conn = await cached.promise
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || !!process.env.VERCEL
  if (typeof window === 'undefined' && !isBuildPhase) {
    // Dynamic import to prevent client bundling issues in dev/standalone environments
    import('./email-worker.js').then((worker) => {
      worker.startEmailWorker()
    }).catch(err => console.error('Failed to load email worker:', err))
  }
  return cached.conn
}
