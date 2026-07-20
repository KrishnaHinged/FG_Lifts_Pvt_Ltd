import mongoose from 'mongoose'

const InquirySchema = new mongoose.Schema({
  name:            { type: String, required: true, trim: true },
  email:           { type: String, required: true, lowercase: true },
  phone:           { type: String, required: true },
  company:         { type: String, trim: true },
  city:            { type: String, trim: true },
  elevatorType:    { type: String },
  floorCount:      { type: String },
  message:         { type: String },
  status:          { type: String, enum: ['New','Contacted','Qualified','Closed','Rejected'], default: 'New' },
  source:          { type: String, default: 'Website Contact Form' },
  assignedTo:      { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  assignedBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  assignedAt:      { type: Date },
  notes: [{
    text:          { type: String, required: true },
    adminName:     { type: String, required: true },
    adminId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    createdAt:     { type: Date, default: Date.now }
  }]
}, { timestamps: true })

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema)
