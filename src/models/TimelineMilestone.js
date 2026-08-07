import mongoose from 'mongoose'

const TimelineMilestoneSchema = new mongoose.Schema({
  year:      { type: String, required: true, trim: true },
  title:     { type: String, required: true, trim: true },
  desc:      { type: String, required: true, trim: true },
  image:     { type: String, default: '', trim: true },
  highlight: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  isActive:  { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.TimelineMilestone || mongoose.model('TimelineMilestone', TimelineMilestoneSchema)
