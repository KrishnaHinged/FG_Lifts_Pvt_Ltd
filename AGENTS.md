# AGENTS.md — AI Coding Assistant Directives for FG Lift Pvt. Ltd.

## Project Overview
FG Lift Pvt. Ltd. is an enterprise-grade elevator engineering and manufacturing web application built with Next.js App Router, Tailwind CSS v4, Framer Motion, GSAP, and Three.js.

## Strict Technology Constraints
- **JavaScript & JSX ONLY**: Every component, utility, helper, and API route must be written strictly in **JavaScript (.js)** and **JSX (.jsx)**.
- **NO TypeScript**: NEVER introduce `.ts` or `.tsx` files, type annotations, or TypeScript dependencies.
- **Tailwind CSS v4 & Custom Tokens**: Use design system CSS custom properties defined in `globals.css` and token objects in `src/design-system/tokens/`.

## Architecture Principles
1. **Layer Separation**:
   - Component UI: `src/components/` & `src/layouts/`
   - Design System Tokens: `src/design-system/tokens/`
   - Business Logic & Repositories: `src/repositories/` & `src/services/`
   - Data Validators: `src/validators/`
   - Security & Auth: `src/security/`
   - SEO Engine: `src/seo/`
   - Performance Helpers: `src/performance/`
2. **Reusability**:
   - Never build ad-hoc custom cards or raw HTML buttons when reusable design system primitives exist in `src/components/ui/` and `src/components/layouts/`.
   - Page compositions must inherit from `Section`, `Container`, `Grid`, and `PageHeader`.

## Motion Philosophy
- Framer Motion is the primary engine for React component scroll & entry animations.
- GSAP is used for advanced timeline-based sequences.
- Three.js is restricted to the 360° interactive elevator cabin customizer in `src/components/360/`. Always dispose geometries and materials on unmount.
