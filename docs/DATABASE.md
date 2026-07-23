# Database Architecture — FG Lift Pvt. Ltd.

## MongoDB Models (`src/models/`)
- `Product.js`: Product systems, tab groups, specifications, 360 views.
- `Inquiry.js`: CRM leads, contact details, status workflows, assigned staff.
- `GalleryProject.js`: Landmark project listings, locations, client types.
- `BlogPost.js`: Editorial articles, SEO metadata, categories, views count.
- `Subscriber.js`: Newsletter subscribers and activation state.
- `AdminUser.js`: System operators, roles, and hashed credentials.
- `AuditLog.js`: Immutable audit history of system operations.
- `EmailQueue.js`: Outbox queue for asynchronous email worker processing.

## Repository Pattern (`src/repositories/`)
Database operations are isolated within repositories to ensure business logic decoupled from Mongoose directly.
