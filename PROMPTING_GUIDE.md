# PROMPTING_GUIDE.md — AI Prompting Templates

## Adding a New Page
"Create a new page under `src/app/<feature>/page.js`. Wrap page sections with `<Section>` and `<Container>` from `@/components/layouts`. Generate SEO metadata using `generatePageMetadata` from `@/seo/metadata`."

## Adding a New API Route
"Create a new API route in `src/app/api/<route>/route.js`. Use `createSecureApiPipeline` from `@/security/validator` to enforce rate limiting, auth verification, and input sanitization."
