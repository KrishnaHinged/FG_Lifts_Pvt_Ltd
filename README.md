# FG Lift Pvt. Ltd.

[![Next.js Version](https://img.shields.io/badge/Next.js-16.2.10-black?logo=nextdotjs)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev/)
[![Tailwind CSS Version](https://img.shields.io/badge/Tailwind_CSS-v4.0.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Mongoose Version](https://img.shields.io/badge/Mongoose-9.7.4-red?logo=mongodb)](https://mongoosejs.com/)
[![Three.js Version](https://img.shields.io/badge/Three.js-v0.185.1-black?logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-Proprietary%20%2F%20Commercial-brightgreen)](#)

---

## 1. Project Overview

**FG Lift Pvt. Ltd.** (Future & Growth) is an established enterprise vertical mobility engineering firm based in Surat, Gujarat. Operating since 1993, FG Lift engineers premium passenger elevators, heavy-duty industrial goods lifts, panoramic glass capsule lifts, villa home elevators, and luxury customized cabin enclosures.

This web application is a full-stack B2B enterprise platform and digital showroom. It merges an aesthetic public visual showcase with an interactive WebGL Three.js 360° cabin customizer, dedicated Home Lift visualizers, an editorial publication platform, an internal Product Information Management (PIM) suite, dynamic Site Settings engine, centralized Media Library, and an advanced CRM Administration Console (`/admin`).

### Key Features & Architectural Pillars
- **Public Digital Showroom:** Asymmetric modern layout, Lenis smooth scrolling, GSAP ScrollTrigger timelines, and Framer Motion micro-interactions.
- **Interactive Three.js 360° Cabin Customizer:** WebGL equirectangular spherical and 3:5 cubic room geometry renderer allowing real-time texture and finish configuration with interactive image cropper/adjuster canvas.
- **Dedicated Home Lift Configurator:** Custom interactive showcase showcasing cabin styles, art walls, accessories, parameters, and mechanical systems.
- **Product Information Management (PIM):** Specialized multi-section administration workspace for elevator catalogs (`/admin/products`).
- **Enterprise Lead Pipeline (CRM):** Interactive Kanban drag-and-drop lead board (`@hello-pangea/dnd`) with status tracking, lead assignments, executive filtering, and CSV export.
- **Role-Based Access Control (RBAC):** Edge-gated authentication (`middleware.js`) supporting 5 distinct enterprise roles (`SUPER_ADMIN`, `SALES_MANAGER`, `SALES_EXECUTIVE`, `MARKETING_MANAGER`, `CONTENT_EDITOR`).
- **Asynchronous Email Pipeline:** Database email queue system (`EmailQueue`) polled by a background worker (`email-worker.js`) every 15 seconds with Nodemailer SMTP delivery and local HTML dev fallback.
- **Enterprise Core Engines:** Built-in Input Validators (`src/validators/`), Rate Limiting & HTML Sanitizer (`src/security/`), Dynamic SEO JSON-LD & Sitemap engine (`src/seo/`), In-Memory TTL Cache (`src/performance/`), and 12-Provider stack (`src/providers/`).
- **Immutable Audit Logging:** System-wide operational activity tracking with admin attribution, timestamping, and IP tracing.

---

## 2. Live Demo & Deployment Credentials

- **Production URL:** `https://fglifts.com` *(or configured domain)*
- **Admin Panel:** `[production-url]/admin`
- **Default Super Admin Account:** `admin@fglifts.com`
- **Default Super Admin Password:** `FGLift@Admin2025!` *(Must be changed immediately upon deployment)*

---

## 3. Tech Stack & Complete Dependency Matrix

### Architecture Core

| Category | Technology | Version | Description |
|---|---|---|---|
| **Framework** | Next.js (App Router) | `16.2.10` | React server-rendered framework with Turbopack compilation |
| **UI Library** | React | `19.2.4` | Concurrent UI library |
| **Language** | JavaScript (ES6+ / JSX) | Pure ECMAScript | Strict JavaScript without TypeScript build overhead |
| **Styling** | Tailwind CSS | `v4.0.0` | CSS-first custom token configurations & utility classes |
| **3D / WebGL** | Three.js | `^0.185.1` | WebGL 3D canvas rendering engine for 360° cabin customizer |
| **Animation (Scroll)** | Lenis | `^1.3.25` | Smooth scrolling engine |
| **Animation (Sequence)**| GSAP | `^3.15.0` | Timeline-based scroll triggers & pin animations |
| **Animation (Motion)** | Framer Motion | `^12.42.2` | Component entry, hover transitions, and gesture physics |
| **Database ODM** | Mongoose / MongoDB | `^9.7.4` | Connection pool & MongoDB object modeling |
| **Auth & Encryption** | Web Crypto / bcryptjs | `^3.0.3` | JWT signatures in HTTP-Only cookies & 12-round password hashing |
| **Drag & Drop** | `@hello-pangea/dnd` | `^18.0.1` | Accessible Kanban drag-and-drop board for CRM pipeline |
| **Markdown Editor** | `@uiw/react-md-editor` | `^4.1.1` | Live split preview Markdown editor for blog posts |
| **Markdown Parser** | `marked` | `^18.0.6` | High-performance client and server Markdown parser |
| **Email Delivery** | Nodemailer | `^9.0.3` | SMTP transport agent |
| **Iconography** | `lucide-react` / `react-icons`| `^1.24.0` / `^5.7.0` | UI icon sets |

---

## 4. Project Architecture

### 4A. System Architecture Diagram

```mermaid
graph TD
    Client([Public Visitor / Mobile User]) -->|HTTP Requests| PublicApp[Public Pages / Home / Products / Gallery / Blog / Home-Lift]
    AdminUser([Admin Account]) -->|Login Request / JWT Cookie| MW[src/middleware.js Edge Gate]

    MW -->|Invalid Token / Unauthenticated| LoginView[/admin/login]
    MW -->|Valid Token / Inject x-pathname| AdminApp[Admin Panel /admin/*]

    subgraph Presentation & UI Layer
        PublicApp --> ComponentLib[src/components/]
        AdminApp --> AdminComponents[src/components/admin/ & src/components/admin/pim/]
        ComponentLib --> ThreeEngine[src/components/product-detail/Lift360Viewer.jsx]
        ComponentLib --> DesignSystem[src/design-system/ & src/providers/]
    end

    subgraph Enterprise Core Engines
        AdminApp & PublicApp --> Validators[src/validators/ Data Sanitizer]
        AdminApp & PublicApp --> SecurityEngine[src/security/ Rate Limiter & Sanitizer]
        PublicApp --> SEOEngine[src/seo/ JSON-LD & Sitemap]
        PublicApp & AdminApp --> CacheEngine[src/performance/ TTL Memory Cache]
    end

    subgraph Data Access Layer
        AdminApp & PublicApp --> Repos[src/repositories/ Repository Layer]
        Repos --> Mappers[src/mappers/ DTO Data Mappers]
        Repos --> Adapters[src/adapters/ Storage & Email Adapters]
        Repos --> ODM[(Mongoose ODM)]
        ODM --> MongoDB[(MongoDB Database)]
    end

    subgraph Asynchronous Email Services
        AdminApp & PublicApp --> ServiceLayer[src/services/email/email.service.js]
        ServiceLayer --> MailQueue[(EmailQueue Collection)]
        Worker[src/lib/email-worker.js 15s Poll Loop] -->|Poll Pending| MailQueue
        Worker -->|SMTP Active| SMTP[Nodemailer Transport]
        Worker -->|Dev Mode Fallback| LocalFiles[/scratch/emails/*.html]
    end
```

### 4B. Detailed Request Flow & Edge Middleware Gating

1. **Public Request Flow:**
   - User navigates to a public page (e.g. `/products/capsule-elevator`).
   - Next.js executes the Server Component `page.js`.
   - The Server Component delegates data retrieval to `product.repository.js`.
   - The repository executes a Mongoose query with `.lean()`, returns a serializable JS object, and maps it using `product.mapper.js`.
   - The SEO Engine (`src/seo/jsonld.js`) injects structured Schema.org JSON-LD scripts into the `<head>`.
   - Next.js streams HTML to the browser wrapped inside the 12-Provider stack (`AppProvider`, `LenisProvider`, `CursorProvider`, etc.).

2. **Admin Request Flow & `x-pathname` Header Injection:**
   - Admin accesses any route starting with `/admin` (e.g. `/admin/inquiries`).
   - Edge Middleware (`src/middleware.js`) intercepts the request.
   - It parses the `fg_admin_token` HTTP-Only cookie and verifies the Web Crypto JWT signature.
   - If invalid, it returns an immediate HTTP 302 redirect to `/admin/login`.
   - If valid, the middleware injects identity headers (`x-admin-id`, `x-admin-email`, `x-admin-role`) and the request path header (`x-pathname: /admin/inquiries`).
   - Root layout (`src/app/layout.js`) reads `x-pathname` via `next/headers` to conditionally bypass public headers/footers and render the `AdminLayoutShell`.

3. **Inquiry Submission & Email Queue Execution:**
   - Visitor submits a contact form.
   - Client sends JSON payload to `POST /api/contact`.
   - `contact.validator.js` validates payload fields; `sanitizer.js` strips malicious HTML.
   - `inquiry.repository.js` creates a new `Inquiry` document in MongoDB.
   - `email.service.js` compiles the `inquiry_received` template, replaces placeholders (`{{name}}`), and inserts a record into `EmailQueue`.
   - Background worker (`email-worker.js`) picks up the record within 15s and dispatches the confirmation email.

---

## 5. Complete File & Directory Structure

```
fg-lift-website/
├── src/
│   ├── adapters/                     # Third-party integration adapters
│   │   ├── email.adapter.js          # Nodemailer SMTP and scratch file adapter
│   │   └── storage.adapter.js        # Local & CDN asset URL resolver
│   ├── app/                          # Next.js App Router Pages & API Endpoints
│   │   ├── about/                    # Public About Page
│   │   ├── admin/                    # Admin Workspace Console Pages
│   │   │   ├── blog/                 # Editorial CMS
│   │   │   ├── dashboard/            # High-level CRM/CMS dashboard
│   │   │   ├── email-templates/      # HTML Email template customizer
│   │   │   ├── forgot-password/      # Password reset flow
│   │   │   ├── gallery/              # Portfolio manager
│   │   │   ├── home-lifts/           # Specialized Home Lifts showcase editor
│   │   │   ├── inquiries/            # CRM Kanban & List lead pipeline
│   │   │   ├── login/                # Admin authentication login view
│   │   │   ├── logs/                 # Immutable audit logs vault
│   │   │   ├── products/             # Product Information Management (PIM)
│   │   │   ├── settings/             # Dynamic site settings & corporate details
│   │   │   ├── testimonials/         # Client reviews manager
│   │   │   └── users/                # Team RBAC roster & access rights
│   │   ├── api/                      # Next.js Server Route Handlers
│   │   │   ├── admin/                # Gated Admin Endpoints (Auth, CRM, CMS, PIM, Settings)
│   │   │   ├── blog/                 # Public blog articles feed
│   │   │   ├── contact/              # Public lead submission endpoint
│   │   │   ├── media/                # Asset upload & media library route
│   │   │   ├── newsletter/           # Public newsletter opt-in/opt-out
│   │   │   ├── products/             # Public elevator catalog feed
│   │   │   ├── seed/                 # Database initialization & wiped seeder endpoint
│   │   │   ├── settings/             # Public site configuration values
│   │   │   └── testimonials/         # Public client reviews feed
│   │   ├── blog/                     # Public Editorial Blog & Article views
│   │   ├── gallery/                  # Public Portfolio Gallery & Project Modal
│   │   ├── home-lift/                # Public Villa Home Lifts interactive showcase
│   │   ├── products/                 # Public Elevators Catalog & 360 Customizer
│   │   ├── error.js                  # Global app error boundary
│   │   ├── global-error.js           # Critical system error boundary
│   │   ├── globals.css               # Design tokens, CSS custom properties & Tailwind setup
│   │   ├── layout.js                 # Root layout with 12-Provider stack & dynamic shell logic
│   │   ├── loading.js                # Global route loading skeleton
│   │   ├── not-found.js              # Custom 404 page
│   │   ├── page.js                   # Public Home Page
│   │   ├── robots.js                 # Dynamic SEO robots.txt generator
│   │   └── sitemap.js                # Dynamic SEO sitemap.xml generator
│   ├── components/                   # React Presentation Components
│   │   ├── 360/                      # Three.js 3D WebGL Configurator & Texture Canvas
│   │   ├── about/                    # About page timeline, values, leadership, manufacturing
│   │   ├── admin/                    # Admin UI components (Kanban, Tables, Modals, Forms)
│   │   │   └── pim/                  # Specialized PIM sections (Media, Specs, Configurator)
│   │   ├── blog/                     # Editorial blog grids, cards, sidebars
│   │   ├── composition/              # Complex UI compositions & section wrappers
│   │   ├── errors/                   # UI error alert cards
│   │   ├── forms/                    # Input elements, dropzones, selectors
│   │   ├── gallery/                  # Portfolio masonry, cards, carousel modals
│   │   ├── home/                     # Landing page sections (Hero, Stats, Showcases, CTA)
│   │   ├── home-lift/                # Dedicated Home Lift sections (ArtWalls, Cabins, Systems)
│   │   ├── intro/                    # Video preloader scrubbing animation
│   │   ├── layouts/                  # Reusable Section, Container, and Grid primitives
│   │   ├── loading/                  # Shimmer skeletons & spinners
│   │   ├── newsletter/               # Subscription strip & inline forms
│   │   ├── product-detail/           # Lift360Viewer, Specs table, Application chips
│   │   ├── products/                 # Product cards, filter pillbars, grid managers
│   │   ├── typography/               # Standardized heading & body typography wrappers
│   │   ├── ui/                       # Design system buttons, badges, inputs
│   │   ├── FilterPillBar.jsx         # Animated pillbar selector
│   │   ├── Footer.jsx                # Responsive enterprise footer
│   │   └── Navbar.jsx                # Sticky responsive header with blur effect
│   ├── config/                       # Static app configurations
│   │   ├── auth.js                   # JWT duration & cookie parameters
│   │   ├── company.js                # Corporate metadata, office address, contact numbers
│   │   ├── email.js                  # Default email queue retry parameters
│   │   ├── navigation.js             # Public header & admin sidebar menu trees
│   │   ├── routes.js                 # Application route map
│   │   ├── socials.js                # Social media channel links
│   │   └── storage.js                # Storage path parameters
│   ├── constants/                    # System-wide enum constants
│   ├── design-system/                # Design System Tokens
│   │   └── tokens/                   # Raw token JS definitions
│   │       ├── colors.js             # Color palette tokens
│   │       ├── radius.js             # Corner radius tokens
│   │       └── transitions.js        # Easing and timing tokens
│   ├── hooks/                        # Custom React Hooks
│   │   └── useDebounce.js            # Input debouncing hook
│   ├── lib/                          # Core Utilities & System Libraries
│   │   ├── auth.js                   # JWT Web Crypto signing/verification & bcrypt hashing
│   │   ├── email-worker.js           # Async background mail queue polling loop
│   │   ├── mongodb.js                # Cached Mongoose connection pool
│   │   └── motion.js                 # Framer Motion transitions presets
│   ├── mappers/                      # DTO Data Transformation Layer
│   │   ├── admin.mapper.js           # Admin user profile sanitizer
│   │   ├── gallery.mapper.js         # Project portfolio mapper
│   │   ├── inquiry.mapper.js         # Lead submission DTO mapper
│   │   ├── product.mapper.js         # Elevator catalog DTO mapper
│   │   └── testimonial.mapper.js     # Client review mapper
│   ├── models/                       # Mongoose Database Models (11 Schemas)
│   │   ├── Admin.js                  # Admin user credentials & role permissions
│   │   ├── AuditLog.js               # Immutable audit log records
│   │   ├── BlogPost.js               # Editorial blog articles schema
│   │   ├── EmailQueue.js             # Outbound email queue records
│   │   ├── EmailTemplate.js          # HTML Email templates schema
│   │   ├── GalleryProject.js         # Portfolio projects schema
│   │   ├── Inquiry.js                # Customer inquiries & CRM notes
│   │   ├── MediaUpload.js            # Uploaded media assets schema
│   │   ├── Product.js                # Product catalog & 360 variants schema
│   │   ├── SiteSettings.js           # Dynamic site settings schema
│   │   ├── Subscriber.js             # Newsletter subscriber records
│   │   └── Testimonial.js            # Client review reviews schema
│   ├── performance/                  # Performance Optimization Helpers
│   │   └── cache.js                  # In-memory TTL caching helper
│   ├── permissions/                  # Security RBAC Definition Layer
│   │   └── roles.js                  # Enterprise roles & 28+ permission flags matrix
│   ├── providers/                    # React Context Providers Stack (12 Providers)
│   │   ├── AnimationProvider.jsx     # Animation state provider
│   │   ├── AppProvider.jsx           # Global master provider aggregator
│   │   ├── CursorProvider.jsx        # Dynamic interactive cursor position
│   │   ├── LenisProvider.jsx         # Smooth scroll provider
│   │   ├── LoadingProvider.jsx       # Global page transition loader
│   │   ├── ModalProvider.jsx         # Dialog modal provider
│   │   ├── NavigationProvider.jsx    # Header navigation state
│   │   ├── ScrollProvider.jsx        # Scroll position telemetry
│   │   ├── SessionProvider.jsx       # Admin session context
│   │   ├── ThemeProvider.jsx         # Color mode provider
│   │   ├── ToastProvider.jsx         # Notification toasts provider
│   │   └── ViewportProvider.jsx      # Screen breakpoint listener
│   ├── repositories/                 # Data Access Layer (Repository Pattern)
│   │   ├── admin.repository.js       # Admin user DB operations
│   │   ├── auditLog.repository.js    # Audit log creation & query
│   │   ├── emailQueue.repository.js  # Queue polling & update operations
│   │   ├── emailTemplate.repository.js# Template query operations
│   │   ├── gallery.repository.js     # Portfolio DB operations
│   │   ├── inquiry.repository.js     # Lead CRM DB operations
│   │   ├── product.repository.js     # Products DB operations
│   │   ├── siteSettings.repository.js# Site settings DB operations
│   │   ├── subscriber.repository.js  # Subscriber DB operations
│   │   └── testimonial.repository.js # Testimonial DB operations
│   ├── scripts/                      # System CLI Scripts
│   │   └── seed.js                   # Idempotent database seeder script
│   ├── security/                     # Security Protection Layer
│   │   ├── rateLimit.js              # Sliding window rate limiter
│   │   └── sanitizer.js              # Anti-XSS HTML sanitizer
│   ├── seo/                          # SEO Engine Modules
│   │   ├── jsonld.js                 # Schema.org JSON-LD generator
│   │   ├── schema.js                 # Metadata schema helper
│   │   └── sitemap.js                # Sitemap XML generator
│   ├── services/                     # Business Logic Services
│   │   └── email/                    # Email service package
│   │       └── email.service.js      # Template compiler & queue enqueuer
│   ├── utils/                        # Common Utilities
│   │   ├── image.js                  # Image path optimization helper
│   │   ├── mediaUpload.js            # Client-side asset upload helper
│   │   └── string.js                 # String formatting & slugifiers
│   ├── validators/                   # Input Data Validation Layer
│   │   ├── admin.validator.js        # User payload validator
│   │   ├── contact.validator.js      # Lead inquiry validator
│   │   ├── email.validator.js        # Email template validator
│   │   ├── gallery.validator.js      # Portfolio validator
│   │   ├── login.validator.js        # Auth login validator
│   │   ├── product.validator.js      # Product catalog validator
│   │   ├── testimonial.validator.js  # Testimonial validator
│   │   └── validation.helper.js      # Core regex & type validator
│   └── middleware.js                 # Edge Runtime Authentication Gate
├── scratch/
│   └── emails/                       # Development email output files (gitignored)
├── public/
│   └── images/                       # Static public assets & panoramas
├── .env.example                      # Template environment configuration
├── eslint.config.mjs                 # Flat ESLint configuration
├── jsconfig.json                     # JS path alias configuration (`@/*`)
├── next.config.mjs                   # Next.js compiler & security rules
├── package.json                      # Build scripts and dependencies
└── postcss.config.mjs                # PostCSS configuration with Tailwind v4
```

---

## 6. Database Schema Architecture

### 6A. Entity-Relationship Diagram (11 Mongoose Schemas)

```mermaid
erDiagram
    Admin ||--o{ Inquiry : "assigned to"
    Admin ||--o{ Inquiry : "assigned by"
    Admin ||--o{ AuditLog : "performed by"
    Admin ||--o{ MediaUpload : "uploaded by"

    Product ||--o{ GalleryProject : "linked in case studies"
    Product ||--o{ Inquiry : "referenced in inquiries"

    Admin {
        ObjectId _id PK
        string name
        string email UK
        string password
        string role
        boolean isActive
        array permissions
        date lastLoginAt
    }

    Inquiry {
        ObjectId _id PK
        string name
        string email
        string phone
        string company
        string city
        string elevatorType
        string floorCount
        string message
        string status
        array notes
        ObjectId assignedTo FK
        ObjectId assignedBy FK
        date assignedAt
        string source
    }

    Product {
        ObjectId _id PK
        string slug UK
        string name
        string tagline
        string category
        string tabGroup
        string description
        array specifications
        array features
        array applications
        array images
        string brochureUrl
        boolean has360View
        string defaultColor
        string defaultFinish
        array colorVariants
        array finishVariants
        boolean isFeatured
        boolean isActive
        number sortOrder
    }

    GalleryProject {
        ObjectId _id PK
        string title
        string location
        string clientType
        string category
        number year
        string description
        string coverImage
        array images
        array relatedProductSlugs
        boolean isActive
        number sortOrder
    }

    BlogPost {
        ObjectId _id PK
        string slug UK
        string title
        string excerpt
        string coverImage
        string content
        string category
        array tags
        object author
        number readTime
        boolean isPublished
        boolean isFeatured
        date publishedAt
        number views
    }

    Subscriber {
        ObjectId _id PK
        string email UK
        string name
        string source
        boolean isActive
        date confirmedAt
        date unsubscribedAt
    }

    EmailTemplate {
        ObjectId _id PK
        string name UK
        string subject
        string body
        array variables
        boolean isActive
    }

    EmailQueue {
        ObjectId _id PK
        string to
        string subject
        string body
        string status
        number attempts
        number maxAttempts
        date lastAttemptAt
        date sentAt
        string error
    }

    AuditLog {
        ObjectId _id PK
        string action
        object performedBy
        string targetId
        string targetType
        mixed details
        string ipAddress
    }

    MediaUpload {
        ObjectId _id PK
        string filename
        string url
        string mimeType
        number size
        object dimensions
        ObjectId uploadedBy FK
    }

    SiteSettings {
        ObjectId _id PK
        string companyName
        string phone
        string email
        string address
        object socialLinks
        object heroBanner
        boolean maintenanceMode
    }

    Testimonial {
        ObjectId _id PK
        string clientName
        string company
        string role
        string content
        number rating
        string avatar
        boolean isFeatured
    }
```

### 6B. Model Field Specifications

#### 1. `Admin`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique account identifier |
| `name` | String | Required | Full display name |
| `email` | String | Required, Unique, Lowercase | Primary contact and login email |
| `password` | String | Required | 12-round bcrypt hash |
| `role` | String | Enum, Required | One of ROLES (`SUPER_ADMIN`, `SALES_MANAGER`, etc.) |
| `isActive` | Boolean | Default: `true` | Active status flag |
| `permissions`| Array (String)| Optional | Explicit permission overrides |
| `lastLoginAt` | Date | — | Timestamp of last authenticated session |

#### 2. `Inquiry`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique lead identifier |
| `name` | String | Required | Client contact name |
| `email` | String | Required, Lowercase | Client email address |
| `phone` | String | Required | Client phone number |
| `company` | String | Optional | Lead organization |
| `city` | String | Optional | Lead geographical city |
| `elevatorType`| String | Optional | Selected elevator system |
| `floorCount` | String | Optional | Project floor count requirement |
| `message` | String | Optional | Client message body |
| `status` | String | Enum, Default: `'New'`| CRM status (`'New'`, `'Contacted'`, `'Qualified'`, `'Closed'`, `'Rejected'`) |
| `notes` | Array (Object)| Embedded schema | CRM notes history (`text`, `adminName`, `adminId`, `createdAt`) |
| `assignedTo` | ObjectId | Ref: `'Admin'` | Assigned sales executive |
| `assignedBy` | ObjectId | Ref: `'Admin'` | Assigning manager |
| `assignedAt` | Date | — | Assignment timestamp |
| `source` | String | Default: `'Website'`| Lead source tracking tag |

#### 3. `Product`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique product identifier |
| `slug` | String | Required, Unique, Lowercase | URL slug identifier |
| `name` | String | Required | Elevator model name |
| `tagline` | String | Optional | Highlight summary tagline |
| `category` | String | Required | Product category (`Passenger`, `Capsule`, `Home`, etc.) |
| `tabGroup` | String | Enum, Default: `'Systems'`| Filter tab group (`Systems`, `Cabins`, `Components`) |
| `description` | String | Optional | Detailed HTML/CMS description |
| `specifications`| Array (Object)| Nested key-value | Technical specifications pairs |
| `features` | Array (String)| Optional | List of feature highlights |
| `applications`| Array (String)| Optional | Building application tags |
| `images` | Array (Object)| Nested url/alt | Product visual assets |
| `brochureUrl` | String | Optional | Downloadable PDF URL |
| `has360View` | Boolean | Default: `false` | Enables WebGL 360° cabin customizer |
| `colorVariants`| Array (Object)| Nested schema | Swatch configurations & panorama maps (`name`, `hex`, `panoramaImages`) |
| `finishVariants`| Array (Object)| Nested schema | Finishing variants (`name`, `isActive`) |
| `isFeatured` | Boolean | Default: `false` | Showcase highlight status |
| `isActive` | Boolean | Default: `true` | Public listing status |
| `sortOrder` | Number | Default: `0` | Grid sequence index |

#### 4. `GalleryProject`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique project identifier |
| `title` | String | Required | Project display title |
| `location` | String | Optional | Installation city/state |
| `clientType` | String | Optional | Client sector tag |
| `category` | String | Optional | Masonry filter category |
| `year` | Number | Optional | Installation year |
| `description` | String | Optional | Case study details |
| `coverImage` | String | Required | Grid cover image asset URL |
| `images` | Array (String)| Optional | Carousel slide image asset URLs |
| `relatedProductSlugs`| Array (String)| Optional | Linked product slugs |
| `isActive` | Boolean | Default: `true` | Visibility flag |

#### 5. `BlogPost`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique article identifier |
| `slug` | String | Required, Unique, Lowercase | Article URL slug |
| `title` | String | Required | Article display title |
| `excerpt` | String | Optional | Card summary intro snippet |
| `coverImage` | String | Optional | Cover image asset URL |
| `content` | String | Optional | Markdown formatted body content |
| `category` | String | Optional | Section categorizer tag |
| `tags` | Array (String)| Optional | Article tags |
| `author` | Object | Nested schema | Author profile (`name`, `avatar`, `title`) |
| `readTime` | Number | Computed on save | Auto-calculated read time in minutes |
| `isPublished` | Boolean | Default: `false` | Publication status flag |

#### 6. `Subscriber`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique subscriber identifier |
| `email` | String | Required, Unique, Lowercase | Newsletter email address |
| `name` | String | Optional | Subscriber name |
| `isActive` | Boolean | Default: `true` | Subscription state |
| `confirmedAt` | Date | — | Opt-in timestamp |

#### 7. `EmailTemplate`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique template identifier |
| `name` | String | Required, Unique | Code lookup key (e.g. `inquiry_received`) |
| `subject` | String | Required | Subject template string with placeholders |
| `body` | String | Required | HTML body string with `{{placeholders}}` |
| `variables` | Array (String)| Optional | List of dynamic template keys |

#### 8. `EmailQueue`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique queue item identifier |
| `to` | String | Required | Recipient email address |
| `subject` | String | Required | Rendered subject line |
| `body` | String | Required | Rendered HTML body |
| `status` | String | Enum, Default: `'pending'`| Status (`'pending'`, `'sent'`, `'failed'`) |
| `attempts` | Number | Default: `0` | Delivery attempt counter |
| `maxAttempts` | Number | Default: `3` | Maximum retry limit |

#### 9. `AuditLog`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique audit log identifier |
| `action` | String | Required | Code action string (e.g. `inquiry_assigned`) |
| `performedBy` | Object | Nested schema | Executor admin details (`adminId`, `name`, `email`, `role`) |
| `targetId` | String | Optional | Target document ID |
| `targetType` | String | Optional | Target schema collection |
| `details` | Mixed | Optional | State snapshot JSON |
| `ipAddress` | String | Optional | Client IP address |

#### 10. `MediaUpload`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique media identifier |
| `filename` | String | Required | Original asset filename |
| `url` | String | Required | Accessible public URL |
| `mimeType` | String | Required | Asset MIME type (`image/jpeg`, `image/png`, etc.) |
| `size` | Number | Required | File size in bytes |
| `uploadedBy` | ObjectId | Ref: `'Admin'` | Uploading user ID |

#### 11. `SiteSettings`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique settings document |
| `companyName` | String | Default: `'FG Lift Pvt. Ltd.'`| Corporate title |
| `phone` | String | Optional | Primary corporate telephone |
| `email` | String | Optional | Primary corporate email |
| `address` | String | Optional | Registered office address |
| `socialLinks` | Object | Nested links | Social media channel links |
| `maintenanceMode`| Boolean| Default: `false` | System maintenance mode toggle |

#### 12. `Testimonial`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique review identifier |
| `clientName` | String | Required | Client/Architect display name |
| `company` | String | Optional | Client company/firm name |
| `role` | String | Optional | Client designation |
| `content` | String | Required | Review quote text |
| `rating` | Number | Default: `5` | Rating score (1–5) |
| `isFeatured` | Boolean | Default: `false` | Landing page showcase status |

---

## 7. RBAC — Roles & Permissions Matrix

Security rights are declared in `src/permissions/roles.js` and enforced across Middleware, Layout components, and Server Route Handlers.

### Role Profiles
- **`SUPER_ADMIN`**: Full structural control across all domain models, users, site settings, logs, and email templates. Cannot delete or deactivate self.
- **`SALES_MANAGER`**: Full access to the CRM inquiry pipeline, lead assignments, executive filtering, lead notes, CSV export, and audit log inspection.
- **`SALES_EXECUTIVE`**: Gated access restricted strictly to customer inquiries assigned directly to their account ID (`assignedTo === admin.id`).
- **`MARKETING_MANAGER`**: Access to newsletter subscriber lists, subscriber export, email template customization, and blog editorial publishing.
- **`CONTENT_EDITOR`**: Access to Product Information Management (PIM), Home Lift showcases, portfolio galleries, and blog publishing.

### Permissions Matrix (28+ Permission Flags)

| Permission Flag | Super Admin | Sales Manager | Sales Executive | Marketing Manager | Content Editor |
|---|:---:|:---:|:---:|:---:|:---:|
| `VIEW_ALL_INQUIRIES` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `VIEW_OWN_INQUIRIES` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `ASSIGN_INQUIRY` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `UPDATE_INQUIRY_STATUS` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `ADD_INQUIRY_NOTE` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `DELETE_INQUIRY` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `EXPORT_CRM` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `VIEW_PRODUCTS` | ✅ | ✅ | ✅ | ❌ | ✅ |
| `CREATE_PRODUCT` | ✅ | ❌ | ❌ | ❌ | ✅ |
| `EDIT_PRODUCT` | ✅ | ❌ | ❌ | ❌ | ✅ |
| `DELETE_PRODUCT` | ✅ | ❌ | ❌ | ❌ | ✅ |
| `VIEW_GALLERY` | ✅ | ✅ | ❌ | ❌ | ✅ |
| `CREATE_GALLERY` | ✅ | ❌ | ❌ | ❌ | ✅ |
| `EDIT_GALLERY` | ✅ | ❌ | ❌ | ❌ | ✅ |
| `DELETE_GALLERY` | ✅ | ❌ | ❌ | ❌ | ✅ |
| `VIEW_BLOG` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `CREATE_BLOG` | ✅ | ❌ | ❌ | ❌ | ✅ |
| `EDIT_BLOG` | ✅ | ❌ | ❌ | ❌ | ✅ |
| `DELETE_BLOG` | ✅ | ❌ | ❌ | ❌ | ✅ |
| `PUBLISH_BLOG` | ✅ | ❌ | ❌ | ❌ | ✅ |
| `VIEW_SUBSCRIBERS` | ✅ | ✅ | ❌ | ✅ | ❌ |
| `EXPORT_SUBSCRIBERS` | ✅ | ❌ | ❌ | ✅ | ❌ |
| `VIEW_USERS` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `CREATE_USER` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `EDIT_USER` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `DELETE_USER` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `VIEW_EMAIL_TEMPLATES`| ✅ | ❌ | ❌ | ✅ | ❌ |
| `EDIT_EMAIL_TEMPLATES`| ✅ | ❌ | ❌ | ✅ | ❌ |
| `MANAGE_SETTINGS` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `VIEW_LOGS` | ✅ | ✅ | ❌ | ✅ | ❌ |

---

## 8. Complete API Reference

### 8A. Public API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| **POST** | `/api/contact` | Submit lead inquiry, save to DB, queue confirmation email |
| **POST** | `/api/newsletter` | Opt-in email address to newsletter database |
| **DELETE**| `/api/newsletter?email=...` | Opt-out email address from newsletter database |
| **GET** | `/api/blog` | Fetch paginated published articles (`?category=...&tag=...`) |
| **GET** | `/api/products` | Fetch active catalog items (`?tabGroup=...&category=...`) |
| **GET** | `/api/settings` | Fetch public corporate settings and metadata |
| **GET** | `/api/testimonials` | Fetch active client reviews and ratings |
| **POST** | `/api/media` | Upload media asset to central library |

### 8B. Admin Gated API Endpoints (`/api/admin/*`)

*Requires HTTP-Only cookie `fg_admin_token` and verified RBAC permission flag.*

| Method | Endpoint | Required Permission | Description |
|---|---|---|---|
| **POST** | `/api/admin/auth/login` | None | Authenticates user, sets `fg_admin_token` cookie |
| **POST** | `/api/admin/auth/logout`| None | Clears authentication token cookie |
| **GET** | `/api/admin/inquiries` | `VIEW_*_INQUIRIES` | Fetch inquiries filtered by role/executive ID |
| **PATCH**| `/api/admin/inquiries/[id]`| `UPDATE_INQUIRY_STATUS` | Update status, assign executive, or append notes |
| **DELETE**| `/api/admin/inquiries/[id]`| `DELETE_INQUIRY` | Permanently delete lead entry |
| **GET** | `/api/admin/inquiries/export`| `EXPORT_CRM` | Download current pipeline as CSV stream |
| **GET** | `/api/admin/products` | `VIEW_PRODUCTS` | Fetch all products for PIM workspace |
| **POST** | `/api/admin/products` | `CREATE_PRODUCT` | Create catalog item with 360 variants |
| **PATCH**| `/api/admin/products/[id]`| `EDIT_PRODUCT` | Update catalog metadata & variant assets |
| **DELETE**| `/api/admin/products/[id]`| `DELETE_PRODUCT` | Remove catalog item |
| **GET** | `/api/admin/gallery` | `VIEW_GALLERY` | Fetch portfolio projects |
| **POST** | `/api/admin/gallery` | `CREATE_GALLERY` | Publish new case study entry |
| **PATCH**| `/api/admin/gallery/[id]`| `EDIT_GALLERY` | Update portfolio project details |
| **DELETE**| `/api/admin/gallery/[id]`| `DELETE_GALLERY` | Remove portfolio entry |
| **GET** | `/api/admin/blog` | `VIEW_BLOG` | Fetch all draft and published articles |
| **POST** | `/api/admin/blog` | `CREATE_BLOG` | Create new article draft |
| **PATCH**| `/api/admin/blog/[id]` | `EDIT_BLOG` / `PUBLISH` | Edit content or toggle publication |
| **DELETE**| `/api/admin/blog/[id]` | `DELETE_BLOG` | Delete blog post |
| **GET** | `/api/admin/newsletter` | `VIEW_SUBSCRIBERS` | Fetch subscriber list or export CSV |
| **GET** | `/api/admin/users` | `VIEW_USERS` | Fetch administrative account roster |
| **POST** | `/api/admin/users` | `CREATE_USER` | Create new team member account |
| **PATCH**| `/api/admin/users/[id]` | `EDIT_USER` | Update role, status, or reset password |
| **DELETE**| `/api/admin/users/[id]` | `DELETE_USER` | Remove administrative account |
| **GET** | `/api/admin/email-templates`| `VIEW_EMAIL_TEMPLATES`| Fetch HTML templates list |
| **PATCH**| `/api/admin/email-templates/[id]`| `EDIT_EMAIL_TEMPLATES`| Modify HTML template code |
| **GET** | `/api/admin/settings` | `MANAGE_SETTINGS` | Fetch all admin site settings |
| **PATCH**| `/api/admin/settings` | `MANAGE_SETTINGS` | Update corporate settings & details |
| **GET** | `/api/admin/testimonials`| `CONTENT_EDITOR` | Fetch all client reviews |
| **POST** | `/api/admin/testimonials`| `CONTENT_EDITOR` | Add new client testimonial |
| **GET** | `/api/admin/logs` | `VIEW_LOGS` | Fetch immutable audit trail |

---

## 9. Design System & Visual Tokens

Design system tokens are declared in `src/app/globals.css` and JavaScript token objects in `src/design-system/tokens/`.

### Color Palette

| Token Variable | Hex Code | Purpose / Usage |
|---|---|---|
| `--bg-cream` | `#F5F0EB` | Primary body background for public pages |
| `--bg-cream-alt` | `#EDE8E2` | Secondary alternating section background |
| `--bg-dark` | `#111111` | Primary dark background (Hero, Navbar, Footer) |
| `--bg-dark-2` | `#1A1A1A` | Dark card backgrounds |
| `--fg-blue` | `#0E4FB3` | Brand accent blue (Links, Active Pills, Badges) |
| `--fg-blue-light` | `#E8F0FC` | Accent blue panel fill |
| `--fg-red` | `#D72638` | Danger alerts, error messages, delete buttons |
| `--fg-orange` | `#E8600A` | Warning states, pending status badges |
| `--text-dark` | `#111111` | High contrast primary title text |
| `--text-body` | `#3D3D3D` | Body paragraph text |
| `--text-muted` | `#7A7A7A` | Subtitles and meta tags |
| `--admin-bg` | `#F4F6F9` | Admin workspace backdrop |

### Typography Stack
- **DM Serif Display (`--font-display`)**: Hero titles, section headers, stats numbers.
- **DM Sans (`--font-sans`)**: Body text, button labels, navigation elements, form inputs.
- **JetBrains Mono (`--font-mono`)**: Technical spec metrics, log entries, system badges.

---

## 10. Three.js 360° Cabin Customizer & WebGL Engine

The **`Lift360Viewer.jsx`** component (located in `src/components/product-detail/`) provides an interactive 3D WebGL interior customization experience.

### Technical Implementation Features
1. **WebGL Geometry Proportions:**
   - Supports inverted spherical projection (`THREE.SphereGeometry` with `scale(-1, 1, 1)`).
   - Supports realistic cubic cabin geometry (`THREE.BoxGeometry(500, 833.33, 500)`), representing exact 3:5 wall-to-height proportions and 1:1 floor/ceiling ratios.
2. **Interactive Swatch & Texture Loading:**
   - Color swatch changes update state in parent components.
   - The engine loads panorama images via `THREE.TextureLoader` while invoking `oldTexture.dispose()` to prevent memory leaks.
3. **Smooth Lerp Physics:**
   - Mouse and touch drag interactions update target coordinates `targetLon` and `targetLat`.
   - Frame tick updates apply smooth deceleration formula:
     ```javascript
     lon += (targetLon - lon) * 0.15;
     lat += (targetLat - lat) * 0.15;
     ```
4. **Interactive Image Cropper (`MediaGalleryModal.jsx`):**
   - HTML5 canvas crop tool ensuring wall textures are cropped to 3:5 aspect ratio and ceilings/floors to 1:1 ratio.
5. **React Strict Mode Guard:**
   - Utilizes `mountedRef.current` guard to prevent double-canvas instantiation during React 19 development renders.

---

## 11. Enterprise Core Engines

### 11A. Input Validators (`src/validators/`)
Dedicated schema validators for contact forms, admin login, product metadata, and testimonials. Converts raw inputs into sanitized payload objects or throws structured error maps.

### 11B. Security Engine (`src/security/`)
- **Sliding Window Rate Limiter (`rateLimit.js`)**: Restricts public submission endpoints (`/api/contact`, `/api/newsletter`) to prevent automated spam abuse.
- **XSS Sanitizer (`sanitizer.js`)**: Strips unsafe HTML tags, scripts, and attributes from inbound user text.

### 11C. SEO Engine (`src/seo/`)
- **JSON-LD Generator (`jsonld.js`)**: Generates Schema.org `Organization`, `Product`, `LocalBusiness`, and `BreadcrumbList` structured data scripts.
- **Sitemap Generator (`sitemap.js`)**: Dynamically generates `/sitemap.xml` mapping all active products, articles, projects, and public routes.

### 11D. Performance & Cache Engine (`src/performance/`)
- **In-Memory TTL Cache (`cache.js`)**: Micro-caching layer for database product lists and site settings with configurable time-to-live expiration.

### 11E. Providers Architecture (`src/providers/`)
Centralized provider composition tree (`AppProvider.jsx`) wrapping the root layout with 12 specialized providers:
`AppProvider` ➔ `ThemeProvider` ➔ `SessionProvider` ➔ `LoadingProvider` ➔ `NavigationProvider` ➔ `ViewportProvider` ➔ `ScrollProvider` ➔ `LenisProvider` ➔ `CursorProvider` ➔ `AnimationProvider` ➔ `ModalProvider` ➔ `ToastProvider`.

---

## 12. Email System & Background Worker Pipeline

```
Form Submission / Admin Action
       ↓
email.service.js (queueEmail)
       ↓
Fetch EmailTemplate from DB ➔ Compile {{variables}}
       ↓
Insert document into EmailQueue collection (status: 'pending')
       ↓
email-worker.js polls collection every 15 seconds
       ↓
       ├── SMTP Configured ➔ Dispatches via Nodemailer ➔ Status updated to 'sent'
       └── Dev Mode (No SMTP) ➔ Writes compiled HTML to /scratch/emails/ ➔ Status updated to 'sent'
```

---

## 13. Admin Panel Comprehensive Guide

1. **Dashboard (`/admin/dashboard`)**: High-level telemetry displaying total leads, new leads, active products count, published articles, newsletter subscribers, and recent lead activity.
2. **Inquiries CRM (`/admin/inquiries`)**: Kanban Board (`@hello-pangea/dnd`) and searchable data table for managing customer inquiries. Allows status updates, executive assignments, CRM notes, and CSV data export.
3. **Product Information Management (`/admin/products`)**: Comprehensive catalog PIM suite for managing specifications, application tags, color swatches, 360° panorama maps, and brochure PDFs.
4. **Home Lifts Showcase (`/admin/home-lifts`)**: Specialized manager for Villa Home Lifts showcases, art wall collections, parameters, and mechanical systems.
5. **Portfolio Gallery (`/admin/gallery`)**: Manager for corporate project installations, builder case studies, and image carousels.
6. **Editorial Blog (`/admin/blog`)**: Split markdown editor with live preview, author profile selector, auto-calculated reading time, and publication state toggles.
7. **Newsletter Subscriptions (`/admin/newsletter`)**: Subscription database management and mailing list CSV export tool.
8. **User RBAC Roster (`/admin/users`)**: Security roster for creating admin accounts, assigning roles, and toggling user access flags.
9. **Email Templates Editor (`/admin/email-templates`)**: Customizer for HTML email templates featuring dynamic variable placeholders and sandbox preview iframes.
10. **Site Settings Manager (`/admin/settings`)**: Interface for updating corporate phone numbers, office addresses, social links, and system maintenance mode toggles.
11. **Client Testimonials (`/admin/testimonials`)**: Review management panel for client quotes, ratings, and showcase features.
12. **Immutable Audit Logs (`/admin/logs`)**: Read-only activity log vault tracking system actions, executor profiles, target documents, and IP addresses.

---

## 14. Installation & Local Setup Guide

### Prerequisites
- Node.js `v18.0.0` or higher
- Local MongoDB instance on port `27017` or a MongoDB Atlas connection URI

### Step-by-Step Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/KrishnaHinged/FG_Lifts_Pvt_Ltd.git
   cd fg-lift-website
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local parameters (see Section 15 below)
   ```

4. **Seed the Database:**
   Execute the database seeder to create default templates, initial product catalogs, and the Super Admin account:
   ```bash
   npm run seed
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```

6. **Open Browser:**
   - Public Showroom: `http://localhost:3000`
   - Admin Workspace: `http://localhost:3000/admin`

---

## 15. Environment Variables Reference

Create an `.env.local` file in the project root:

```bash
# ─── DATABASE CONNECTION ────────────────────────────────
MONGODB_URI=mongodb://127.0.0.1:27017/fglifts
# MongoDB Atlas Example:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fglifts

# ─── JWT AUTHENTICATION ─────────────────────────────────
JWT_SECRET=replace-with-minimum-32-character-random-string
# Generate key via: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# ─── APPLICATION URL ───────────────────────────────────
NEXT_PUBLIC_URL=http://localhost:3000
# Production Example: https://fglifts.com

# ─── SMTP EMAIL CONFIGURATION ──────────────────────────
# Leave blank in local development to save HTML emails to /scratch/emails/
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

---

## 16. Production Deployment Guide

### Vercel + MongoDB Atlas Setup

1. **Configure MongoDB Atlas:** Create a production database cluster, add a database user, and whitelist application IP addresses.
2. **Push to GitHub:** Push code updates to your primary repository branch.
3. **Import Project to Vercel:** Connect your GitHub repository to Vercel.
4. **Configure Environment Variables:** Add `MONGODB_URI`, `JWT_SECRET`, `NEXT_PUBLIC_URL`, and production `SMTP_*` parameters under Vercel Project Settings.
5. **Deploy:** Click **Deploy**. Next.js will build and deploy the application.
6. **Seed Production Database:**
   ```bash
   MONGODB_URI="mongodb+srv://..." node src/scripts/seed.js
   ```

---

## 17. Database Seeder Reference

The database seeder (`src/scripts/seed.js`) is fully idempotent.

- **Execution Command:**
  ```bash
  npm run seed
  ```

### Seeder Rules & Actions
- **Super Admin Profile:** Checks if `admin@fglifts.com` exists. If missing, it creates the account with hashed password `FGLift@Admin2025!`. If existing, it enforces `SUPER_ADMIN` role rights.
- **Email Templates:** Seeds missing default templates (`inquiry_received`, `lead_assigned`, `newsletter_welcome`). Skips modified existing templates.
- **Catalog Refresh:** Wipes and re-seeds mock products, projects, articles, and client reviews for clean demo instances.

---

## 18. Security Principles & Policies

- **HTTP-Only Cookies:** Auth JWT tokens are stored in `httpOnly`, `sameSite: 'lax'` cookies, completely isolating tokens from client-side JavaScript to eliminate XSS token theft.
- **Edge Middleware Route Defense:** Protected `/admin/*` routes validate Web Crypto JWT signatures before page rendering.
- **Database Query Isolation:** Sales Executive queries automatically enforce `assignedTo: admin.id` constraints at the Mongoose query level.
- **Immutable Audit Trails:** Operational changes create permanent `AuditLog` documents recording administrative actions, target documents, and client IP addresses.
- **Password Encryption:** Passwords are standard 12-round `bcryptjs` hashes.

---

## 19. Development Conventions & Standard API Security Pattern

### Architecture Rules
1. **Layer Separation:** Never invoke Mongoose models directly in UI Components or Route Handlers. Always execute queries via the Repository Layer (`src/repositories/`).
2. **ECMAScript & JSX Only:** All code must be written strictly in JavaScript (`.js` and `.jsx`). TypeScript (`.ts`/`.tsx`) is forbidden.
3. **Design Token Consistency:** UI components must consume design tokens from `globals.css` and `src/design-system/tokens/`.

### Standard Admin API Security Pattern
Every gated administrative Route Handler implements this exact pattern:

```javascript
import { getAdmin } from '@/lib/auth'
import { hasPermission } from '@/permissions/roles'
import { createLog } from '@/repositories/auditLog.repository'
import { NextResponse } from 'next/server'

export async function PATCH(req, { params }) {
  // 1. Verify authenticated JWT token
  const admin = getAdmin(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Verify granular RBAC permission
  if (!hasPermission(admin, 'UPDATE_INQUIRY_STATUS')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // 3. Execute business logic & repository update
  const payload = await req.json()
  const updatedDocument = await updateInquiry(params.id, payload)

  // 4. Record immutable audit log entry
  await createLog({
    action: 'inquiry_updated',
    performedBy: admin,
    targetId: params.id,
    targetType: 'Inquiry',
    details: { changes: payload }
  })

  return NextResponse.json({ success: true, data: updatedDocument })
}
```

---

## 20. Known Limitations & Roadmap

- **Cloud Media Provider:** Media uploads save to local static storage or external URLs. Roadmap includes native AWS S3 / Cloudinary drag-and-drop integration.
- **Real-Time WebSockets:** CRM Kanban board uses manual or component refreshes. Roadmap includes WebSockets / SSE for live team collaboration updates.
- **Two-Factor Authentication (2FA):** Admin auth relies on credentials. Roadmap includes TOTP 2FA authenticator app integration.

---

## 21. Version Changelog

## [2.4.0] — Repository Cleanup, Storage Optimization, ESLint & React Hook Compliance
### Added
- **Repository Cleanup & Pruning**:
  - Safely deleted 117 files (74 dead code files, 2 temporary development scripts, and 16 unused/duplicate static assets), reclaiming **255.45 MB** of repository storage.
  - Consolidated duplicate files such as `images/logo.jpg` and `images/about-factory.jpg` into their respective active versions.
- **Dependency Optimization**:
  - Pruned unused packages and sub-dependencies, reducing `node_modules` size.
- **ESLint & React Hook Compliance**:
  - Refactored active React Providers (`AnimationProvider.jsx`, `LenisProvider.jsx`, `LoadingProvider.jsx`, `NavigationProvider.jsx`, `ViewportProvider.jsx`) to execute state synchronization asynchronously using `setTimeout(..., 0)` resolving `react-hooks/set-state-in-effect` warnings.
  - Derived client-side project filters directly during render in `GalleryClient.jsx`, removing redundant `useEffect` hooks.
  - Repositioned early returns below all hook declarations in `ProductCard.jsx` and `ProductDetailClient.jsx` respecting React Rules of Hooks.
  - Completed validation with **0 compile errors** on `npm run lint` and `npm run build`.

## [2.3.0] — 360° Customizer Ratios, Fullscreen Mode, Image Cropper & Products Client Refactoring
### Added
- **Interactive Image Cropper & Adjuster (`MediaGalleryModal.jsx`)**:
  - Integrated native HTML5 canvas image cropper with drag pan positioning and zoom adjustments (100%–300%).
  - Aspect ratio presets guaranteeing walls crop to 3:5 and ceiling/floor crop to 1:1.
- **Cubic Cabin Geometry & Fullscreen Mode (`Lift360Viewer.jsx`)**:
  - WebGL elevator cabin proportions using `BoxGeometry(500, 833.33, 500)` representing a 3:5 aspect ratio.
  - Fullscreen mode toggle using HTML5 & Webkit APIs.
- **Modular Products Refactoring**:
  - Refactored `ProductsClient.jsx` into modular components (`ProductHero.jsx`, `ProductFilterBar.jsx`, `ProductTestimonials.jsx`, `ProductCTA.jsx`).

## [2.2.0] — Enterprise Architecture & UI/UX Transformation
### Added
- **Interactive 360° Texture Dropzone Cards & Media Gallery Picker**:
  - Engineered 6-sided cubic face and equirectangular texture upload cards in `View360Uploader.jsx`.
- **Sticky Form Action Bar & UI Redesign**:
  - Integrated sticky floating bottom action bar with glassmorphism in `ProductForm.jsx`.
- **1-Click Email Templates Seeding**:
  - Integrated default templates into `/api/seed` and `/api/admin/email-templates`.
- **Enterprise Core Engines (`src/seo/`, `src/performance/`, `src/security/`, `src/validators/`)**:
  - Dynamic JSON-LD engine, in-memory TTL cache, rate limiter, HTML sanitizer, and 12-Provider stack.

## [2.1.2] — Interaction and Interactive Card Redesign
### Added
- Redesigned Sectors/Industries (`Industries.jsx`) and Product Cards (`ProductCard.jsx`) with dynamic hover physics and cursor-following directional arrows.

## [2.1.1] — Environment Setup and Path Context Updates
### Added
- Standard `.env.example` file template.
- Documented `x-pathname` middleware header injection for root layout dynamic shell selection.

## [2.1.0] — Editorial Redesign & Corporate Asset Update
### Added
- Complete visual redesign of About, Products, Gallery, and Blog pages in line with premium aesthetic guidelines.
- Integrated component partner logotypes ticker and corporate building renders.

## [2.0.0] — Phase 4 Complete
### Added
- Secure Admin Console at `/admin`.
- Role-Based Access Control (RBAC) supporting 5 distinct roles and permissions.
- Leads pipeline Kanban board and list views with lead assignments and audit log tracking.

## [1.5.0] — Phase 3 Complete
### Added
- WebGL interactive `Lift360Viewer` component powered by Three.js.
- Markdown blog publication engine with reading time calculation.

## [1.0.0] — Phase 2 Complete
### Added
- Public Products Catalog, Detail views, and Portfolio Gallery.

## [0.1.0] — Phase 1 Complete
### Added
- Initial Next.js setup, Lenis smooth scrolling, GSAP ScrollTrigger timelines, and MongoDB pool establishment.
