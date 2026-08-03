import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import GalleryProject from '@/models/GalleryProject'
import Admin from '@/models/Admin'
import { hashPassword } from '@/lib/auth'
import EmailTemplate from '@/models/EmailTemplate'
import Testimonial from '@/models/Testimonial'

const mockProducts = [
  // SYSTEMS
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
      { name: 'Champagne Gold', hex: '#C9A84C', isActive: true },
      { name: 'Rose Gold', hex: '#B76E79', isActive: true },
      { name: 'Space Silver', hex: '#A6A6A6', isActive: true }
    ],
    finishVariants: [
      { name: 'Mirror Finish', description: 'Highly reflective mirror-like polished stainless steel surface', isActive: true },
      { name: 'Hairline Finish', description: 'Elegant brushed texture finish with fine linear scratch patterns', isActive: true }
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
      { name: 'Champagne Gold', hex: '#C9A84C', isActive: true },
      { name: 'Rose Gold', hex: '#B76E79', isActive: true }
    ],
    finishVariants: [
      { name: 'Mirror Finish', description: 'Highly reflective mirror-like polished stainless steel surface', isActive: true },
      { name: 'Satin Finish', description: 'Soft matte non-reflective texture providing an industrial premium feel', isActive: true }
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

  // CABINS
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

  // COMPONENTS
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
]

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
  },
  {
    title: 'Fortis Healthcare Complex',
    location: 'Bangalore, Karnataka',
    clientType: 'Hospital',
    category: 'Hospitality', // Category matching page category options
    year: 2024,
    description: 'Commissioned three extra-wide stretcher lifts with emergency call override controls and antibacterial interior touch points. Safe, accurate leveling within ±2mm facilitates easy bed transport.',
    coverImage: '/images/projects-collage.png',
    images: [
      '/images/projects-collage.png',
      '/images/services-collage.png'
    ],
    relatedProductSlugs: ['lifeline-hospital-lift'],
    sortOrder: 4
  },
  {
    title: 'Prestige Boulevard Duplexes',
    location: 'Bangalore, Karnataka',
    clientType: 'Luxury',
    category: 'Luxury',
    year: 2025,
    description: 'Designed and installed ten space-saving residential elevators inside luxury private villa structures. Utilized hydraulic drive technology to run on standard single-phase domestic electrical outlets.',
    coverImage: '/images/services-collage.png',
    images: [
      '/images/services-collage.png',
      '/images/projects-collage.png'
    ],
    relatedProductSlugs: ['aurum-luxury-villa-lift'],
    sortOrder: 5
  },
  {
    title: 'Surat Diamond Bourse Area',
    location: 'Surat, Gujarat',
    clientType: 'Commercial',
    category: 'Commercial',
    year: 2024,
    description: 'Delivered customized, high-capacity commercial cargo and passenger lift systems. Equipped with destination control dispatch monitors and fire control systems.',
    coverImage: '/images/projects-collage.png',
    images: [
      '/images/projects-collage.png'
    ],
    relatedProductSlugs: ['quantum-gearless-passenger', 'quantum-v3-control-panel'],
    sortOrder: 6
  },
  {
    title: 'Siddharth Luxury Bungalows',
    location: 'Pune, Maharashtra',
    clientType: 'Residential',
    category: 'Residential',
    year: 2023,
    description: 'Custom home lifts installed inside multi-storey private bungalows, incorporating glass cab walls and walnut side wood finishes.',
    coverImage: '/images/services-collage.png',
    images: [
      '/images/services-collage.png'
    ],
    relatedProductSlugs: ['aurum-luxury-villa-lift', 'monarch-leather-wood-cabin'],
    sortOrder: 7
  },
  {
    title: 'Zydus Corporate HQ',
    location: 'Ahmedabad, Gujarat',
    clientType: 'Commercial',
    category: 'Commercial',
    year: 2024,
    description: 'A flagship corporate office installation comprising high-performance, double-deck structural steel passenger lifts and a glass capsule lift in the atrium area.',
    coverImage: '/images/projects-collage.png',
    images: [
      '/images/projects-collage.png',
      '/images/services-collage.png'
    ],
    relatedProductSlugs: ['aerolux-premium-capsule', 'quantum-gearless-passenger'],
    sortOrder: 8
  }
]

