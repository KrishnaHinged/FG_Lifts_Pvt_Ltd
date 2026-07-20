import mongoose from 'mongoose'

const SubscriberSchema = new mongoose.Schema({
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  name:         { type: String, trim: true },
  source:       { type: String, default: 'Footer Form' },
  isActive:     { type: Boolean, default: true },
  confirmedAt:  { type: Date },
  unsubscribedAt: { type: Date },
  tags:         [String],
}, { timestamps: true })

export default mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema)
