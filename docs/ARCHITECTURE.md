# System Architecture Documentation — FG Lift Pvt. Ltd.

## Overview
FG Lift Pvt. Ltd. is an enterprise-grade Next.js App Router application built with a decoupled component-first architecture, clean domain repositories, centralized design system tokens, and strict security and SEO layers.

## High-Level System Layers
```
┌─────────────────────────────────────────────────────────┐
│                     Next.js App Router                  │
│                (src/app/ public & admin)                │
└────────────────────────────┬────────────────────────────┘
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
┌──────────────┐    ┌──────────────────┐   ┌─────────────────┐
│ UI & Design  │    │ SEO & Analytics  │   │ Security Layer  │
│ System Tokens│    │  (src/seo/)      │   │ (src/security/) │
└──────────────┘    └──────────────────┘   └─────────────────┘
     │                       │                       │
     └───────────────────────┼───────────────────────┘
                             ▼
                 ┌───────────────────────┐
                 │ Services & Repositories│
                 │ (src/services/ & repo)│
                 └───────────┬───────────┘
                             ▼
                 ┌───────────────────────┐
                 │ MongoDB & Data Models │
                 │    (src/models/)      │
                 └───────────────────────┘
```

## Key Architectural Principles
- **JavaScript & JSX Only**: Zero TypeScript.
- **Component-First Strategy**: Pages are assembled using reusable primitives (`Section`, `Container`, `Grid`, `Heading`, `Badge`, `SearchBar`, etc.).
- **Security-First API Pipeline**: Every API handler runs through authentication, permission checking, sanitization, rate limiting, and safe logging.
- **Dynamic SEO System**: Centralized JSON-LD schemas, OpenGraph metadata, and dynamic breadcrumbs.
