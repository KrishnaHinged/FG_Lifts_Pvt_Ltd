import mongoose from 'mongoose'

const AuditLogSchema = new mongoose.Schema({
  action:      { type: String, required: true },
  // action codes: admin_login | admin_logout | inquiry_assigned | inquiry_status_changed |
  //               inquiry_note_added | inquiry_deleted | product_created | product_updated |
  //               product_deleted | gallery_created | gallery_updated | gallery_deleted |
  //               blog_created | blog_published | blog_deleted | user_created |
  //               user_deactivated | template_updated | subscriber_exported
  performedBy: {
    adminId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    name:      String,
    email:     String,
    role:      String,
  },
  targetId:    { type: String },                           // ID of affected document
  targetType:  { type: String },                           // 'Inquiry' | 'Product' | 'Admin' etc.
  details:     { type: mongoose.Schema.Types.Mixed },      // any extra context object
  ipAddress:   { type: String },
}, { timestamps: true })

export default mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema)
