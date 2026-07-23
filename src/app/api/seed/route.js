import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import GalleryProject from '@/models/GalleryProject'
import BlogPost from '@/models/BlogPost'
import Admin from '@/models/Admin'
import { hashPassword } from '@/lib/auth'
import EmailTemplate from '@/models/EmailTemplate'

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
      { name: 'Champagne Gold', hex: '#C9A84C', isActive: true },
      { name: 'Rose Gold', hex: '#B76E79', isActive: true }
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

const mockBlogPosts = [
  {
    slug: 'choosing-right-elevator-residential-building',
    title: 'How to Choose the Right Elevator for Your Residential Building',
    excerpt: 'A comprehensive guide covering capacity planning, drive types, cabin sizing, and budgeting considerations for residential elevator installations.',
    coverImage: '/images/services-collage.png',
    coverImageAlt: 'Residential elevator installation guide',
    content: `<h2>Understanding Your Building Requirements</h2>
<p>Choosing the right elevator for a residential building is one of the most impactful decisions a builder or architect can make. The elevator affects daily convenience, property value, safety compliance, and long-term maintenance costs.</p>
<p>Before selecting a system, you need to assess several critical parameters: building height (number of floors), expected daily traffic volume, shaft dimensions available, power supply type, and the aesthetic expectations of residents.</p>

<h2>Drive Type Selection</h2>
<p>The two primary drive technologies for residential elevators are <strong>geared traction</strong> and <strong>gearless traction (PMSM)</strong>. For buildings under 10 floors, geared traction offers an excellent balance of cost and performance. For taller structures or premium projects, gearless permanent magnet synchronous motor (PMSM) drives deliver whisper-quiet operation, energy regeneration, and minimal maintenance.</p>
<p>Hydraulic drives remain relevant for low-rise applications (2-5 floors) where shaft space is limited and a machine room-less configuration is preferred.</p>

<h3>Key Specifications to Compare</h3>
<ul>
<li>Speed rating (m/s) — higher speeds reduce wait times in tall buildings</li>
<li>Energy efficiency class — regenerative drives can reduce power consumption by 35%</li>
<li>Noise level (dB) — critical for residential comfort</li>
<li>Maintenance interval frequency</li>
</ul>

<h2>Cabin Design Considerations</h2>
<p>The cabin interior is what residents interact with daily. Standard options include brushed stainless steel panels, but premium projects benefit from custom finishes: back-painted glass, wooden veneers, etched brass accents, and LED ambient lighting systems.</p>

<blockquote>A well-designed elevator cabin transforms a functional necessity into a daily luxury experience for residents.</blockquote>

<h2>Safety Standards & Compliance</h2>
<p>Every residential elevator installation in India must comply with IS 14665 (Safety rules for construction and installation of lifts) and IS 15785 (Specific requirements for passenger and goods lifts). Ensure your manufacturer provides complete IS/ISO certification documentation.</p>

<h3>Essential Safety Features</h3>
<ul>
<li>Automatic Rescue Device (ARD) for power failure scenarios</li>
<li>Progressive safety gear with speed governor</li>
<li>Door interlock systems preventing opening between floors</li>
<li>Emergency communication system (telephone/intercom)</li>
<li>Overload detection and alarm</li>
</ul>

<h2>Budgeting & Total Cost of Ownership</h2>
<p>The purchase price of an elevator represents only 40-50% of its total cost over a 20-year lifecycle. Factor in installation costs, annual maintenance contracts (AMC), electricity consumption, and periodic modernization requirements.</p>
<p>Investing in a higher-quality system upfront typically reduces long-term maintenance costs and extends the equipment lifecycle from 15 years to 25+ years.</p>`,
    category: 'Technical Guide',
    tags: ['residential', 'guide', 'selection', 'safety'],
    author: { name: 'FG Lift Editorial Team', title: 'Engineering Division' },
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2025-06-15'),
    relatedSlugs: ['elevator-maintenance-best-practices', 'luxury-cabin-design-trends-2025'],
  },
  {
    slug: 'elevator-maintenance-best-practices',
    title: 'Elevator Maintenance Best Practices: Extending Equipment Life',
    excerpt: 'Learn the essential maintenance routines, inspection schedules, and proactive strategies that keep elevator systems running safely for decades.',
    coverImage: '/images/projects-collage.png',
    coverImageAlt: 'Elevator maintenance and inspection',
    content: `<h2>The Importance of Preventive Maintenance</h2>
<p>Regular elevator maintenance is not just a regulatory requirement — it is the single most important factor in ensuring passenger safety, minimizing downtime, and extending equipment lifespan. A well-maintained elevator can operate reliably for 25-30 years, while neglected systems often require costly overhauls within 10-12 years.</p>

<h2>Monthly Inspection Checklist</h2>
<ul>
<li>Door operation timing and alignment verification</li>
<li>Brake pad thickness measurement and adjustment</li>
<li>Guide rail lubrication check and replenishment</li>
<li>Safety device functional testing (ARD, overspeed governor)</li>
<li>Electrical connection tightness verification</li>
<li>Cabin lighting and ventilation system check</li>
</ul>

<h2>Quarterly Deep Maintenance</h2>
<p>Every quarter, a thorough inspection should cover the machine room equipment, including motor bearing condition, drive belt tension (for geared systems), and controller board diagnostics. Modern microprocessor controllers can store fault logs — reviewing these logs proactively helps identify developing issues before they cause breakdowns.</p>

<h3>Annual Compliance Testing</h3>
<p>Annual load testing and safety device verification is mandatory under Indian elevator safety standards. This includes full-load and 125% overload testing, speed governor trip verification, and buffer compression testing.</p>

<h2>When to Consider Modernization</h2>
<p>If your elevator system is more than 15 years old and experiencing frequent breakdowns, consider a modernization project rather than continued repair. Modern drive systems, controllers, and door operators can be retrofit into existing shafts, dramatically improving performance, energy efficiency, and passenger experience.</p>`,
    category: 'Maintenance Tips',
    tags: ['maintenance', 'safety', 'inspection', 'best-practices'],
    author: { name: 'FG Lift Editorial Team', title: 'Service Division' },
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2025-05-28'),
    relatedSlugs: ['choosing-right-elevator-residential-building'],
  },
  {
    slug: 'luxury-cabin-design-trends-2025',
    title: 'Luxury Elevator Cabin Design Trends for 2025',
    excerpt: 'Explore the latest premium cabin finishing trends — from hand-stitched leather panels to smart ambient lighting and biophilic design elements.',
    coverImage: '/images/about-factory.png',
    coverImageAlt: 'Luxury elevator cabin interior design',
    content: `<h2>The Rise of Bespoke Cabin Design</h2>
<p>In 2025, elevator cabins are no longer afterthoughts — they are extension pieces of a building's interior design language. Premium developers, luxury hotels, and high-end residential projects now commission custom cabin designs that match lobby aesthetics and brand identity.</p>

<h2>Key Design Trends</h2>
<h3>1. Natural Material Integration</h3>
<p>Walnut veneer panels, Carrara marble flooring, and hammered copper accents are replacing generic stainless steel. The biophilic design movement has brought natural textures into vertical transportation.</p>

<h3>2. Smart Ambient Lighting</h3>
<p>Tunable LED systems that adjust color temperature throughout the day — warm white in the morning, cool white during business hours, and soft amber in the evening. Some systems integrate with building management systems for automated scheduling.</p>

<h3>3. Invisible Technology</h3>
<p>Flush-mounted touch panels replacing mechanical buttons, edge-to-edge mirror walls with hidden displays, and wireless charging pads integrated into handrails. Technology should enhance without intruding.</p>

<blockquote>The best elevator cabin design is one where passengers feel they have stepped into a private lounge, not a metal box.</blockquote>

<h2>Material Spotlight: Etched Stainless Steel</h2>
<p>Chemical etching on stainless steel creates intricate patterns — from geometric Art Deco motifs to flowing organic textures. When combined with PVD coating in champagne gold or rose gold, the result is stunning durability with visual warmth.</p>`,
    category: 'Product Launch',
    tags: ['luxury', 'design', 'cabins', 'trends'],
    author: { name: 'FG Lift Editorial Team', title: 'Design Division' },
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2025-04-10'),
    relatedSlugs: ['choosing-right-elevator-residential-building'],
  },
  {
    slug: 'capsule-elevator-landmark-installation',
    title: 'Project Spotlight: Capsule Elevator Installation at Grand Hyatt Tower',
    excerpt: 'An inside look at the engineering challenges and design solutions behind our flagship panoramic capsule elevator installation in Mumbai.',
    coverImage: '/images/projects-collage.png',
    coverImageAlt: 'Grand Hyatt capsule elevator installation',
    content: `<h2>The Challenge</h2>
<p>When the Grand Hyatt Executive Tower approached FG Lift for their atrium elevator requirement, the brief was clear: four high-speed panoramic capsule elevators that would become the visual centrepiece of the building's 40-storey glass atrium.</p>

<h2>Engineering the Solution</h2>
<p>The primary challenge was structural — mounting curved laminated safety glass panels to elevator frames travelling at 2.5 m/s while maintaining vibration damping within acceptable limits for a luxury hospitality environment.</p>
<p>Our engineering team developed a custom silicone-damped mounting bracket system that isolates the glass panels from the steel frame, reducing transmitted vibrations by 85% compared to rigid mounting approaches.</p>

<h3>Custom Cabin Interiors</h3>
<p>Each cabin features gold-etched brass wall panels on the non-glass sides, custom ceiling structures with integrated downlighting, and marble floor inlays that match the lobby's flooring pattern. The result: passengers experience a seamless transition from the lobby into the elevator.</p>

<h2>Results</h2>
<p>The installation was completed in 14 weeks — 2 weeks ahead of schedule. Guest feedback surveys consistently rate the elevator experience as a highlight of the property, with several architecture publications featuring the atrium design.</p>`,
    category: 'Project Spotlight',
    tags: ['capsule', 'project', 'hospitality', 'installation'],
    author: { name: 'FG Lift Editorial Team', title: 'Projects Division' },
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2025-03-20'),
    relatedSlugs: ['luxury-cabin-design-trends-2025'],
  },
  {
    slug: 'elevator-energy-efficiency-regenerative-drives',
    title: 'How Regenerative Drives Are Cutting Elevator Energy Costs by 35%',
    excerpt: 'Understanding the technology behind regenerative drive systems and how they return power to the building grid during elevator descent.',
    coverImage: '/images/services-collage.png',
    coverImageAlt: 'Regenerative elevator drive technology',
    content: `<h2>The Energy Challenge in Modern Buildings</h2>
<p>Elevators account for 2-10% of a building's total energy consumption, depending on traffic patterns and system efficiency. In a typical 20-storey commercial building operating 6 passenger elevators, annual elevator electricity costs can exceed ₹12 lakhs.</p>

<h2>How Regenerative Drives Work</h2>
<p>A regenerative drive captures the kinetic energy generated when an elevator decelerates or when a heavily loaded car descends. Instead of dissipating this energy as heat through resistor banks (as conventional systems do), regenerative drives convert it back to AC power and feed it into the building's electrical grid.</p>

<h3>When Does Regeneration Occur?</h3>
<ul>
<li>Heavy car descending (passengers going down)</li>
<li>Light car ascending (counterweight heavier than car + passengers)</li>
<li>Deceleration phase of every trip</li>
</ul>

<h2>Real-World Savings</h2>
<p>In our installations across India, we have measured consistent energy savings of 30-38% compared to non-regenerative systems of equivalent capacity and speed. For a group of 4 high-rise passenger elevators, this typically translates to ₹3-4 lakhs in annual electricity savings.</p>

<h2>Return on Investment</h2>
<p>The premium for regenerative drive technology over conventional drives is typically 15-20% of the drive system cost. Given the energy savings, most installations achieve full ROI within 3-4 years — after which the savings flow directly to the building's operating budget.</p>`,
    category: 'Industry News',
    tags: ['energy', 'regenerative', 'technology', 'savings'],
    author: { name: 'FG Lift Editorial Team', title: 'Engineering Division' },
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2025-02-14'),
    relatedSlugs: ['choosing-right-elevator-residential-building', 'elevator-maintenance-best-practices'],
  },
  {
    slug: 'fg-lift-iso-9001-certification-renewal',
    title: 'FG Lift Achieves ISO 9001:2015 Re-Certification for 2025',
    excerpt: 'Our manufacturing facility in Surat has successfully passed the triennial ISO quality management system audit, reaffirming our commitment to precision engineering.',
    coverImage: '/images/about-factory.png',
    coverImageAlt: 'FG Lift ISO certification ceremony',
    content: `<h2>Certification Milestone</h2>
<p>FG Lift Pvt. Ltd. is proud to announce the successful renewal of our ISO 9001:2015 Quality Management System certification following a comprehensive three-day audit of our Surat manufacturing facility.</p>

<h2>What the Audit Covered</h2>
<p>The Bureau Veritas audit team examined every aspect of our quality management system — from incoming raw material inspection procedures and CNC machining tolerances, through welding quality assurance and surface finishing processes, to final assembly testing and documentation protocols.</p>

<h3>Key Findings</h3>
<ul>
<li>Zero major non-conformities identified</li>
<li>CNC machining precision consistently within ±0.05mm tolerances</li>
<li>100% traceability of all structural steel components</li>
<li>Complete documentation of all safety testing procedures</li>
</ul>

<h2>Our Commitment</h2>
<p>This certification is not just a badge — it represents the daily discipline of 150+ team members who maintain rigorous quality standards at every step of the manufacturing process. From the engineer programming the laser cutter to the technician performing the final load test, quality is embedded in our culture.</p>

<blockquote>Quality is not an act, it is a habit. At FG Lift, that habit has been cultivated over 15 years of precision manufacturing.</blockquote>`,
    category: 'Company Update',
    tags: ['certification', 'ISO', 'quality', 'manufacturing'],
    author: { name: 'FG Lift Editorial Team', title: 'Corporate Communications' },
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2025-01-22'),
    relatedSlugs: ['capsule-elevator-landmark-installation'],
  },
]

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
]

