import mongoose from 'mongoose'

const EmailQueueSchema = new mongoose.Schema({
  to:            { type: String, required: true },
  subject:       { type: String, required: true },
  body:          { type: String, required: true },         // compiled HTML
  status:        { type: String, enum: ['pending','sent','failed'], default: 'pending' },
  attempts:      { type: Number, default: 0 },
  maxAttempts:   { type: Number, default: 3 },
  lastAttemptAt: { type: Date },
  sentAt:        { type: Date },
  error:         { type: String },
  templateName:  { type: String },
  relatedId:     { type: String },                         // inquiry or user ID for context
}, { timestamps: true })

export default mongoose.models.EmailQueue || mongoose.model('EmailQueue', EmailQueueSchema)
