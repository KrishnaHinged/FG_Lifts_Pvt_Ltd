# API Reference — FG Lift Pvt. Ltd.

## Endpoints Summary

### Public APIs
- `POST /api/contact`: Public lead submission endpoint.
- `POST /api/newsletter`: Newsletter subscription endpoint.
- `GET /api/products`: Public product list query endpoint.
- `GET /api/blog`: Public blog posts query endpoint.

### Admin APIs (`/api/admin/`)
- `POST /api/admin/auth/login`: Admin session authentication.
- `POST /api/admin/auth/logout`: Admin session termination.
- `GET / POST / PATCH / DELETE /api/admin/products`: Product CRUD.
- `GET / POST / PATCH / DELETE /api/admin/gallery`: Gallery CRUD.
- `GET / POST / PATCH / DELETE /api/admin/blog`: Blog CRUD.
- `GET / PATCH / DELETE /api/admin/inquiries`: Lead CRM pipeline API.
- `GET / POST / DELETE /api/admin/users`: Team member access management.
- `GET /api/admin/logs`: Audit trail queries.

## Security Middleware
All admin API routes enforce authentication, permission checking, rate limiting, and input sanitization via `createSecureApiPipeline` in `src/security/validator.js`.
