import mongoose from 'mongoose'

const BlogPostSchema = new mongoose.Schema({
  slug:          { type: String, required: true, unique: true, lowercase: true, trim: true },
  title:         { type: String, required: true, trim: true },
  excerpt:       { type: String },
  coverImage:    { type: String },
  coverImageAlt: { type: String, default: '' },
  content:       { type: String },
  category:      { type: String },
  tags:          [String],
  author: {
    name:   { type: String, default: 'FG Lift Editorial Team' },
    avatar: { type: String },
    title:  { type: String, default: 'Content Team' },
  },
  readTime:      { type: Number },
  isPublished:   { type: Boolean, default: false },
  isFeatured:    { type: Boolean, default: false },
  publishedAt:   { type: Date },
  views:         { type: Number, default: 0 },
  relatedSlugs:  [String],
}, { timestamps: true })

// Auto-calculate read time before save
BlogPostSchema.pre('save', function() {
  if (this.content) {
    const wordCount = this.content.replace(/<[^>]+>/g, '').split(/\s+/).length
    this.readTime = Math.max(1, Math.ceil(wordCount / 200))
  }
})

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema)
