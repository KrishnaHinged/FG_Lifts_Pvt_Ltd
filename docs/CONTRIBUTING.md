# Contributing Guidelines — FG Lift Pvt. Ltd.

## Coding Standards
1. **JavaScript & JSX Only**: Do not introduce TypeScript.
2. **Component Reuse**: Reuse existing UI primitives in `src/components/ui/` and `src/components/layouts/`.
3. **API Security**: Run all API handlers through `createSecureApiPipeline` in `@/security/validator`.
4. **Metadata**: Define metadata using `generatePageMetadata` in `@/seo/metadata`.
