# CURSOR_RULES.md — Cursor AI Rules

- Do not create TypeScript (.ts/.tsx) files.
- Always check `@/components/ui` and `@/components/layouts` before creating new markup.
- Ensure all API routes pass through `createSecureApiPipeline` in `@/security/validator`.
- Use `@/seo/metadata` for Next.js page metadata generation.
