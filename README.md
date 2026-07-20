# FG Lift Pvt. Ltd.

[![Next.js Version](https://img.shields.io/badge/Next.js-16.2.10-black?logo=nextdotjs)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev/)
[![Tailwind CSS Version](https://img.shields.io/badge/Tailwind_CSS-v4.0.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Mongoose Version](https://img.shields.io/badge/Mongoose-9.7.4-red?logo=mongodb)](https://mongoosejs.com/)
[![License](https://img.shields.io/badge/License-Proprietary%20%2F%20Commercial-brightgreen)](#)

---

## 1. Project Overview

**FG Lift Pvt. Ltd.** (Future & Growth) is an established vertical mobility provider based in Surat, Gujarat, engineering premium passenger elevators, heavy-duty goods lifts, glass capsule lifts, and luxury customized cabin enclosures for residential, commercial, and industrial infrastructure. 

This web application is a bespoke, full-stack B2B enterprise platform. It integrates a premium, high-aesthetic public digital showroom with an interactive Three.js 360° cabin configurator, a rich editorial blog, and an advanced internal CRM and content administration panel (`/admin`). The administrative workspace implements role-based access control (RBAC), leads management pipelines, immutable audit logging, newsletter campaigns manager, and a background queue worker for email notifications.

The development was executed in four strategic phases:
- **Phase 1 (Foundation):** Core public pages setup, responsive design tokens, home page sections with Lenis smooth scroll and GSAP timelines, MongoDB connection pool establishment, public inquiries endpoint, and Framer Motion motion utilities.
- **Phase 2 (Content & Catalogs):** Integration of public catalogs with tabbed product lists, animated filter pillbars, detail view page layouts, dynamic specs tables, masonry project showcases, Mongoose schemas, and repository pattern layer.
- **Phase 3 (Interactive Configurator & Blog):** Replacement of product placeholders with the fully interactive WebGL-based Three.js 360° Cabin Viewer, door opening animations, dynamic configurator controls, Markdown-based blog listing and detail view pages, newsletter strip, and subscription API endpoints.
- **Phase 4 (CRM & Admin Suite):** Complete implementation of the secure Admin Console (`/admin`), authentication gate, JWT-in-Cookie storage, CRM Kanban Board and leads management tables, audit trail logs, user account control, newsletter subscriber database, dynamic email templates, and background email queue worker.

This enterprise system resolves traditional business inefficiencies: consolidating unstructured email/WhatsApp inquiries into a centralized CRM, eliminating communication lag via immediate template-based client auto-responses, providing non-technical staff with inline rich text markdown tools to edit portfolios, and tracing operational changes via immutable logs.

---

## 2. Live Demo & Deployment

- **Production URL:** `[fill if deployed]`
- **Admin Panel:** `[production-url]/admin`
- **Default Admin Account:** `admin@fglifts.com`
- **Default Password:** `FGLift@Admin2025!` *(Must be changed immediately upon first login)*

---

## 3. Tech Stack & Dependencies

The system is built on a highly performant and unified modern stack:

| Category | Technology |
|---|---|
| **Framework** | Next.js 16.2.10 (App Router, Turbopack compiling) |
| **Language** | JavaScript (JSX) — Pure ECMAScript modules |
| **Styling** | Tailwind CSS v4.0.0 (CSS-first configurations) + custom variables |
| **Animation** | Framer Motion v12.42.2 + custom motion helpers |
| **Scroll** | Lenis v1.3.25 (Smooth scrolling engine) |
| **GSAP** | GSAP v3.15.0 + ScrollTrigger integrations |
| **3D / WebGL** | Three.js v0.185.1 |
| **Database** | MongoDB + Mongoose v9.7.4 |
| **Auth** | Native Web Crypto JWT signatures + bcryptjs v3.0.3 |
| **Email** | Nodemailer v9.0.3 |
| **Rich Text** | `@uiw/react-md-editor` v4.1.1 + `marked` v18.0.6 |
| **Icons** | `lucide-react` v1.24.0 |

### All Dependencies
- `@uiw/react-md-editor` (`^4.1.1`)
- `bcryptjs` (`^3.0.3`)
- `framer-motion` (`^12.42.2`)
- `gsap` (`^3.15.0`)
- `jsonwebtoken` (`^9.0.3`) *(Fallback dependency)*
- `lenis` (`^1.3.25`)
- `lucide-react` (`^1.24.0`)
- `marked` (`^18.0.6`)
- `mongoose` (`^9.7.4`)
- `next` (`16.2.10`)
- `nodemailer` (`^9.0.3`)
- `react` (`19.2.4`)
- `react-dom` (`19.2.4`)
- `three` (`^0.185.1`)
- `@tailwindcss/postcss` (`^4`)
- `eslint` (`^9`)
- `eslint-config-next` (`16.2.10`)
- `tailwindcss` (`^4`)

---

## 4. Project Architecture

### 4A. System Architecture Diagram

```mermaid
graph TD
    User([Public Visitor]) -->|Requests| PW[Public Website]
    AdminUser([Admin User]) -->|Login / JWT Cookie| MW[middleware.js Route Guard]
    MW -->|Authorized| AdminApp[Admin Panel /admin]
    MW -->|Blocked| LoginPage[/admin/login]

    subgraph Public Pages
        PW --> Home[/ Home Page]
        PW --> Products[/products Catalog]
        PW --> ProductDetail[/products/:slug 360° Viewer]
        PW --> About[/about]
        PW --> Gallery[/gallery]
        PW --> Blog[/blog + /blog/:slug]
    end

    subgraph Admin Panel
        AdminApp --> Dashboard[/admin/dashboard]
        AdminApp --> Inquiries[/admin/inquiries CRM Kanban]
        AdminApp --> ProductsCMS[/admin/products]
        AdminApp --> GalleryCMS[/admin/gallery]
        AdminApp --> BlogCMS[/admin/blog]
        AdminApp --> Newsletter[/admin/newsletter]
        AdminApp --> Users[/admin/users RBAC]
        AdminApp --> Templates[/admin/email-templates]
        AdminApp --> Logs[/admin/logs]
    end

    subgraph Services & Workers
        AdminApp -->|Queue Outbound| ES[email.service.js]
        ES -->|Write Document| EQ[(EmailQueue Collection)]
        Worker[Email Worker 15s Poll] -->|Read Pending| EQ
        Worker -->|Send SMTP or| ScratchFile[/scratch/emails/ Dev Mode]
        Worker -->|Deliver| MailServer[SMTP Server]
    end

    subgraph Data Layer
        PW & AdminApp -->|Repository Pattern| Repos[Repository Layer]
        Repos -->|Mongoose ODM| DB[(MongoDB fglifts)]
    end

    subgraph Storage
        AdminApp -->|Image URLs| CDN[Image CDN / Static URLs]
        ProductDetail -->|Panorama Textures| CDN
    end
```

### 4B. Request Flow

1. **Public Page Requests:**
   A public visitor makes a request to a route (e.g., `/products/[slug]`). Next.js fetches data inside an asynchronous Server Component by calling the appropriate repository function (e.g., `getProductBySlug`). The repository opens a database connection, performs the Mongoose query against MongoDB, retrieves a lean plain JavaScript object, and passes it back. Next.js renders the React structure on the server and streams the markup with client-side interactive islands.

2. **Admin Panel Requests:**
   An administrator attempts to access any route starting with `/admin`. The Next.js edge-middleware (`middleware.js`) intercepts the request, reads the HTTP-Only cookie, and decodes the JWT using a secure Web Crypto signature verifier. If verification fails, it redirects the user to `/admin/login`. If valid, the verifier decodes the payload, injects user identities (ID, role, email) into downstream headers, and proceeds. The layout reads headers and checks permissions. Page components call repository functions, verify access rights locally, fetch CRM or CMS data from MongoDB, and render the dashboard interface.

3. **Inquiry Form Submission & Queue Pipeline:**
   A visitor fills out the contact form. The client component posts to `/api/contact`. The endpoint parses the input, creates an `Inquiry` document in MongoDB, and logs details. It then triggers `email.service.js` to queue a thank-you confirmation email for the client. The service translates templates, inserts variables, and inserts a pending document into the `EmailQueue` collection. An asynchronous worker (`email-worker.js`) polls this collection every 15 seconds. If SMTP is configured, it fires via Nodemailer; in development, it writes compiled HTML templates directly to local files under `/scratch/emails/`. Upon success, the queue status updates to `sent`.

4. **Dynamic Layout Selection & Request Context:**
   To determine whether to display public elements (`Navbar`, `Footer`, `NewsletterStrip`, and smooth scroll `LenisProvider`) or serve a clean layout workspace for administrative tools, the system checks the pathname context inside the root layout (`src/app/layout.js`). Since Next.js Server Components do not natively expose the request URL/pathname to layout structures, the edge-middleware (`src/middleware.js`) intercepts all requests matching `/admin/:path*` and injects an `x-pathname` header containing the current route. The root layout then reads this header via `headers()` from `next/headers` to dynamically set `isAdmin = pathname.startsWith('/admin')` and render the appropriate layout shell.

---

## 5. Complete File & Directory Structure

```
fglifts/
├── src/
│   ├── app/                          # Next.js App Router — all page routes
│   │   ├── layout.js                 # Root layout: fonts, Lenis smooth scroll, conditional Navbar & Footer
│   │   ├── page.js                   # Home page — aggregates hero, stats, why-us, showcases, and contact
│   │   ├── globals.css               # Design tokens, CSS variables, Tailwind theme settings, and typography
│   │   ├── about/
│   │   │   └── page.js               # Brand details: timeline, leadership, values, certifications
│   │   ├── products/
│   │   │   ├── page.js               # Products page: tab selectors, filter tags, active product card grid
│   │   │   └── [slug]/
│   │   │       └── page.js           # Detail view: Lift360Viewer component, specifications, brochure, CTA
│   │   ├── gallery/
│   │   │   └── page.js               # Gallery page: staggered projects masonry layout, detail modal
│   │   ├── blog/
│   │   │   ├── page.js               # Blog index: featured posts showcase, grid layout by tag/category
│   │   │   └── [slug]/
│   │   │       └── page.js           # Read post layout, markdown parsing, author details, inline newsletter
│   │   ├── admin/
│   │   │   ├── layout.js             # Shell layout: admin navigation sidebar, topbar, authorization check
│   │   │   ├── page.js               # Root redirect page pointing users directly to /admin/dashboard
│   │   │   ├── login/
│   │   │   │   └── page.js           # Credentials panel validating administrators and setting JWT cookies
│   │   │   ├── dashboard/
│   │   │   │   └── page.js           # Main landing console: stats grid, recent leads list, system actions
│   │   │   ├── inquiries/
│   │   │   │   └── page.js           # Leads pipeline interface: switching kanban boards, search table, assignment
│   │   │   ├── products/
│   │   │   │   ├── page.js           # Products database table: list, edit status, delete triggers
│   │   │   │   ├── new/
│   │   │   │   │   └── page.js       # Product creator: details forms, specs builder, color panoramas settings
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.js   # Product metadata modifier: loads current database fields
│   │   │   ├── gallery/
│   │   │   │   ├── page.js           # Projects portfolio manager list view
│   │   │   │   ├── new/
│   │   │   │   │   └── page.js       # Project publisher: media assets, clients details, related products
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.js   # Project detail modifier
│   │   │   ├── blog/
│   │   │   │   ├── page.js           # Editorial articles manager listing
│   │   │   │   ├── new/
│   │   │   │   │   └── page.js       # Markdown editor page: cover images, tags, publication states
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.js   # BlogPost editor
│   │   │   ├── newsletter/
│   │   │   │   └── page.js           # Subscription manager: active subscriber grids, export utility
│   │   │   ├── users/
│   │   │   │   └── page.js           # Team access roster: user profiles, role mapping, state triggers
│   │   │   ├── email-templates/
│   │   │   │   └── page.js           # Templates editor: custom subjects, HTML bodies, code previews
│   │   │   └── logs/
│   │   │       └── page.js           # Read-only audit log viewer
│   │   └── api/                      # Next.js Server Route Handlers
│   │       ├── contact/
│   │       │   └── route.js          # POST — Client submission to Inquiry schema & outbound queue
│   │       ├── newsletter/
│   │       │   └── route.js          # POST subscribe subscriber, DELETE unsubscribe subscriber
│   │       ├── blog/
│   │       │   └── route.js          # GET published articles (public feed)
│   │       ├── products/
│   │       │   └── route.js          # GET active catalog lists (public feed)
│   │       ├── seed/
│   │       │   └── route.js          # GET endpoint to wipe data and seed mock catalogs
│   │       └── admin/                # Gated endpoints (JWT validation + RBAC permissions)
│   │           ├── auth/
│   │           │   ├── login/
│   │           │   │   └── route.js  # Authenticates email/password, signs token, sets cookie
│   │           │   └── logout/
│   │           │       └── route.js  # Deletes JWT cookie on signout
│   │           ├── inquiries/
│   │           │   ├── route.js      # GET inquiries (scoped by role), POST new inquiries
│   │           │   ├── [id]/
│   │           │   │   └── route.js  # PATCH updates (status, assignment, notes), DELETE inquiry
│   │           │   └── export/
│   │           │       └── route.js  # GET downloads current lead pipeline as CSV
│   │           ├── products/
│   │           │   ├── route.js      # GET all products, POST new product
│   │           │   └── [id]/
│   │           │       └── route.js  # GET, PATCH, DELETE product
│   │           ├── gallery/
│   │           │   ├── route.js      # GET all projects, POST new project
│   │           │   └── [id]/
│   │           │       └── route.js  # GET, PATCH, DELETE project
│   │           ├── blog/
│   │           │   ├── route.js      # GET all blog posts, POST new blog post
│   │           │   └── [id]/
│   │           │       └── route.js  # GET, PATCH, DELETE blog post
│   │           ├── newsletter/
│   │           │   └── route.js      # GET subscribers list, EXPORT CSV
│   │           ├── users/
│   │           │   ├── route.js      # GET administrative users, POST creates user
│   │           │   └── [id]/
│   │           │       └── route.js  # GET, PATCH (update role/status), DELETE user
│   │           ├── email-templates/
│   │           │   ├── route.js      # GET all email templates
│   │           │   └── [id]/
│   │           │       └── route.js  # PATCH template configurations
│   │           └── logs/
│   │               └── route.js      # GET audit logs with filters
│   ├── components/                   # React shared presentation library
│   │   ├── Navbar.jsx                # Sticky responsive header with blur and mobile menu
│   │   ├── Footer.jsx                # Responsive dark footer with corporate details
│   │   ├── LenisProvider.jsx         # Smooth scroll setup wrapper (client-side)
│   │   ├── PageHeroBanner.jsx        # Dark page header component
│   │   ├── FilterPillBar.jsx         # Custom filter navigation bar
│   │   ├── home/
│   │   │   ├── AboutTeaser.jsx       # Side-by-side about section
│   │   │   ├── ContactSection.jsx    # Inquiry form component
│   │   │   ├── Hero.jsx              # Main home visual teaser
│   │   │   ├── PartnersMarquee.jsx   # Infinite loop ticker of logotypes
│   │   │   ├── ProjectShowcase.jsx   # GSAP horizontal scrolling gallery
│   │   │   ├── ServicesGrid.jsx      # Highlighting vertical mobility divisions
│   │   │   ├── StatsStrip.jsx        # Key corporate metrics strip
│   │   │   ├── Testimonials.jsx      # Sliding review quotes
│   │   │   └── WhyFG.jsx             # Grid highlight section
│   │   ├── about/
│   │   │   └── Timeline.jsx          # GSAP scrolling chronological timeline
│   │   ├── products/
│   │   │   └── ProductCard.jsx       # Grid list display card
│   │   ├── product-detail/
│   │   │   └── Lift360Viewer.jsx     # Three.js 3D WebGL panoramic renderer component
│   │   ├── gallery/
│   │   │   ├── ProjectCard.jsx       # Grid project item
│   │   │   └── ProjectModal.jsx      # Staggered details and image carousel modal
│   │   ├── blog/
│   │   │   ├── BlogCard.jsx          # Article preview grid card
│   │   │   ├── BlogHero.jsx          # Top featured post header
│   │   │   ├── BlogEditor.jsx        # Markdown writer wrapper
│   │   │   └── NewsletterInline.jsx  # Inline signup component
│   │   └── admin/
│   │       ├── AdminSidebar.jsx      # Left workspace navigation menu
│   │       ├── AdminTopbar.jsx       # User profiles header with notifications
│   │       ├── CRMKanban.jsx         # Interactive Kanban drag-and-drop lead board
│   │       ├── CRMTable.jsx          # Interactive search, sort, filter data table
│   │       ├── StatCard.jsx          # Server Component stat renderer
│   │       ├── EmailTemplateEditor.jsx# Rich HTML code template editor
│   │       └── UserModal.jsx         # Account generator/modifier overlay
│   ├── models/                       # Mongoose database schema models
│   │   ├── Admin.js                  # User credentials and permissions overrides
│   │   ├── AuditLog.js               # Record of administrative modifications
│   │   ├── BlogPost.js               # Article details, markdown content, and pre-save read-timer
│   │   ├── EmailQueue.js             # Outbound spool tracking delivery status
│   │   ├── EmailTemplate.js          # Core HTML template definitions
│   │   ├── GalleryProject.js         # Portfolios data structure
│   │   ├── Inquiry.js                # Customer inquiries, tracking statuses, and notes
│   │   ├── Product.js                # Elevator catalogs, specifications, and 3D variants
│   │   └── Subscriber.js             # Newsletter subscriber records
│   ├── repositories/                 # Data access layer (no direct mongoose inside pages)
│   │   ├── admin.repository.js       # Admin queries: get, update, create
│   │   ├── auditLog.repository.js    # Immutable logging methods
│   │   ├── blog.repository.js        # Articles querying and updates
│   │   ├── emailQueue.repository.js  # Mail spool management
│   │   ├── emailTemplate.repository.js# Templates database operations
│   │   ├── gallery.repository.js     # Portfolio database queries
│   │   ├── inquiry.repository.js     # Leads CRM database operations
│   │   ├── product.repository.js     # Catalog database queries
│   │   └── subscriber.repository.js  # Newsletter database queries
│   ├── permissions/
│   │   └── roles.js                  # Definitions of ROLES, PERMISSIONS, and maps
│   ├── services/
│   │   └── email/
│   │       └── email.service.js      # Core template compiler and email queue manager
│   ├── lib/
│   │   ├── mongodb.js                # Connection pool configuration + email worker initializers
│   │   ├── auth.js                   # JWT validations, Web Crypto encoders, password hashing
│   │   ├── motion.js                 # Framer Motion transitions configuration
│   │   └── email-worker.js           # Async background mail queue loop polling
│   ├── scripts/
│   │   └── seed.js                   # Standalone database initialization script
│   └── middleware.js                 # Edge runtime authentication gate
├── scratch/
│   └── emails/                       # Development email outputs directory (gitignored)
├── public/
│   └── images/                       # Assets: mock cabin textures, project photos
├── .env.local                        # Active environment parameters (gitignored)
├── .env.example                      # Template for setup parameters
├── eslint.config.mjs                 # Flat ESLint configuration file
├── jsconfig.json                     # JS project compilation & path configurations
├── next.config.mjs                   # Next.js configuration rules
├── postcss.config.mjs                # PostCSS configuration including Tailwind CSS v4
└── package.json                      # Build scripts and dependencies tree
```

---

## 6. Database Schema Architecture

The relational structure of the Mongoose models is mapped out in the following Entity-Relationship Diagram (ERD):

```mermaid
erDiagram
    Admin {
        ObjectId  _id PK
        string    name
        string    email
        string    password "bcrypt hashed"
        string    role "SUPER_ADMIN|SALES_MANAGER|SALES_EXECUTIVE|MARKETING_MANAGER|CONTENT_EDITOR"
        boolean   isActive
        array     permissions "optional overrides"
        date      lastLoginAt
        ObjectId  createdBy FK
    }

    Inquiry {
        ObjectId  _id PK
        string    name
        string    email
        string    phone
        string    company
        string    city
        string    elevatorType
        string    floorCount
        string    message
        string    status "New|Contacted|Qualified|Closed|Rejected"
        array     notes "text, adminName, adminId, createdAt"
        ObjectId  assignedTo FK
        ObjectId  assignedBy FK
        date      assignedAt
        string    source
    }

    Product {
        ObjectId  _id PK
        string    slug UK
        string    name
        string    tagline
        string    category
        string    tabGroup "Systems|Cabins|Components"
        string    description
        array     specifications "key-value pairs"
        array     features
        array     applications
        array     images "url + alt"
        string    brochureUrl
        boolean   has360View
        string    defaultColor
        string    defaultFinish
        array     colorVariants "name, hex, panoramaImages, isActive"
        array     finishVariants "name, isActive"
        boolean   isFeatured
        string    badge
        boolean   isActive
        number    sortOrder
    }

    GalleryProject {
        ObjectId  _id PK
        string    title
        string    location
        string    clientType
        string    category
        number    year
        string    description
        string    coverImage
        array     images
        array     relatedProductSlugs
        boolean   isActive
        number    sortOrder
    }

    BlogPost {
        ObjectId  _id PK
        string    slug UK
        string    title
        string    excerpt
        string    coverImage
        string    content "HTML from Markdown"
        string    category
        array     tags
        object    author "name, avatar, title"
        number    readTime "auto-calculated"
        boolean   isPublished
        boolean   isFeatured
        date      publishedAt
        number    views
        array     relatedSlugs
    }

    Subscriber {
        ObjectId  _id PK
        string    email UK
        string    name
        string    source
        boolean   isActive
        date      confirmedAt
        date      unsubscribedAt
        array     tags
    }

    EmailTemplate {
        ObjectId  _id PK
        string    name UK "inquiry_received|lead_assigned|newsletter_welcome"
        string    subject
        string    body "HTML with placeholders"
        array     variables
        boolean   isActive
    }

    EmailQueue {
        ObjectId  _id PK
        string    to
        string    subject
        string    body "compiled HTML"
        string    status "pending|sent|failed"
        number    attempts
        number    maxAttempts
        date      lastAttemptAt
        date      sentAt
        string    error
        string    templateName
        string    relatedId
    }

    AuditLog {
        ObjectId  _id PK
        string    action
        object    performedBy "adminId, name, email, role"
        string    targetId
        string    targetType
        mixed     details
        string    ipAddress
        date      createdAt
    }

    Admin ||--o{ Inquiry : "assigned to"
    Admin ||--o{ Inquiry : "assigned by"
    Admin ||--o{ AuditLog : "performed by"
```

### Models Definitions

#### `Admin`
Stores accounts for managers, executives, and editor staff.

| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique identifier |
| `name` | String | Required | Full display name |
| `email` | String | Required, Unique, Lowercase | Primary contact and login identifier |
| `password` | String | Required | 12-round bcrypt hash |
| `role` | String | Enum, Required | One of ROLES (SUPER_ADMIN, etc.) |
| `isActive` | Boolean | Default: `true` | Status flag |
| `permissions`| Array (String) | Optional overrides | Extra rights configuration |
| `lastLoginAt`| Date | — | Timestamp of last authenticated session |

#### `Inquiry`
Contains information from home contact and detail pages lead submissions.

| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique identifier |
| `name` | String | Required | Lead contact name |
| `email` | String | Required, Lowercase | Lead email address |
| `phone` | String | Required | Lead telephone number |
| `company` | String | Optional | Lead organization name |
| `city` | String | Optional | Lead geographical origin |
| `elevatorType`| String | Optional | Selected lift category |
| `floorCount` | String | Optional | Project vertical requirements |
| `message` | String | Optional | Message details |
| `status` | String | Enum, Default: `'New'` | CRM state (`'New'`, `'Contacted'`, `'Qualified'`, `'Closed'`, `'Rejected'`) |
| `source` | String | Default: `'Website...'` | Origin tracker |
| `assignedTo` | ObjectId | Ref: `'Admin'` | Assigned account |
| `assignedBy` | ObjectId | Ref: `'Admin'` | Assigning manager |
| `assignedAt` | Date | — | Assignment timestamp |
| `notes` | Array (Object) | Embedded schema | CRM notes: `text` (String), `adminName` (String), `adminId` (ObjectId), `createdAt` (Date) |

#### `Product`
Houses specifications, visual variants, and assets for elevators and components.

| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique identifier |
| `slug` | String | Required, Unique, Lowercase | URL path token |
| `name` | String | Required | Product display title |
| `tagline` | String | Optional | Accompanying highlight tag |
| `category` | String | Required | Major category: `'Passenger'`, `'Capsule'`, etc. |
| `subCategory`| String | Optional | Fine-grain sub-classification |
| `tabGroup` | String | Enum, Default: `'Systems'`| One of `'Systems'`, `'Cabins'`, `'Components'` |
| `description`| String | Optional | Rich text CMS summary |
| `specifications`| Array (Object) | Nested key/value | Technical specifications |
| `features` | Array (String) | Optional | Highlight points list |
| `applications`| Array (String) | Optional | Building uses (Residential, etc.) |
| `images` | Array (Object) | Nested url/alt | Product visual assets |
| `brochureUrl`| String | Optional | PDF download reference |
| `has360View` | Boolean | Default: `false` | Displays 360 viewer component flag |
| `defaultColor`| String | Optional | Default active color variant key |
| `defaultFinish`| String | Optional | Default active finish variant key |
| `colorVariants`| Array (Object) | Nested configuration | 360-configurator files mapping |
| `finishVariants`| Array (Object)| Nested configuration | Standard finish selectors |
| `isFeatured` | Boolean | Default: `false` | Landing grid showcase status |
| `badge` | String | Optional | Banner tag (e.g. `'NEW'`) |
| `isActive` | Boolean | Default: `true` | Live visibility status |
| `sortOrder` | Number | Default: `0` | Sequence control index |

#### `GalleryProject`
Case studies, installations, and builder accomplishments.

| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique identifier |
| `title` | String | Required | Project display title |
| `location` | String | Optional | Geographic context |
| `clientType` | String | Optional | Sector category (Residential, Commercial, etc.) |
| `category` | String | Optional | Staggered grid filter tag |
| `year` | Number | Optional | Construction year |
| `description`| String | Optional | Case study text |
| `coverImage` | String | Required | Grid primary asset URL |
| `images` | Array (String) | Optional | Modal carousel asset URLs |
| `relatedProductSlugs`| Array (String)| Optional | Cross-linked product identifiers |
| `isActive` | Boolean | Default: `true` | Show status |
| `sortOrder` | Number | Default: `0` | Order control |

#### `BlogPost`
Editorial content, technical articles, and announcements.

| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique identifier |
| `slug` | String | Required, Unique, Lowercase | Post URL path token |
| `title` | String | Required | Article display title |
| `excerpt` | String | Optional | Grid list card intro snippet |
| `coverImage` | String | Optional | Primary header layout image |
| `coverImageAlt`| String | Default: `''` | SEO image accessibility text |
| `content` | String | Optional | Full body text written in Markdown |
| `category` | String | Optional | Section categorizer |
| `tags` | Array (String)| Optional | Post tags |
| `author` | Object | Nested fields | `name` (String), `avatar` (String), `title` (String) |
| `readTime` | Number | Computed on Save | Calculated reading estimate |
| `isPublished`| Boolean | Default: `false` | Live site publication flag |
| `isFeatured` | Boolean | Default: `false` | Landing banner spotlight status |
| `publishedAt`| Date | — | Timestamp of publication |
| `views` | Number | Default: `0` | Hit tracker |
| `relatedSlugs`| Array (String)| Optional | Cross-linked article slugs |

#### `Subscriber`
Newsletter campaign contact pool database.

| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique identifier |
| `email` | String | Required, Unique, Lowercase | Recipient address |
| `name` | String | Optional | Contact name |
| `source` | String | Default: `'Footer...'` | Subscription origin |
| `isActive` | Boolean | Default: `true` | Subscription state |
| `confirmedAt`| Date | — | Opt-in timestamp |
| `unsubscribedAt`| Date | — | Opt-out timestamp |
| `tags` | Array (String)| Optional | Interest segmentation tags |

#### `EmailTemplate`
Bespoke templates parsed with dynamic variables for notifications.

| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique identifier |
| `name` | String | Required, Unique | Lookup key (e.g. `'inquiry_received'`) |
| `subject` | String | Required | Email subject line with template markers |
| `body` | String | Required | HTML body with double curly-brace variables |
| `variables` | Array (String)| Optional | List of matching parameters |
| `isActive` | Boolean | Default: `true` | Live compilation availability status |

#### `EmailQueue`
Mail tracking queue.

| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique identifier |
| `to` | String | Required | Destination address |
| `subject` | String | Required | Output subject line |
| `body` | String | Required | Fully rendered HTML body |
| `status` | String | Enum, Default: `'pending'`| Delivery state (`'pending'`, `'sent'`, `'failed'`) |
| `attempts` | Number | Default: `0` | Resend iteration tracker |
| `maxAttempts` | Number | Default: `3` | Maximum retry limit |
| `lastAttemptAt`| Date | — | Last attempt timestamp |
| `sentAt` | Date | — | Successful delivery timestamp |
| `error` | String | Optional | Error details |
| `templateName`| String | Optional | Source template log |
| `relatedId` | String | Optional | Origin document index (lead, sub, user) |

#### `AuditLog`
Immutable system records.

| Field | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto PK | Unique identifier |
| `action` | String | Required | Action code (e.g., `'product_created'`) |
| `performedBy` | Object | Nested fields | `adminId` (ObjectId), `name` (String), `email` (String), `role` (String) |
| `targetId` | String | Optional | Affected document ID |
| `targetType` | String | Optional | Target model name |
| `details` | Mixed | Optional | State details object |
| `ipAddress` | String | Optional | Performed IP address |

---

## 7. RBAC — Roles & Permissions

The system implements a granular **Role-Based Access Control (RBAC)** model. Security permissions are verified at the edge by the middleware, evaluated in Layout contexts, and enforced inside API routes before data operations run.

### Role Descriptions

- **Super Admin:** Holds complete structural ownership. Able to write/modify users, assign leads, adjust CRM entries, configure and update global email templates, modify marketing feeds, and inspect system log files. Cannot delete or deactivate their own active profile.
- **Sales Manager:** Owns CRM pipeline operations. Able to see all customer inquiries, assign leads to executives, change lead statuses, write CRM logs, export lead databases, and inspect audit logs. Cannot modify products, portfolio galleries, blog posts, email templates, or user profiles.
- **Sales Executive:** Gated to their own operations. Allowed to see and edit only inquiries assigned to them, add notes, and modify lead statuses. Forbidden from accessing other executives' portfolios, deleting files, exporting databases, or accessing email templates or blog layouts.
- **Marketing Manager:** Drives subscriber outreach and brand campaigns. Gated to newsletter subscriber grids, subscriber exports, email templates, and corporate blog content. Forbidden from accessing the inquiries pipeline, database updates, or user accounts.
- **Content Editor:** Gated to website content updates. Holds creation, edit, publication, and deletion access for products, portfolio galleries, and blog articles. Forbidden from viewing customer inquiries, templates, logs, or user rosters.

### Permissions Matrix

The permissions are defined in [roles.js](file:///Users/krishna/fg%20trail/fg-lift-website/src/permissions/roles.js):

| Permission | Super Admin | Sales Manager | Sales Executive | Marketing Manager | Content Editor |
|---|:---:|:---:|:---:|:---:|:---:|
| **`VIEW_ALL_INQUIRIES`** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **`VIEW_OWN_INQUIRIES`** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **`ASSIGN_INQUIRY`** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **`UPDATE_INQUIRY_STATUS`** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **`ADD_INQUIRY_NOTE`** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **`DELETE_INQUIRY`** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **`EXPORT_CRM`** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **`VIEW_PRODUCTS`** | ✅ | ✅ | ✅ | ❌ | ✅ |
| **`CREATE_PRODUCT`** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **`EDIT_PRODUCT`** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **`DELETE_PRODUCT`** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **`VIEW_GALLERY`** | ✅ | ✅ | ❌ | ❌ | ✅ |
| **`CREATE_GALLERY`** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **`EDIT_GALLERY`** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **`DELETE_GALLERY`** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **`VIEW_BLOG`** | ✅ | ✅ | ❌ | ✅ | ✅ |
| **`CREATE_BLOG`** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **`EDIT_BLOG`** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **`DELETE_BLOG`** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **`PUBLISH_BLOG`** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **`VIEW_SUBSCRIBERS`** | ✅ | ✅ | ❌ | ✅ | ❌ |
| **`EXPORT_SUBSCRIBERS`** | ✅ | ❌ | ❌ | ✅ | ❌ |
| **`VIEW_USERS`** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **`CREATE_USER`** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **`EDIT_USER`** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **`DELETE_USER`** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **`VIEW_EMAIL_TEMPLATES`**| ✅ | ❌ | ❌ | ✅ | ❌ |
| **`EDIT_EMAIL_TEMPLATES`**| ✅ | ❌ | ❌ | ✅ | ❌ |
| **`VIEW_LOGS`** | ✅ | ✅ | ❌ | ✅ | ❌ |

---

## 8. Complete API Reference

### Public API Routes

| Method | Route | Auth | Required Body / Query | Success Response | Description |
|---|---|---|---|---|---|
| **POST** | `/api/contact` | None | `{ name, email, phone, company, city, elevatorType, floorCount, message }` | `{ success: true, inquiryId }` | Submits inquiry, writes to DB, queues confirmation email. |
| **POST** | `/api/newsletter` | None | `{ email, name }` | `{ success: true }` | Subscribes email address to newsletter database. |
| **DELETE**| `/api/newsletter` | None | Query: `?email=user@domain.com` | `{ success: true }` | Unsubscribes email address (sets active flag to false). |
| **GET** | `/api/blog` | None | Query: `?category=...&tag=...&page=...` | `{ success: true, posts, pagination }` | Returns a paginated list of published articles. |
| **GET** | `/api/products` | None | Query: `?tabGroup=...&category=...` | `{ success: true, products }` | Returns active product catalogs from DB. |

---

### Admin API Routes

All routes below require a valid HTTP-Only JWT Cookie (`fg_admin_token`).

| Method | Route | Permission | Request Body / Query | Success Response | Description |
|---|---|---|---|---|---|
| **POST** | `/api/admin/auth/login` | None | `{ email, password }` | `{ success: true, admin }` | Validates credentials, sets `fg_admin_token` cookie. |
| **POST** | `/api/admin/auth/logout`| None | — | `{ success: true }` | Wipes the authentication token cookie. |
| **GET** | `/api/admin/inquiries` | `VIEW_*_INQUIRIES`| Query: `?status=...&assignedTo=...` | `{ success: true, inquiries }` | Lists CRM inquiries, filtered by role bounds. |
| **PATCH**| `/api/admin/inquiries/[id]`| `UPDATE_INQUIRY_STATUS` or `ASSIGN_INQUIRY` | `{ status, assignedTo, noteText }` | `{ success: true, inquiry }` | Updates CRM status, assignments, or appends notes. |
| **DELETE**| `/api/admin/inquiries/[id]`| `DELETE_INQUIRY` | — | `{ success: true }` | Permanently deletes a lead entry from the CRM database. |
| **GET** | `/api/admin/inquiries/export`| `EXPORT_CRM` | — | Raw CSV Stream output | Downloads current leads database as a formatted CSV file. |
| **GET** | `/api/admin/products` | `VIEW_PRODUCTS` | — | `{ success: true, products }` | Returns all products in the database. |
| **POST** | `/api/admin/products` | `CREATE_PRODUCT` | Product JSON metadata | `{ success: true, product }` | Creates a new catalog item. |
| **PATCH**| `/api/admin/products/[id]`| `EDIT_PRODUCT` | Product JSON metadata | `{ success: true, product }` | Updates catalog details. |
| **DELETE**| `/api/admin/products/[id]`| `DELETE_PRODUCT` | — | `{ success: true }` | Removes catalog item. |
| **GET** | `/api/admin/gallery` | `VIEW_GALLERY` | — | `{ success: true, projects }` | Returns case study installations catalog. |
| **POST** | `/api/admin/gallery` | `CREATE_GALLERY` | Project JSON metadata | `{ success: true, project }` | Creates portfolio entry. |
| **PATCH**| `/api/admin/gallery/[id]`| `EDIT_GALLERY` | Project JSON metadata | `{ success: true, project }` | Modifies portfolio details. |
| **DELETE**| `/api/admin/gallery/[id]`| `DELETE_GALLERY` | — | `{ success: true }` | Deletes portfolio entry. |
| **GET** | `/api/admin/blog` | `VIEW_BLOG` | — | `{ success: true, posts }` | Returns all draft and published blog articles. |
| **POST** | `/api/admin/blog` | `CREATE_BLOG` | BlogPost JSON metadata | `{ success: true, post }` | Creates a new draft blog article. |
| **PATCH**| `/api/admin/blog/[id]` | `EDIT_BLOG` or `PUBLISH_BLOG` | BlogPost JSON metadata | `{ success: true, post }` | Updates or publishes an article. |
| **DELETE**| `/api/admin/blog/[id]` | `DELETE_BLOG` | — | `{ success: true }` | Permanently deletes a blog article. |
| **GET** | `/api/admin/newsletter` | `VIEW_SUBSCRIBERS` | Query: `?status=...&export=true` | CSV Stream or JSON payload | Returns newsletter roster details or exports CSV. |
| **GET** | `/api/admin/users` | `VIEW_USERS` | — | `{ success: true, users }` | Lists all administrative accounts. |
| **POST** | `/api/admin/users` | `CREATE_USER` | `{ name, email, password, role }` | `{ success: true, user }` | Generates a new administrative profile. |
| **PATCH**| `/api/admin/users/[id]` | `EDIT_USER` | `{ name, email, role, isActive }` | `{ success: true, user }` | Updates administrative profiles. |
| **DELETE**| `/api/admin/users/[id]` | `DELETE_USER` | — | `{ success: true }` | Removes administrative account. |
| **GET** | `/api/admin/email-templates`| `VIEW_EMAIL_TEMPLATES`| — | `{ success: true, templates }` | Returns notification templates list. |
| **PATCH**| `/api/admin/email-templates/[id]`| `EDIT_EMAIL_TEMPLATES`| `{ subject, body }` | `{ success: true, template }` | Updates template HTML code definitions. |
| **GET** | `/api/admin/logs` | `VIEW_LOGS` | Query: `?action=...&performedBy=...` | `{ success: true, logs }` | Returns system audit trails list. |

---

### Request & Response Specifications

#### Public Inquiry Submission (`POST /api/contact`)
- **Headers:** `Content-Type: application/json`
- **Request Body JSON:**
```json
{
  "name": "Krishna Patel",
  "email": "krishna@example.com",
  "phone": "+91 98765 43210",
  "company": "Patel Builders",
  "city": "Surat",
  "elevatorType": "Capsule",
  "floorCount": "6",
  "message": "Interested in a customized premium glass capsule lift."
}
```
- **Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully.",
  "inquiryId": "65b4f8a12d8a4f6c4c00010a"
}
```
- **Error Response (400 Bad Request):**
```json
{
  "error": "Name, email, and phone are required fields."
}
```

#### Admin Login Verification (`POST /api/admin/auth/login`)
- **Headers:** `Content-Type: application/json`
- **Request Body JSON:**
```json
{
  "email": "admin@fglifts.com",
  "password": "FGLift@Admin2025!"
}
```
- **Success Response (200 OK):**
```json
{
  "success": true,
  "admin": {
    "id": "65b4f8a12d8a4f6c4c000001",
    "name": "Super Admin",
    "email": "admin@fglifts.com",
    "role": "SUPER_ADMIN"
  }
}
```
*(Sets HttpOnly cookie `fg_admin_token` containing the signed JWT payload).*
- **Error Response (401 Unauthorized):**
```json
{
  "error": "Invalid email or password."
}
```

---

## 9. Design System

The system design tokens are defined in [globals.css](file:///Users/krishna/fg%20trail/fg-lift-website/src/app/globals.css) and registered in Tailwind CSS v4's theme inline config block.

### Color Tokens

| Variable | Tailwind Hex | Usage |
|---|---|---|
| `--bg-cream` | `#F5F0EB` | Primary body background (light sections) |
| `--bg-cream-alt` | `#EDE8E2` | Secondary body background (alternating layout stripes) |
| `--bg-dark` | `#111111` | Primary dark background (hero units, navigation menu, footers) |
| `--bg-dark-2` | `#1A1A1A` | Dark card backgrounds |
| `--fg-blue` | `#0E4FB3` | Accent blue (brand mark, action links, select buttons, stat accents) |
| `--fg-blue-light` | `#E8F0FC` | Accent blue background panels |
| `--fg-red` | `#D72638` | System warning states, delete buttons, error alerts |
| `--fg-orange` | `#E8600A` | System pending alerts, orange highlight states |
| `--text-dark` | `#111111` | Primary text color for light panels |
| `--text-body` | `#3D3D3D` | Content copy body text color |
| `--text-muted` | `#7A7A7A` | Muted subtitle text color |
| `--text-cream` | `#F5F0EB` | Text highlights inside dark backgrounds |
| `--border-light` | `#E0D9D0` | Standard layout dividers |
| `--border-dark` | `rgba(255,255,255,0.1)`| Dividers inside dark sections |

### Typography

| Font Family | Style Variable | Usage |
|---|---|---|
| **DM Serif Display** | `--font-display` | Primary page title, layout headers, stats text, quotes |
| **DM Sans** | `--font-sans` | Standard paragraph text, navigation list, input elements, buttons |
| **JetBrains Mono** | `--font-mono` | Technical stats, metrics tables, system log codes, metadata tags |

### Animation Presets

The motion presets are exported from [motion.js](file:///Users/krishna/fg%20trail/fg-lift-website/src/lib/motion.js):

- **`fadeIn`**: Fades elements from opacity 0 to 1 over 0.6s.
  *Usage:* `<motion.div variants={fadeIn} initial="hidden" animate="visible" />`
- **`slideUp`**: Slides elements upward from y: 30 to y: 0.
  *Usage:* `<motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} />`
- **`staggerContainer`**: Parents block orchestrating delayed staggered triggers for child items.
  *Usage:* `<motion.div variants={staggerContainer} initial="hidden" whileInView="show" />`
- **`staggerItem`**: Child fade-and-rise animation variant triggering in sequence.
  *Usage:* `<motion.div variants={staggerItem} />`

### Layout Rules

To preserve aesthetic consistency, developers must align page elements with the following structural layout patterns:
- **Hero units and landing titles:** Must use dark backgrounds (`--bg-dark` / `#111111`) with high contrast text.
- **Section backgrounds:** Must alternate between light cream (`--bg-cream` / `#F5F0EB`) and slightly darker cream (`--bg-cream-alt` / `#EDE8E2`) to break up scroll sections.
- **Important metrics strips:** Use solid primary blue backgrounds (`--fg-blue` / `#0E4FB3`) with white text highlights.
- **Global footer bands:** Always use the deep dark shade (`--bg-dark` / `#111111`).
- **Admin panel layout:** Main backdrop uses admin grey (`--admin-bg` / `#F4F6F9`), cards use clean white (`#FFFFFF`) with thin borders, and the sidebar uses deep charcoal (`#111827`).

---

## 10. Three.js 360° Cabin Viewer

The **`Lift360Viewer.jsx`** component is a WebGL-based cabin virtual tour application integrated on `/products/[slug]`.

### How It Works
- **WebGL Geometry:** Utilizes a Three.js `THREE.SphereGeometry` with inverted normals (`sphere.geometry.scale(-1, 1, 1)`), which projects textures onto the inside surface of the sphere rather than the outside.
- **Environment Texture Mapping:** Projects high-resolution equirectangular panorama textures onto the sphere material.
- **Camera Positioning:** The camera is locked at coordinates `(0, 0, 0)` at the center of the sphere, looking outward.

### Interactive Configurator & Textures
- When the user selects a different color swatch, a state change occurs in the parent component.
- The viewer intercepts the updated color configuration and uses `THREE.TextureLoader` to fetch the new panorama asset (e.g., `/images/cabin_gold_panorama.png`).
- To prevent GPU resource leaks, the old texture is completely freed from memory (`oldTexture.dispose()`) before the new one is applied and rendered.
- **Default Fallback:** The viewer checks if a variant asset is defined in the database. If missing, it dynamically falls back to `/images/cabin_silver_panorama.png` rather than hardcoding texture files.

### Camera Controls & Interaction
- The camera rotates based on click-and-drag (mouse) or touch-and-drag (mobile) gestures.
- The drag delta modifies two target variables: `targetLon` (longitude) and `targetLat` (latitude).
- Inside the animation tick loop, the coordinates are lerped toward their targets:
  ```javascript
  lon += (targetLon - lon) * 0.15;
  lat += (targetLat - lat) * 0.15;
  ```
  This creates smooth, decelerating motion when the user releases their click/touch.

### Transition Animations
- Custom elevator door slide panels (styled with absolute CSS transitions and `translateX`) simulate cabin doors opening.
- Once the texture loader finishes, it delays for `800ms` before sliding the panels open, revealing the interactive 3D WebGL interior.
- **React Strict Mode Guard:** React 18+ runs layout effects twice in development. To prevent double-instantiating the WebGL canvas, the component uses a `mountedRef.current` guard:
  ```javascript
  if (mountedRef.current) return;
  mountedRef.current = true;
  ```

### Disposal and Cleanup
Upon component unmounting, all WebGL objects are fully disposed of to avoid memory leaks:
```javascript
renderer.dispose();
geometry.dispose();
material.dispose();
texture.dispose();
cancelAnimationFrame(animationFrameId);
container.removeChild(renderer.domElement);
```

### Configuring a New 360° Product
To make a product 360°-viewable in the store:
1. Upload your equirectangular spherical panorama image (e.g., `gold.png`) to public folder assets.
2. In the Admin Panel, select/create the product.
3. Check the **Has 360° Configurator** option.
4. Under **Configurator Color Finishes**, add your color variant (name, hex code) and define the texture files mapping. Save.

---

## 11. Email System

The outbound email pipeline processes system alerts and client communications asynchronously.

```
Form Submit / Admin Action
        ↓
email.service.js — queueEmail()
        ↓
Fetches EmailTemplate from DB → compiles {{placeholders}}
        ↓
Writes document to EmailQueue collection (status: pending)
        ↓
email-worker.js polls every 15 seconds
        ↓
        ├── SMTP configured → sends via Nodemailer → status: sent
        └── SMTP missing (dev) → writes HTML to /scratch/emails/ → status: sent
```

### Available Email Templates

| Template Name | Trigger | Recipient | Variables |
|---|---|---|---|
| **`inquiry_received`** | Customer submits public contact form. | Client (lead) | `{{name}}`, `{{product}}`, `{{referenceId}}` |
| **`lead_assigned`** | Sales Manager assigns lead to an executive. | Sales Executive | `{{executiveName}}`, `{{clientName}}`, `{{assignedBy}}` |
| **`newsletter_welcome`**| Subscriber signs up via newsletter form. | Subscriber | `{{name}}` |

### Adding a New Template
1. Go to `/admin/email-templates`.
2. Click **Create Template** (requires SUPER_ADMIN privileges).
3. Assign a unique name code (e.g., `quote_followup`), write your subject line, and enter the raw HTML body.
4. Define dynamic parameters using `{{variableName}}` markers.
5. In your API route or repository, trigger delivery:
   ```javascript
   await queueEmail({
     to: recipientEmail,
     templateName: 'quote_followup',
     variables: { variableName: 'Dynamic Value' },
     relatedId: documentId
   });
   ```

---

## 12. Admin Panel Guide

The administrative console is located at `/admin`. 

### Page Walkthroughs

#### Dashboard
- **Access:** `SUPER_ADMIN`, `SALES_MANAGER`, `MARKETING_MANAGER`, `CONTENT_EDITOR`
- **Function:** Displays high-level CRM and CMS statistics: total leads, new leads (30 days), active products count, newsletter subscribers count, published articles, and pending emails. It also displays a list of the 5 most recent inquiries.
- **Actions:** Quick links to jump to CRM, add new catalog products, or write blog posts.

#### Inquiries (CRM Pipeline)
- **Access:** `SUPER_ADMIN`, `SALES_MANAGER`, `SALES_EXECUTIVE`
- **Function:** The primary lead tracking interface. Includes a Kanban Board showing leads grouped by status columns, and a tabular list view with search, filter, and sort capabilities.
- **Actions:** Drag-and-drop leads between status columns to update them instantly. Click a lead card to open the detail panel, update status dropdowns, assign the lead to a Sales Executive, write notes, or delete the inquiry entry (Super Admin only). Export the pipeline as a CSV file.
- **Restrictions:** Sales Executives can only view, update, and add notes to inquiries assigned to them. The Kanban and list views automatically filter by executive ID at the database level.

#### Products (CMS Catalog)
- **Access:** `SUPER_ADMIN`, `CONTENT_EDITOR`
- **Function:** List, create, and edit products, cabin enclosures, and components.
- **Actions:** Update product details (tags, categories, specifications, color variants, and 360° panorama maps). Add image assets by URL, build specification tables, toggle featured flags, or delete catalog items.

#### Gallery (Portfolio CMS)
- **Access:** `SUPER_ADMIN`, `CONTENT_EDITOR`
- **Function:** Portfolio showcase manager.
- **Actions:** Create, update, or delete case studies. Set titles, client sectors, location fields, construction years, cover image assets, carousel slide details, and related product mappings.

#### Blog (CMS Editorial)
- **Access:** `SUPER_ADMIN`, `CONTENT_EDITOR`, `MARKETING_MANAGER`
- **Function:** Editorial manager.
- **Actions:** Write articles using a split markdown and code editor. Toggle draft/published states, upload cover graphics, add category tags, set author profiles, and link related posts.
- **Features:** Dynamically calculates article read time upon save.

#### Newsletter (Subscriptions)
- **Access:** `SUPER_ADMIN`, `SALES_MANAGER`, `MARKETING_MANAGER`
- **Function:** Lists newsletter subscribers with subscription dates, status filters, and active tags.
- **Actions:** Manually add subscribers, toggle subscription status, and export the mailing list as a CSV.

#### Users (RBAC Roster)
- **Access:** `SUPER_ADMIN`
- **Function:** Security control panel for managing admin accounts and RBAC roles.
- **Actions:** Create new accounts, modify existing profiles (change roles or toggle activity flags), and reset passwords.
- **Self-Protection Rules:** Logged-in admins cannot delete or deactivate their own profiles. The final remaining account with a `SUPER_ADMIN` role cannot be deleted or deactivated.

#### Email Templates (HTML Customizer)
- **Access:** `SUPER_ADMIN`, `MARKETING_MANAGER`
- **Function:** Customizer for system-generated email templates.
- **Actions:** Edit HTML templates, adjust subjects, and reference dynamic variables.
- **Features:** Render template previews inside an sandbox iframe using mock data.

#### Audit Logs (Immutable Trail)
- **Access:** `SUPER_ADMIN`, `SALES_MANAGER`, `MARKETING_MANAGER`
- **Function:** Immutable audit trail showing system-wide operational changes.
- **Actions:** Filter log items by action code, administrator name, or date range.
- **Restrictions:** The database does not expose write, edit, or delete endpoints for this collection; logs can only be created as side-effects of admin actions.

---

## 13. Installation & Local Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB running locally on port `27017` (or a MongoDB Atlas connection string)

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone [repo-url]
   cd fg-lift-website
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local — see Environment Variables section below
   ```

4. **Seed the database:**
   Execute the idempotent seeder to populate default products, projects, articles, templates, and the default Super Admin account:
   ```bash
   node --env-file=.env.local src/scripts/seed.js
   ```

5. **Start the development server:**
   Launch Next.js in Turbopack development mode:
   ```bash
   npm run dev
   ```

6. **Open in your browser:**
   - Public website: `http://localhost:3000`
   - Admin console: `http://localhost:3000/admin`

---

## 14. Environment Variables

Create an `.env.local` file in the root directory. Follow this template:

```bash
# ─── DATABASE ───────────────────────────────────────────
MONGODB_URI=mongodb://127.0.0.1:27017/fglifts
# For production use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/fglifts

# ─── AUTH ───────────────────────────────────────────────
JWT_SECRET=replace-with-minimum-32-character-random-string
# Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# ─── APP ────────────────────────────────────────────────
NEXT_PUBLIC_URL=http://localhost:3000
# Production: https://fglifts.com

# ─── EMAIL / SMTP ───────────────────────────────────────
# Leave blank in development — emails write to /scratch/emails/ instead
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
# Production example (Gmail):
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
```

---

## 15. Deployment

### Vercel + MongoDB Atlas Setup

1. **Database setup:** Create a cluster on MongoDB Atlas, configure database users, enable network access (whitelist IP addresses or allow access from anywhere), and copy your connection string.
2. **Push codebase to GitHub:**
   ```bash
   git add .
   git commit -m "Configure production deployment"
   git push origin main
   ```
3. **Import to Vercel:** Open the Vercel Dashboard, import your project repository, and configure the Environment Variables in the project settings:
   - `MONGODB_URI` (Atlas connection string)
   - `JWT_SECRET` (Strong random key string)
   - `NEXT_PUBLIC_URL` (Production URL: `https://your-domain.com`)
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (Production SMTP details)
4. **Deploy:** Click **Deploy**. Vercel will build and host your Next.js application.
5. **Seed the production database:**
   Run the seeder locally while pointing to your production database to initialize default credentials:
   ```bash
   MONGODB_URI="mongodb+srv://..." node src/scripts/seed.js
   ```

### Post-Deployment Checklist
- [ ] Log in to `/admin` using default credentials and **immediately** change the password.
- [ ] Submit a public contact form entry and verify it saves to the production database.
- [ ] Confirm a confirmation email is created in the database and successfully delivered via SMTP.
- [ ] Verify that Sales Executives can only view inquiries assigned to them.
- [ ] Confirm that Content Editors are blocked from accessing CRM routes (`/admin/inquiries`, `/admin/users`, etc.).

---

## 16. Seeder Reference

The database seeder is idempotent and safe to run at any stage of development.

- **Run command:**
  ```bash
  node --env-file=.env.local src/scripts/seed.js
  ```

### Seeder Rules
- **Super Admin:** Checks if `admin@fglifts.com` exists. If missing, it creates the account with the hashed password `FGLift@Admin2025!`. If it exists but has a different role, it upgrades the account to `SUPER_ADMIN`.
- **Email Templates:** Checks if templates matching default names (e.g., `inquiry_received`) exist. Missing templates are created; existing ones are skipped to preserve modifications.
- **Wiping Catalogs:** The seeder clears mock products, projects, and articles before re-seeding them to keep the demo environment clean.

### Seeded Credentials
- **Email:** `admin@fglifts.com`
- **Password:** `FGLift@Admin2025!`
- **Role:** `SUPER_ADMIN`

---

## 17. Security

- **Authentication:** JWT tokens are stored in secure `httpOnly` cookies with `sameSite: 'lax'` rules. This prevents access via client-side JavaScript, protecting against Cross-Site Scripting (XSS) attacks.
- **Route Protection:** Gated routes starting with `/admin` are protected by `middleware.js` at the edge. The middleware validates the token, extracts the payload, and forwards identity headers.
- **Endpoint Gating:** In addition to middleware routing blocks, each API route verifies the user's role and permissions against `ROLE_PERMISSIONS` before performing operations.
- **Data Isolation:** For Sales Executives, query filters restrict database operations (e.g., `Inquiry.find({ assignedTo: admin.id })`) to isolate records at the database level rather than simply filtering them in the UI.
- **Audit Logs:** Key admin mutations (creating/deleting products, updating leads, exporting database lists) write an immutable `AuditLog` entry tracking the action type, administrator identity, timestamp, and client IP address.
- **Password Encryption:** Admin passwords are encrypted using `bcryptjs` with `12` salt rounds. They are never stored in plain text.
- **Self-Protection Rules:** The system prevents logged-in administrators from deleting or deactivating their own accounts. Additionally, the last remaining `SUPER_ADMIN` profile cannot be deleted.

---

## 18. Development Conventions

To maintain a clean and maintainable codebase, developers should follow these conventions:

### Repository Pattern
- **Rules:** Do not import Mongoose models or run queries directly inside Next.js API route handlers or Server Components. Always go through the repository layer (`src/repositories/`).
- **Functionality:** Repositories handle database connections internally via `connectDB()`. They query the database, convert results using `.lean()`, and return plain JavaScript objects to keep data processing separate from UI rendering.

### Server vs. Client Components
- **Server Components:** Use Server Components by default for static sections, layouts, and pages that fetch data. Fetch data directly in async components without using `useEffect` hooks.
- **Client Components:** Add the `'use client'` directive only when a component requires React hooks (`useState`, `useEffect`), handles user interaction (forms, toggles), or calls browser APIs. Pass only plain, serializable objects (no functions or classes) as props from Server to Client Components.

### Naming Conventions
- **Routing Pages:** `page.js` and `layout.js` (standard Next.js App Router conventions).
- **React Components:** PascalCase file naming with `.jsx` extensions (e.g., `Lift360Viewer.jsx`).
- **Helper Utilities:** camelCase file naming with `.js` extensions (e.g., `auth.js`).
- **Database Models:** PascalCase file naming matching the collection name (e.g., `Inquiry.js`).
- **Repositories:** File naming matching the target model (e.g., `inquiry.repository.js`).

### standard API Security Pattern
Every admin route handler must implement this authentication pattern:
```javascript
import { getAdmin } from '@/lib/auth'
import { hasPermission } from '@/permissions/roles'
import { createLog } from '@/repositories/auditLog.repository'

export async function PATCH(req, { params }) {
  // 1. Verify token
  const admin = getAdmin(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Verify permission
  if (!hasPermission(admin, 'UPDATE_INQUIRY_STATUS')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // 3. Perform data operation
  const data = await req.json()
  const updatedDoc = await updateSomething(params.id, data)

  // 4. Log the action
  await createLog({
    action: 'item_updated',
    performedBy: admin,
    targetId: params.id,
    targetType: 'Item',
    details: { changes: data }
  })

  return NextResponse.json({ success: true, data: updatedDoc })
}
```

---

## 19. Known Limitations & Future Improvements

- **Asset Storage:** Image uploads are managed by saving static URL strings pointing to static public assets or external CDN links. Integrating a cloud storage provider (like Cloudinary or AWS S3) would enable drag-and-drop file uploads directly in the CMS.
- **Two-Factor Authentication (2FA):** Admin logins rely on email/password credentials. Adding OTP verification via SMS or email would improve security for administrative access.
- **Real-Time Pipeline Updates:** The CRM Kanban board and logs views use fetch requests on mount and manual refreshes to sync data. Adding WebSockets or Server-Sent Events (SSE) would enable real-time updates for managers and sales teams.
- **JWT Expired Revocation:** The system uses stateless JWT tokens. If a token is compromised, it remains valid until it expires. Using Redis to maintain a token blacklist would allow immediate revocation upon logout.
- **Rate Limiting:** Public endpoints (`/api/contact`, `/api/newsletter`) do not have rate limiting. Adding a rate-limiter package (like `upstash/ratelimit` or custom Redis sliding window) would help prevent spam submissions.

---

## 20. Changelog

## [2.1.1] — Environment Setup and Path Context Updates
### Added
- Created a standard `.env.example` file template with local/production environment parameters.
- Updated file and directory structure documentation to accurately reflect Next.js 16 flat configs (`eslint.config.mjs`, `next.config.mjs`, `postcss.config.mjs`, `jsconfig.json`).
- Documented `x-pathname` middleware header injection and root layout conditional routing mechanism for administrative panel access.

## [2.1.0] — Editorial Redesign & Corporate Asset Update
### Added
- Complete editorial redesign of **About**, **Products**, **Gallery**, and **Blog** pages in line with a premium "Pinterest meets Apple" visual aesthetic (warm cream backgrounds, asymmetric grids, clean borders, minimal type hierarchy).
- Integrated new supply-chain and component partner logos (Shiv Shakti, Torin Drive, Montanari, Monarch, Wittur, Fermator, Usha Martin, Arkel, GMV India) dynamically centered inside a flex-wrap container on the About page and animated infinitely inside the Home Page Partners Marquee.
- Added corporate office building render asset (`fg-building.jpg`) and updated narrative details of the company's founding date to 1993, representing 30+ years of vertical mobility experience.
- Installed high-resolution luxury home elevator background image (`hero-bg.jpg`) for the main home hero and products header statement.
- Ported and redesigned the interactive **Industries** sector showcase (`Industries.jsx`) on the Home Page, featuring custom elevator transit deck animations on hover over wireframe silhouettes.
- Ported the cinematic **IntroAnimation** video scrubbing preloader panel, utilizing dynamic frames tracking and automated `sessionStorage` session guards.

### Fixed
- Fixed GSAP ScrollTrigger hot-reload layout crash (`NotFoundError: The object can not be found here`) by wrapping horizontal scroll pinning sequences in `gsap.context()` blocks and invoking `ctx.revert()` in component unmount cleanups.
- Resolved React invalid child object console error (`Objects are not valid as a React child`) in the Blog modules by parsing nested author database schemas safely.
- Resolved horizontal scroll layout stutters and gaps on Home and About pages by implementing `isMounted` execution guards to prevent double-initialization of ScrollTriggers under React strict mode and refactoring DOM translations into native GSAP tween configurations with `anticipatePin: 1`.

## [2.0.0] — Phase 4 Complete
### Added
- Secure Admin Console at `/admin`.
- Role-Based Access Control (RBAC) supporting 5 distinct roles and permissions.
- Leads pipeline featuring Kanban board views and search tables.
- Lead assignment functionality with automatic email notifications.
- Immutable system audit logs to track admin changes.
- Administrator account control interface.
- HTML Email Template Customizer with live iframe preview.
- Newsletter subscriber management with CSV export.
- Asynchronous background email queue worker (polls every 15 seconds).
- Development mode email fallback that writes HTML to `/scratch/emails/`.

## [1.5.0] — Phase 3 Complete
### Added
- WebGL interactive Lift360Viewer component powered by Three.js.
- Swatch-based cabin configurator supporting dynamic asset loading.
- Cabin entry animation with React Strict Mode double-mount guard.
- Markdown-based editorial blog system (listings, filter categories, tags).
- Auto-calculated reading time estimate on article save.
- Newsletter subscription system with `/api/newsletter` endpoints.
- NewsletterStrip component featured above the page footer.

## [1.0.0] — Phase 2 Complete
### Added
- Corporate `/about` page featuring timeline, values, and leadership profiles.
- Tab-categorized `/products` list with filter selectors.
- Product details page featuring spec sheets, brochures, and related items.
- Masonry-based portfolio `/gallery` page with details carousel modal.
- Mongoose schemas and data repository files mapping.

## [0.1.0] — Phase 1 Complete
### Added
- Home page featuring responsive GSAP horizontal scrolling showcases.
- Global navigation header and footer layout.
- Lenis smooth scroll and Framer Motion presets.
- CSS layout variables and Tailwind theme configurations.
- MongoDB connection pool helper.
- Inquiry schema and client-facing inquiry endpoints.
