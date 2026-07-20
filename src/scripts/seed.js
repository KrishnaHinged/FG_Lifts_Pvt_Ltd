const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fglifts';

// Define Schemas locally to avoid Next.js ESM/CJS interop compiler issues
const AdminSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true, unique: true, lowercase: true },
  password:    { type: String, required: true },
  role:        { type: String, default: 'SUPER_ADMIN' },
  isActive:    { type: Boolean, default: true },
  permissions: [String],
  lastLoginAt: Date
}, { timestamps: true });

const EmailTemplateSchema = new mongoose.Schema({
  name:      { type: String, required: true, unique: true },
  subject:   { type: String, required: true },
  body:      { type: String, required: true },
  variables: [String],
  isActive:  { type: Boolean, default: true }
}, { timestamps: true });

const SpecSchema = new mongoose.Schema({
  key:   String,
  value: String
}, { _id: false });

const ImageSchema = new mongoose.Schema({
  url:   String,
  alt:   String
}, { _id: false });

const ColorVariantSchema = new mongoose.Schema({
  name:  String,
  hex:   String,
  panoramaImages: {
    front:   String,
    back:    String,
    left:    String,
    right:   String,
    ceiling: String,
    floor:   String,
  },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const FinishVariantSchema = new mongoose.Schema({
  name:     String,
  isActive: { type: Boolean, default: true }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  slug:           { type: String, required: true, unique: true },
  name:           { type: String, required: true },
  tagline:        String,
  category:       { type: String, required: true },
  subCategory:    String,
  tabGroup:       { type: String, default: 'Systems' },
  description:    String,
  specifications: [SpecSchema],
  features:       [String],
  applications:   [String],
  images:         [ImageSchema],
  brochureUrl:    String,
  has360View:     { type: Boolean, default: false },
  defaultColor:   String,
  defaultFinish:  String,
  colorVariants:  [ColorVariantSchema],
  finishVariants: [FinishVariantSchema],
  isFeatured:     { type: Boolean, default: false },
  badge:          String,
  isActive:       { type: Boolean, default: true },
  sortOrder:      { type: Number, default: 0 }
}, { timestamps: true });

const GalleryProjectSchema = new mongoose.Schema({
  title:               { type: String, required: true },
  location:            String,
  clientType:          String,
  category:            String,
  year:                Number,
  description:         String,
  coverImage:          { type: String, required: true },
  images:              [String],
  relatedProductSlugs: [String],
  isActive:            { type: Boolean, default: true },
  sortOrder:           { type: Number, default: 0 }
}, { timestamps: true });

const BlogPostSchema = new mongoose.Schema({
  slug:          { type: String, required: true, unique: true },
  title:         { type: String, required: true },
  excerpt:       String,
  coverImage:    String,
  coverImageAlt: String,
  content:       String,
  category:      String,
  tags:          [String],
  author: {
    name:   String,
    avatar: String,
    title:  String,
  },
  readTime:      Number,
  isPublished:   { type: Boolean, default: false },
  isFeatured:    { type: Boolean, default: false },
  publishedAt:   Date,
  views:         { type: Number, default: 0 },
  relatedSlugs:  [String]
}, { timestamps: true });

// Models lookup or compile
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
const EmailTemplate = mongoose.models.EmailTemplate || mongoose.model('EmailTemplate', EmailTemplateSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const GalleryProject = mongoose.models.GalleryProject || mongoose.model('GalleryProject', GalleryProjectSchema);
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

const mockProducts = [
  {
    slug: 'aerolux-premium-capsule',
    name: 'AeroLux Premium Capsule Lift',
    tagline: 'Panoramic vision meets state-of-the-art vertical mobility.',
    category: 'Capsule',
    subCategory: 'Observation Lifts',
    tabGroup: 'Systems',
    description: 'Designed for high-end retail venues, luxury hotels, and modern corporate headquarters. The AeroLux series features curved structural glass panels, offering passengers an unobstructed 180-degree panoramic view as they travel between floors.',
    specifications: [
      { key: 'Capacity', value: '800 kg - 1600 kg (10 - 20 Persons)' },
      { key: 'Speed', value: '1.0 m/s - 2.5 m/s' },
      { key: 'Drive Type', value: 'VVVF Gearless PMSM' },
      { key: 'Max Floors', value: '40 Floors' }
    ],
    features: [
      '180-degree curved laminated safety glass panels',
      'Whisper-quiet gearless PMSM machine',
      'LED floor indicators and interactive cabin display panels',
      'Emergency rescue device (ARD) built-in'
    ],
    applications: ['Commercial', 'Luxury', 'Hospitality'],
    images: [{ url: '/images/projects-collage.png', alt: 'AeroLux Premium Capsule Lift' }],
    has360View: true,
    defaultColor: 'Champagne Gold',
    defaultFinish: 'Mirror',
    colorVariants: [
      {
        name: 'Champagne Gold',
        hex: '#C9A84C',
        panoramaImages: {
          front: '/images/cabin_gold_panorama.png',
          back: '/images/cabin_gold_panorama.png',
          left: '/images/cabin_gold_panorama.png',
          right: '/images/cabin_gold_panorama.png',
          ceiling: '/images/cabin_gold_panorama.png',
          floor: '/images/cabin_gold_panorama.png',
        },
        isActive: true
      },
      {
        name: 'Rose Gold',
        hex: '#B76E79',
        panoramaImages: {
          front: '/images/cabin_rose_gold_panorama.png',
          back: '/images/cabin_rose_gold_panorama.png',
          left: '/images/cabin_rose_gold_panorama.png',
          right: '/images/cabin_rose_gold_panorama.png',
          ceiling: '/images/cabin_rose_gold_panorama.png',
          floor: '/images/cabin_rose_gold_panorama.png',
        },
        isActive: true
      },
      {
        name: 'Space Silver',
        hex: '#A6A6A6',
        panoramaImages: {
          front: '/images/cabin_silver_panorama.png',
          back: '/images/cabin_silver_panorama.png',
          left: '/images/cabin_silver_panorama.png',
          right: '/images/cabin_silver_panorama.png',
          ceiling: '/images/cabin_silver_panorama.png',
          floor: '/images/cabin_silver_panorama.png',
        },
        isActive: true
      }
    ],
    finishVariants: [
      { name: 'Mirror Finish', isActive: true },
      { name: 'Hairline Finish', isActive: true }
    ],
    isFeatured: true,
    badge: '360° View',
    sortOrder: 1
  },
  {
    slug: 'quantum-gearless-passenger',
    name: 'Quantum Gearless Passenger Lift',
    tagline: 'High-speed efficiency built for modern skyscrapers.',
    category: 'Passenger',
    subCategory: 'High Rise Lifts',
    tabGroup: 'Systems',
    description: 'The Quantum Passenger Lift is the choice for modern, high-traffic commercial and residential skyscrapers. Engineered with regenerative drive technology, it reduces energy usage by returning power back into the grid.',
    specifications: [
      { key: 'Capacity', value: '680 kg - 1350 kg (9 - 18 Persons)' },
      { key: 'Speed', value: '1.5 m/s - 4.0 m/s' },
      { key: 'Drive Type', value: 'Gearless Regenerative Drive' },
      { key: 'Max Floors', value: '60 Floors' }
    ],
    features: [
      'Advanced destination dispatch control compatibility',
      'Up to 35% energy reduction with regenerative drives',
      'Seismic safety sensor systems',
      'Dynamic cabin ventilation controls'
    ],
    applications: ['Commercial', 'Residential'],
    images: [{ url: '/images/services-collage.png', alt: 'Quantum Gearless Passenger Lift' }],
    has360View: false,
    isFeatured: false,
    badge: 'NEW',
    sortOrder: 2
  },
  {
    slug: 'titan-industrial-goods',
    name: 'Titan Heavy Industrial Goods Lift',
    tagline: 'Heavy-duty cargo transportation with absolute reliability.',
    category: 'Goods',
    subCategory: 'Freight Lifts',
    tabGroup: 'Systems',
    description: 'Designed to handle the most demanding warehouse, factory, and logistics center jobs. The Titan Freight lift is built with heavy gauge steel framing and reinforced doors to withstand impact from forklifts and manual loaders.',
    specifications: [
      { key: 'Capacity', value: '2000 kg - 5000 kg' },
      { key: 'Speed', value: '0.5 m/s - 1.0 m/s' },
      { key: 'Drive Type', value: 'Heavy Duty Hydraulic / Geared Traction' },
      { key: 'Max Floors', value: '15 Floors' }
    ],
    features: [
      'Forklift-safe reinforced steel floor plating',
      'Heavy-duty vertical bi-parting manual or auto doors',
      'Sub-level mechanical safety locking hooks',
      'Overload indicator alarms and visual warning lights'
    ],
    applications: ['Industrial'],
    images: [{ url: '/images/services-collage.png', alt: 'Titan Heavy Industrial Goods Lift' }],
    has360View: false,
    isFeatured: false,
    badge: 'Bestseller',
    sortOrder: 3
  },
  {
    slug: 'aurum-luxury-villa-lift',
    name: 'Aurum Luxury Villa Lift',
    tagline: 'Ultimate luxury tailored to elite residential footprints.',
    category: 'Home',
    subCategory: 'Home Lifts',
    tabGroup: 'Systems',
    description: 'Engineered specifically for luxury bungalows, duplexes, and private villas. The Aurum requires minimal headroom and no deep pit structure, letting it integrate seamlessly into existing luxury homes without structural restructuring.',
    specifications: [
      { key: 'Capacity', value: '300 kg - 450 kg (4 - 6 Persons)' },
      { key: 'Speed', value: '0.3 m/s - 0.5 m/s' },
      { key: 'Drive Type', value: 'Quiet Hydraulic / Belt Traction' },
      { key: 'Max Floors', value: '5 Floors' }
    ],
    features: [
      'No deep pit required (only 150mm pit or access ramp)',
      'Custom luxury cabin panel options (fine wood veneers, leather, glass)',
      'Low power draw (runs on single-phase domestic power)',
      'Emergency cabin light and telephone systems'
    ],
    applications: ['Residential', 'Luxury'],
    images: [{ url: '/images/services-collage.png', alt: 'Aurum Luxury Villa Lift' }],
    has360View: true,
    defaultColor: 'Champagne Gold',
    defaultFinish: 'Mirror',
    colorVariants: [
      {
        name: 'Champagne Gold',
        hex: '#C9A84C',
        panoramaImages: {
          front: '/images/cabin_gold_panorama.png',
          back: '/images/cabin_gold_panorama.png',
          left: '/images/cabin_gold_panorama.png',
          right: '/images/cabin_gold_panorama.png',
          ceiling: '/images/cabin_gold_panorama.png',
          floor: '/images/cabin_gold_panorama.png',
        },
        isActive: true
      },
      {
        name: 'Rose Gold',
        hex: '#B76E79',
        panoramaImages: {
          front: '/images/cabin_rose_gold_panorama.png',
          back: '/images/cabin_rose_gold_panorama.png',
          left: '/images/cabin_rose_gold_panorama.png',
          right: '/images/cabin_rose_gold_panorama.png',
          ceiling: '/images/cabin_rose_gold_panorama.png',
          floor: '/images/cabin_rose_gold_panorama.png',
        },
        isActive: true
      }
    ],
    finishVariants: [
      { name: 'Mirror Finish', isActive: true },
      { name: 'Satin Finish', isActive: true }
    ],
    isFeatured: false,
    badge: '360° View',
    sortOrder: 4
  },
  {
    slug: 'lifeline-hospital-lift',
    name: 'LifeLine Hospital Stretcher Lift',
    tagline: 'Extra wide, stable, and highly responsive patient transport.',
    category: 'Hospital',
    subCategory: 'Healthcare Lifts',
    tabGroup: 'Systems',
    description: 'Designed to meet medical standards. The LifeLine Stretcher lift features smooth speed control to prevent sudden jolts, accurate floor leveling for easy wheel/stretcher access, and a durable cabin layout.',
    specifications: [
      { key: 'Capacity', value: '1600 kg - 2000 kg' },
      { key: 'Speed', value: '1.0 m/s - 1.75 m/s' },
      { key: 'Drive Type', value: 'Smooth Gearless Traction' },
      { key: 'Max Floors', value: '30 Floors' }
    ],
    features: [
      'Extended depth cabin to fit critical stretchers and lifesupport machines',
      'Priority emergency call override controls',
      'Antibacterial copper handrails and stainless steel panels',
      'Accurate auto-leveling within ±2mm tolerance'
    ],
    applications: ['Hospital'],
    images: [{ url: '/images/services-collage.png', alt: 'LifeLine Hospital Stretcher Lift' }],
    has360View: false,
    isFeatured: false,
    badge: '',
    sortOrder: 5
  },
  {
    slug: 'monarch-leather-wood-cabin',
    name: 'Monarch Luxury Cabin Enclosure',
    tagline: 'Etched brass, custom leathers, and walnut veneers.',
    category: 'Premium',
    subCategory: 'Elevator Cabins',
    tabGroup: 'Cabins',
    description: 'Our top-tier Monarch cabin finish features side panels wrapped in hand-selected Italian leather, structural walnut wood panels, and antique-etched gold brass metal highlights. Includes custom design downlighting.',
    specifications: [
      { key: 'Compatibility', value: 'All Systems (Passenger & Capsule)' },
      { key: 'Base Metal', value: 'Marine Grade Stainless Steel' },
      { key: 'Handrail', value: 'Etched Walnut Wood' }
    ],
    features: [
      'Soundproof cabin structural padding panels',
      'Handcrafted leather wall accents with diamond stitching',
      'Concealed warm white architectural LED lighting',
      'Choice of premium marble floor inlay designs'
    ],
    applications: ['Luxury', 'Hospitality', 'Residential'],
    images: [{ url: '/images/projects-collage.png', alt: 'Monarch Luxury Cabin Enclosure' }],
    has360View: true,
    isFeatured: false,
    badge: '360° View',
    sortOrder: 6
  },
  {
    slug: 'minimalist-mirror-stainless-cabin',
    name: 'Vanguard Minimalist Cabin Enclosure',
    tagline: 'Sleek brushed stainless steel, mirror highlights, and line aesthetics.',
    category: 'Standard',
    subCategory: 'Elevator Cabins',
    tabGroup: 'Cabins',
    description: 'Designed for contemporary office parks and modern corporate setups. The Vanguard features vertical brushed stainless panels paired with mirrored rear sheets, offering an open feel and low upkeep.',
    specifications: [
      { key: 'Compatibility', value: 'All Systems (Passenger & Cargo)' },
      { key: 'Base Metal', value: 'SUS304 Stainless Steel' },
      { key: 'Floor Type', value: 'High Duty Rubber Flooring or Custom Granite' }
    ],
    features: [
      'High-impact brushed metal side trims',
      'Vertical hairline finishes that hide fingerprint smears',
      'Vandal-resistant recessed display and button fixtures',
      'Energy efficient auto-off fan and light settings'
    ],
    applications: ['Commercial', 'Residential'],
    images: [{ url: '/images/services-collage.png', alt: 'Vanguard Minimalist Cabin Enclosure' }],
    has360View: false,
    isFeatured: false,
    badge: '',
    sortOrder: 7
  },
  {
    slug: 'quantum-v3-control-panel',
    name: 'Quantum V3 Microprocessor Controller',
    tagline: 'Intel-driven vertical traffic management.',
    category: 'Control Panels',
    subCategory: 'System Controllers',
    tabGroup: 'Components',
    description: 'The digital brain of your vertical transportation system. Featuring intelligent dispatching systems, remote monitoring capabilities, and a full self-test system that reports faults instantly.',
    specifications: [
      { key: 'Processor', value: 'Dual-core 32-bit Microcontroller' },
      { key: 'Elevator Grouping', value: 'Controls up to 8 lifts in a group' },
      { key: 'Input Power', value: 'Three-Phase 415V / Single-Phase 230V' }
    ],
    features: [
      'Self-diagnosing algorithm system for simple elevator repair',
      'Internet-of-Things (IoT) remote diagnostic output interface',
      'Integrated auto rescue device (ARD) control board',
      'Energy efficient standby system setting'
    ],
    applications: ['Commercial', 'Residential', 'Industrial'],
    images: [{ url: '/images/services-collage.png', alt: 'Quantum V3 Microprocessor Controller' }],
    has360View: false,
    isFeatured: false,
    badge: 'NEW',
    sortOrder: 8
  }
];

const mockProjects = [
  {
    title: 'Grand Hyatt Executive Tower',
    location: 'Mumbai, Maharashtra',
    clientType: 'Hospitality',
    category: 'Hospitality',
    year: 2024,
    description: 'Installed a custom group of four high-speed glass observation capsule lifts, operating at 2.5 m/s. The luxury cabins feature gold-etched brass wall panels and custom ceiling structures matching the main hotel lobby layout.',
    coverImage: '/images/projects-collage.png',
    images: [
      '/images/projects-collage.png',
      '/images/services-collage.png'
    ],
    relatedProductSlugs: ['aerolux-premium-capsule', 'monarch-leather-wood-cabin'],
    sortOrder: 1
  },
  {
    title: 'Imperial Residency Towers',
    location: 'Surat, Gujarat',
    clientType: 'Residential',
    category: 'Residential',
    year: 2025,
    description: 'Completed full installation of twelve gearless passenger elevators across three residential tower buildings. Each elevator is equipped with intelligent dispatching controls, reducing resident wait times by up to 25% during peak morning hours.',
    coverImage: '/images/services-collage.png',
    images: [
      '/images/services-collage.png',
      '/images/projects-collage.png'
    ],
    relatedProductSlugs: ['quantum-gearless-passenger'],
    sortOrder: 2
  },
  {
    title: 'Adani Tech Logistics Park',
    location: 'Mundra, Gujarat',
    clientType: 'Industrial',
    category: 'Industrial',
    year: 2023,
    description: 'Engineered and installed four high-capacity Titan goods lifts rated for 5,000 kg. Features custom vertical bi-parting doors, sub-level mechanical locking hooks, and robust structural steel side walls to withstand heavy forklift traffic.',
    coverImage: '/images/services-collage.png',
    images: [
      '/images/services-collage.png'
    ],
    relatedProductSlugs: ['titan-industrial-goods'],
    sortOrder: 3
  }
];

const mockBlogPosts = [
  {
    slug: 'choosing-right-elevator-residential-building',
    title: 'How to Choose the Right Elevator for Your Residential Building',
    excerpt: 'A comprehensive guide covering capacity planning, drive types, cabin sizing, and budgeting considerations for residential elevator installations.',
    coverImage: '/images/services-collage.png',
    coverImageAlt: 'Residential elevator installation guide',
    content: `<h2>Understanding Your Building Requirements</h2><p>Choosing the right elevator for a residential building is one of the most impactful decisions a builder or architect can make...</p>`,
    category: 'Technical Guide',
    tags: ['residential', 'guide', 'selection', 'safety'],
    author: { name: 'FG Lift Editorial Team', title: 'Engineering Division' },
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2025-06-15'),
    relatedSlugs: ['elevator-maintenance-best-practices', 'luxury-cabin-design-trends-2025'],
  }
];

const defaultTemplates = [
  {
    name: 'inquiry_received',
    subject: 'Inquiry Received - Reference #{{referenceId}}',
    body: `
      <div style="font-family: sans-serif; padding: 24px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px;">
        <h2 style="color: #0E4FB3;">FG Lift Pvt. Ltd.</h2>
        <p>Dear {{name}},</p>
        <p>Thank you for reaching out to us. We have successfully received your product inquiry for <strong>{{product}}</strong>.</p>
        <p>One of our elevator solutions executives will review your requirements and get in touch with you shortly.</p>
        <p style="margin-top: 30px; font-size: 12px; color: #7A7A7A;">Reference ID: {{referenceId}}</p>
      </div>
    `,
    variables: ['{{name}}', '{{product}}', '{{referenceId}}']
  },
  {
    name: 'lead_assigned',
    subject: 'Lead Assigned: {{clientName}}',
    body: `
      <div style="font-family: sans-serif; padding: 24px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px;">
        <h2 style="color: #0E4FB3;">CRM Notification</h2>
        <p>Hello {{executiveName}},</p>
        <p>You have been assigned a new lead from <strong>{{clientName}}</strong> by <strong>{{assignedBy}}</strong>.</p>
        <p>Please log in to the admin panel to view the inquiry details and reach out to the customer.</p>
        <a href="http://localhost:3000/admin/inquiries" style="display: inline-block; background-color: #0E4FB3; color: #FFFFFF; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 20px; font-weight: bold;">View CRM Pipeline</a>
      </div>
    `,
    variables: ['{{executiveName}}', '{{clientName}}', '{{assignedBy}}']
  },
  {
    name: 'newsletter_welcome',
    subject: 'Welcome to FG Lift Insights!',
    body: `
      <div style="font-family: sans-serif; padding: 24px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px;">
        <h2 style="color: #0E4FB3;">FG Lift Insights</h2>
        <p>Hello {{name}},</p>
        <p>Thank you for subscribing to our newsletter! You will now receive industry insights, engineering guides, and product updates from the FG Lift engineering team.</p>
      </div>
    `,
    variables: ['{{name}}']
  }
];

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // 1. Seed default Super Admin if not exists
    const existingAdmin = await Admin.findOne({ email: 'admin@fglifts.com' });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('FGLift@Admin2025!', salt);
      await Admin.create({
        name: 'Super Admin',
        email: 'admin@fglifts.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        isActive: true
      });
      console.log('Seeded default Super Admin account: admin@fglifts.com');
    } else {
      if (existingAdmin.role !== 'SUPER_ADMIN') {
        existingAdmin.role = 'SUPER_ADMIN';
        await existingAdmin.save();
        console.log('Upgraded existing admin@fglifts.com to SUPER_ADMIN.');
      } else {
        console.log('Default Super Admin already exists. Skipping...');
      }
    }

    // Upgrade/create admin@fglift.com too for backward compatibility
    const oldAdmin = await Admin.findOne({ email: 'admin@fglift.com' });
    if (!oldAdmin) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('adminpassword', salt);
      await Admin.create({
        name: 'Super Admin',
        email: 'admin@fglift.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        isActive: true
      });
      console.log('Seeded backup Super Admin account: admin@fglift.com');
    }

    // 2. Seed email templates
    for (const temp of defaultTemplates) {
      const existingTemp = await EmailTemplate.findOne({ name: temp.name });
      if (!existingTemp) {
        await EmailTemplate.create(temp);
        console.log(`Seeded email template: ${temp.name}`);
      } else {
        console.log(`Email template ${temp.name} already exists. Skipping...`);
      }
    }

    // 3. Clear and seed Products, Projects, Blog Posts
    console.log('Wiping mock products, projects, and posts...');
    await Product.deleteMany({});
    await GalleryProject.deleteMany({});
    await BlogPost.deleteMany({});

    console.log('Seeding mock products...');
    await Product.insertMany(mockProducts);

    console.log('Seeding mock projects...');
    await GalleryProject.insertMany(mockProjects);

    console.log('Seeding mock blog posts...');
    for (const postData of mockBlogPosts) {
      const post = new BlogPost(postData);
      // Auto compute read time before save
      if (post.content) {
        const wordCount = post.content.replace(/<[^>]+>/g, '').split(/\s+/).length;
        post.readTime = Math.max(1, Math.ceil(wordCount / 200));
      }
      await post.save();
    }

    console.log('Database seeding successfully finished!');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
