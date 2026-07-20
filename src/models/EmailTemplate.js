import mongoose from 'mongoose'

const EmailTemplateSchema = new mongoose.Schema({
  name:      { type: String, required: true, unique: true },
  // name codes: inquiry_received | lead_assigned | lead_status_update |
  //             newsletter_welcome | quote_followup
  subject:   { type: String, required: true },
  body:      { type: String, required: true },             // HTML with {{placeholders}}
  variables: [String],                                     // e.g. ['{{name}}','{{product}}']
  isActive:  { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.EmailTemplate || mongoose.model('EmailTemplate', EmailTemplateSchema)
