import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) throw new Error('MONGODB_URI not set in .env')

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