const defaultTemplates = [
  {
    name: 'inquiry_received',
    subject: 'Inquiry Received - Reference #{{referenceId}}',
    body: `
      <div style="font-family: sans-serif; padding: 24px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px;">
        <h2 style="color: #0E4FB3;">FG Lifts Pvt. Ltd.</h2>
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
  }
]

const mockTestimonials = [
  {
    quote: '"Whisper-quiet operations and clean architectural integration. The villa lift they installed is simply exceptional."',
    name: 'Rajesh Patel',
    title: 'Homeowner, Ahmedabad',
    bgColor: 'bg-[#1A1A1A] text-white',
    sortOrder: 1
  },
  {
    quote: '"The customized gold-finish glass capsule lift is the design centerpiece of our luxury retail experience center."',
    name: 'Ananya Sharma',
    title: 'VP Projects, Greenfield Group',
    bgColor: 'bg-[#0E4FB3] text-white',
    sortOrder: 2
  },
  {
    quote: '"FG Lifts has been our trusted partner for commercial high-rises. Exceptional performance under peak loads."',
    name: 'Vikram Shah',
    title: 'Director, Shah Towers',
    bgColor: 'bg-[#1A1A1A] text-white',
    sortOrder: 3
  },
  {
    quote: '"From structural consulting to commissioning, they solved our vertical shaft space constraints with complete ease."',
    name: 'Amit Desai',
    title: 'Principal Architect, Studio AD',
    bgColor: 'bg-[#0797CE] text-black',
    sortOrder: 4
  }
]

export async function GET(req) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url || 'http://localhost/api/seed')
    const isReset = searchParams.get('reset') === 'true' || process.env.RESET_DB === 'true'

    // 1. Seed Products if missing (preserving existing user data)
    let seededProductsCount = 0
    let skippedProductsCount = 0
    for (const prodData of mockProducts) {
      const exists = await Product.findOne({ slug: prodData.slug })
      if (!exists) {
        await Product.create(prodData)
        seededProductsCount++
      } else if (isReset) {
        Object.assign(exists, prodData)
        await exists.save()
        seededProductsCount++
      } else {
        skippedProductsCount++
      }
    }

    // 2. Seed Projects if missing
    let seededProjectsCount = 0
    let skippedProjectsCount = 0
    for (const projData of mockProjects) {
      const exists = await GalleryProject.findOne({ title: projData.title })
      if (!exists) {
        await GalleryProject.create(projData)
        seededProjectsCount++
      } else if (isReset) {
        Object.assign(exists, projData)
        await exists.save()
        seededProjectsCount++
      } else {
        skippedProjectsCount++
      }
    }

    // 3. Seed Email Templates if missing
    let seededTemplatesCount = 0
    let skippedTemplatesCount = 0
    for (const temp of defaultTemplates) {
      const exists = await EmailTemplate.findOne({ name: temp.name })
      if (!exists) {
        await EmailTemplate.create(temp)
        seededTemplatesCount++
      } else if (isReset) {
        Object.assign(exists, temp)
        await exists.save()
        seededTemplatesCount++
      } else {
        skippedTemplatesCount++
      }
    }

    // 4. Seed Testimonials if missing
    let seededTestimonialsCount = 0
    let skippedTestimonialsCount = 0
    for (const testData of mockTestimonials) {
      const exists = await Testimonial.findOne({ name: testData.name, quote: testData.quote })
      if (!exists) {
        await Testimonial.create(testData)
        seededTestimonialsCount++
      } else if (isReset) {
        Object.assign(exists, testData)
        await exists.save()
        seededTestimonialsCount++
      } else {
        skippedTestimonialsCount++
      }
    }

    // 5. Seed default Super Admins if missing
    const adminsToSeed = [
      {
        name: 'Super Admin',
        email: 'admin@fglifts.com',
        password: 'FGLift@Admin2025!',
        role: 'SUPER_ADMIN',
        isActive: true
      },
      {
        name: 'Super Admin',
        email: 'admin@fglift.com',
        password: 'adminpassword',
        role: 'SUPER_ADMIN',
        isActive: true
      }
    ]

    const seededAdmins = []
    for (const adm of adminsToSeed) {
      const existingAdmin = await Admin.findOne({ email: adm.email })
      if (!existingAdmin) {
        const hashedPassword = await hashPassword(adm.password)
        await Admin.create({
          ...adm,
          password: hashedPassword
        })
        seededAdmins.push(adm.email)
      } else {
        if (!existingAdmin.isActive || existingAdmin.role !== 'SUPER_ADMIN') {
          existingAdmin.isActive = true
          existingAdmin.role = 'SUPER_ADMIN'
          await existingAdmin.save()
        }
      }
    }

    return NextResponse.json({
      success: true,
      mode: isReset ? 'RESET' : 'NON_DESTRUCTIVE',
      message: isReset ? 'Default records reset.' : 'Database seeded safely. All user content preserved.',
      summary: {
        products: { insertedOrUpdated: seededProductsCount, skipped: skippedProductsCount },
        projects: { insertedOrUpdated: seededProjectsCount, skipped: skippedProjectsCount },
        templates: { insertedOrUpdated: seededTemplatesCount, skipped: skippedTemplatesCount },
        testimonials: { insertedOrUpdated: seededTestimonialsCount, skipped: skippedTestimonialsCount },
        adminsSeeded: seededAdmins.length > 0 ? seededAdmins : 'All default admins exist'
      }
    })
  } catch (err) {
    console.error('Seed API error:', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}
