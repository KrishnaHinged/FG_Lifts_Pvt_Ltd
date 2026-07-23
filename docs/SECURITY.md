# Security & Quality Guide — FG Lift Pvt. Ltd.

## Security Controls (`src/security/`)
- **HTTP Security Headers**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options enforced via `headers.js`.
- **Sliding Window Rate Limiter**: Configurable rate limit maps in `rateLimit.js`.
- **Input Sanitization**: XSS and HTML input sanitizer in `sanitizer.js`.
- **Authentication & Roles**: JWT token verification in `auth.js` and role permission checking in `permissions.js`.
- **API Pipeline Validator**: Unifies rate limit, auth, permission, sanitization, and logger into `validator.js`.
- **Centralized Logger**: Structured logs with timestamps in `logger.js`.
