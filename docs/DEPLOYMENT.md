# Deployment Guide — FG Lift Pvt. Ltd.

## Prerequisites
- Node.js 18.x or 20.x
- MongoDB Instance (MongoDB Atlas or self-hosted)

## Environment Variables (`.env.local`)
- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for admin session tokens.
- `NEXT_PUBLIC_SITE_URL`: Primary domain URL for SEO & canonical links.

## Build Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Create production build
npm run build

# Start production server
npm run start
```
