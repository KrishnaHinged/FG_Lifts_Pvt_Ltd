import mongoose from 'mongoose'

const MediaUploadSchema = new mongoose.Schema({
  /** Original filename from the upload */
  filename: { type: String, required: true },
  /** MIME type (e.g. image/jpeg, image/png) */
  contentType: { type: String, required: true },
  /** Base64-encoded image data (stored without the data:... prefix) */
  data: { type: String, required: true },
  /** Byte size of the original image data */
  size: { type: Number, default: 0 },
  /** Context tag for organization (e.g. '360-texture', 'product-photo') */
  context: { type: String, default: 'general' },
}, { timestamps: true })

export default mongoose.models.MediaUpload || mongoose.model('MediaUpload', MediaUploadSchema)
