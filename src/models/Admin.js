import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:    { type: String, required: true },           // bcrypt hashed
  role:        {
    type: String,
    enum: ['SUPER_ADMIN','SALES_MANAGER','SALES_EXECUTIVE','MARKETING_MANAGER','CONTENT_EDITOR'],
    required: true
  },
  isActive:    { type: Boolean, default: true },
  permissions: [String],                                   // optional overrides
  lastLoginAt: { type: Date },
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true })

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema)
