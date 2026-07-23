# CLAUDE.md — Claude Code Guidelines

## Core Directives
- **Language Stack**: JavaScript (.js) and JSX (.jsx) only. No TypeScript.
- **Design Language**: Follow enterprise design system guidelines. Use Inter as the universal sans-serif font.
- **Build Commands**:
  - Dev server: `npm run dev`
  - Production build: `npm run build`
  - Start production: `npm run start`

## Preferred Code Structure
- Imports: Next.js / React → Lucide Icons → Design System UI → Helpers / Services.
- Path aliases: `@/components`, `@/design-system`, `@/seo`, `@/performance`, `@/security`.