export async function GET() {
  try {
    await connectDB()

    // 1. Seed Products if missing (preserving existing user data)
    const seededProducts = []
    for (const prodData of mockProducts) {
      const exists = await Product.findOne({ slug: prodData.slug })
      if (!exists) {
        const created = await Product.create(prodData)
        seededProducts.push(created)
      }
    }

    // 2. Seed Projects if missing
    const seededProjects = []
    for (const projData of mockProjects) {
      const exists = await GalleryProject.findOne({ title: projData.title })
      if (!exists) {
        const created = await GalleryProject.create(projData)
        seededProjects.push(created)
      }
    }

    // 3. Seed Email Templates if missing
    const seededTemplates = []
    for (const temp of defaultTemplates) {
      const exists = await EmailTemplate.findOne({ name: temp.name })
      if (!exists) {
        const created = await EmailTemplate.create(temp)
        seededTemplates.push(created)
      }
    }

    // 4. Seed Blog posts if missing (with readTime calculation)
    const seededPosts = []
    for (const postData of mockBlogPosts) {
      const exists = await BlogPost.findOne({ slug: postData.slug })
      if (!exists) {
        const post = new BlogPost(postData)
        await post.save()
        seededPosts.push(post)
      }
    }

    // 5. Seed default Super Admin if missing
    let adminEmail = 'admin@fglift.com'
    const existingAdmin = await Admin.findOne({ email: adminEmail })
    if (!existingAdmin) {
      const hashedPassword = await hashPassword('adminpassword')
      await Admin.create({
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        isActive: true
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded safely. Existing MongoDB data preserved.',
      productsSeeded: seededProducts.length,
      projectsSeeded: seededProjects.length,
      postsSeeded: seededPosts.length,
      templatesSeeded: seededTemplates.length,
      adminSeeded: adminEmail
    })
  } catch (err) {
    console.error('Seed API error:', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}
