const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fglifts';

const SpecSchema = new mongoose.Schema({
  key:   String,
  value: String
}, { _id: false });

const ImageSchema = new mongoose.Schema({
  url:   String,
  alt:   String
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
  isFeatured:     { type: Boolean, default: false },
  badge:          String,
  isActive:       { type: Boolean, default: true },
  sortOrder:      { type: Number, default: 0 }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const homeLiftProducts = [
  // 1. Systems
  {
    slug: 'geh160',
    name: 'GEH160 Steel Rope Traction Home Lift',
    tagline: 'Originated from Germany inheriting classics.',
    category: 'Home Lift',
    subCategory: 'Traction Technology',
    tabGroup: 'Systems',
    description: 'The steel rope traction technology is mature and various safety components and measures fully protect the passengers; the operation is stable, and the variable voltage VVVF technology perfectly adjusts the elevator operating speed curve.',
    specifications: [
      { key: 'Min. Overhead', value: '2600 mm' },
      { key: 'Min. Pit', value: '100 mm' },
      { key: 'Speed', value: '0.4 m/s' },
      { key: 'Capacity', value: '400 kg' },
      { key: 'Drive Type', value: 'Steel Rope Traction' },
      { key: 'Travel Height', value: '≤ 15000 mm' },
      { key: 'Shaft Option', value: 'Multiple shaft options available; aluminum alloy shafts are lighter, easier to install, and more aesthetically pleasing.' }
    ],
    features: [
      'Mature steel rope traction technology',
      'Low overhead space requirement (min. 2600mm)',
      'Shallow pit requirement (min. 100mm)',
      'Variable voltage VVVF speed adjustment curve',
      'Extremely quiet and safe operation'
    ],
    applications: ['Residential', 'Luxury', 'Home'],
    images: [{ url: '/images/elevator-steel.jpg', alt: 'GEH160 Steel Rope Traction Home Lift' }],
    isFeatured: true,
    badge: 'Popular',
    sortOrder: 100
  },
  {
    slug: 'geh320s',
    name: 'GEH320S Steel Belt Traction Home Lift',
    tagline: 'Germany-engineered flat composite steel belt technology.',
    category: 'Home Lift',
    subCategory: 'Traction Technology',
    tabGroup: 'Systems',
    description: 'Optimize space layout: adapt to the ultimate shaft space. Smooth and quiet operation: high transmission efficiency, low energy consumption, low operating noise, smooth and comfortable. Flat composite steel belt, After-sales maintenance-free.',
    specifications: [
      { key: 'Speed', value: '0.4 m/s' },
      { key: 'Capacity', value: '400 kg' },
      { key: 'Drive Type', value: 'Flat Composite Steel Belt' },
      { key: 'Travel Height', value: '≤ 12000 mm' },
      { key: 'Maintenance', value: 'After-sales maintenance-free' }
    ],
    features: [
      'Flat composite steel belt technology',
      'Optimize space layout for ultimate shaft space',
      'Smooth and quiet operation with high transmission efficiency',
      'After-sales maintenance-free operation',
      'Increase car space & reduce energy consumption'
    ],
    applications: ['Residential', 'Luxury', 'Home'],
    images: [{ url: '/images/elevator-gold.jpg', alt: 'GEH320S Steel Belt Traction Home Lift' }],
    isFeatured: true,
    badge: 'Premium',
    sortOrder: 101
  },
  {
    slug: 'slp500',
    name: 'SLP500 Luxury Home Lift System',
    tagline: 'German craftsmanship, space-efficient, premium design.',
    category: 'Home Lift',
    subCategory: 'Traction Technology',
    tabGroup: 'Systems',
    description: 'SLP500 features premium architectural design with art background walls and space-efficient structure. Designed for luxury villas and private estates.',
    specifications: [
      { key: 'Speed', value: '0.3 m/s' },
      { key: 'Capacity', value: '350 kg' },
      { key: 'Drive Type', value: 'Specialized Home Drive' },
      { key: 'Travel Height', value: '≤ 12000 mm' },
      { key: 'Min. Pit', value: '100 mm' },
      { key: 'Min. Overhead', value: '2700 mm' }
    ],
    features: [
      'German noble demeanor styling',
      'Quiet and smooth travel velocity',
      'Premium structural glass or steel frames',
      'Art background wall compatibility'
    ],
    applications: ['Residential', 'Luxury', 'Home'],
    images: [{ url: '/images/elevator-wood.jpg', alt: 'SLP500 Luxury Home Lift' }],
    isFeatured: true,
    badge: 'Luxury',
    sortOrder: 102
  },

  // 2. Cabins (Standard)
  {
    slug: 'hc188',
    name: 'HC188 Standard Cabin',
    tagline: 'Standard cabin with champagne gold fantasy metal plate.',
    category: 'Home Lift',
    subCategory: 'Standard Cabin',
    tabGroup: 'Cabins',
    description: 'Car door, Front wall, Side walls, and Back wall all feature HSC00709 champagne gold fantasy metal plate. Finished with FK-SP63 black gold sand handrail, Galaxy ceiling with black aluminum alloy frame and light strip, and PVC floor.',
    specifications: [
      { key: 'Car Door', value: 'HSC00709 champagne gold fantasy metal plate' },
      { key: 'Front Wall', value: 'HSC00709 champagne gold fantasy metal plate' },
      { key: 'Side Walls', value: 'HSC00709 champagne gold fantasy metal plate' },
      { key: 'Back Wall', value: 'HSC00709 champagne gold fantasy metal plate' },
      { key: 'Handrail', value: 'FK-SP63 black gold sand' },
      { key: 'Ceiling', value: 'Galaxy, black aluminum alloy frame + light strip' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['360° panoramic view available'],
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HC188 Standard Cabin' }],
    sortOrder: 110
  },
  {
    slug: 'hc189',
    name: 'HC189 Standard Cabin',
    tagline: 'Standard cabin with gray short brushed gold fantasy metal plate.',
    category: 'Home Lift',
    subCategory: 'Standard Cabin',
    tabGroup: 'Cabins',
    description: 'Car door, Front wall, Side wall, and Rear wall all feature HSL002 gray short brushed gold fantasy metal plate. Completed with FK-SP63 black gold sand handrail, Galaxy ceiling with black aluminum alloy frame and light strip, and PVC floor.',
    specifications: [
      { key: 'Car Door', value: 'HSL002 gray short brushed gold fantasy metal plate' },
      { key: 'Front Wall', value: 'HSL002 gray short brushed gold fantasy metal plate' },
      { key: 'Side Walls', value: 'HSL002 gray short brushed gold fantasy metal plate' },
      { key: 'Back Wall', value: 'HSL002 gray short brushed gold fantasy metal plate' },
      { key: 'Handrail', value: 'FK-SP63 black gold sand' },
      { key: 'Ceiling', value: 'Galaxy, black aluminum alloy frame + light strip' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['360° panoramic view available'],
    images: [{ url: '/images/elevator-steel.jpg', alt: 'HC189 Standard Cabin' }],
    sortOrder: 111
  },
  {
    slug: 'hc190',
    name: 'HC190 Standard Cabin',
    tagline: 'Standard cabin with retro copper brushed colorful metal plate.',
    category: 'Home Lift',
    subCategory: 'Standard Cabin',
    tabGroup: 'Cabins',
    description: 'Car door, Front wall, Side walls, and Back wall all feature HSL018 retro copper brushed colorful metal plate. Finished with FK-SP63 handrail, Galaxy ceiling with black aluminum alloy frame + light strip, and PVC floor.',
    specifications: [
      { key: 'Car Door', value: 'HSL018 retro copper brushed colorful metal plate' },
      { key: 'Front Wall', value: 'HSL018 retro copper brushed colorful metal plate' },
      { key: 'Side/Back Walls', value: 'HSL018 retro copper brushed colorful metal plate' },
      { key: 'Handrail', value: 'FK-SP63' },
      { key: 'Ceiling', value: 'Galaxy, black aluminum alloy frame + light strip' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['360° panoramic view available'],
    images: [{ url: '/images/elevator-wood.jpg', alt: 'HC190 Standard Cabin' }],
    sortOrder: 112
  },
  {
    slug: 'hc191',
    name: 'HC191 Standard Cabin',
    tagline: 'Standard cabin with coffee gold brushed colorful metal plate.',
    category: 'Home Lift',
    subCategory: 'Standard Cabin',
    tabGroup: 'Cabins',
    description: 'Car door, Front wall, Side walls, and Back wall all feature HSL001 coffee gold brushed colorful metal plate. Finished with FK-SP63 handrail, Galaxy ceiling with black aluminum alloy frame + light strip, and PVC floor.',
    specifications: [
      { key: 'Car Door', value: 'HSL001 coffee gold brushed colorful metal plate' },
      { key: 'Front Wall', value: 'HSL001 coffee gold brushed colorful metal plate' },
      { key: 'Side/Back Walls', value: 'HSL001 coffee gold brushed colorful metal plate' },
      { key: 'Handrail', value: 'FK-SP63' },
      { key: 'Ceiling', value: 'Galaxy, black aluminum alloy frame + light strip' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['360° panoramic view available'],
    images: [{ url: '/images/elevator-steel.jpg', alt: 'HC191 Standard Cabin' }],
    sortOrder: 113
  },
  {
    slug: 'hc192',
    name: 'HC192 Standard Cabin',
    tagline: 'Standard cabin with gray fantasy and brown colored metal plate.',
    category: 'Home Lift',
    subCategory: 'Standard Cabin',
    tabGroup: 'Cabins',
    description: 'Features gray fantasy and colored metal plate doors and walls, complete with Galaxy Convergence ceiling, black aluminum alloy frame and light strip, and PVC floor.',
    specifications: [
      { key: 'Car Door', value: 'HSC018 gray fantasy metal plate' },
      { key: 'Front Wall', value: 'HSC018 gray colored metal plate' },
      { key: 'Side Walls', value: 'HSC018 gray fantasy metal plate + HSC020 brown colored metal plate' },
      { key: 'Back Wall', value: 'HSC018 gray fantasy metal plate + HSC020 brown colored metal plate + light strip' },
      { key: 'Ceiling', value: 'Galaxy Convergence, black aluminum alloy frame + light strip' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['360° panoramic view available'],
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HC192 Standard Cabin' }],
    sortOrder: 114
  },
  {
    slug: 'hc193',
    name: 'HC193 Standard Cabin',
    tagline: 'Standard cabin with silver gray colorful metal plate.',
    category: 'Home Lift',
    subCategory: 'Standard Cabin',
    tabGroup: 'Cabins',
    description: 'Features silver gray colorful metal plate doors and front wall, with moonlight white fantasy metal plate side/back walls, FK-SP63 handrail, and PVC floor.',
    specifications: [
      { key: 'Car Door/Front Wall', value: 'HSC035 silver gray colorful metal plate' },
      { key: 'Side/Back Walls', value: 'HSC001 moonlight white fantasy metal plate' },
      { key: 'Handrail', value: 'FK-SP63' },
      { key: 'Ceiling', value: 'Galaxy, black aluminum alloy frame + light strip' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['360° panoramic view available'],
    images: [{ url: '/images/elevator-steel.jpg', alt: 'HC193 Standard Cabin' }],
    sortOrder: 115
  },

  // 3. Cabin Options (More Options)
  {
    slug: 'hc165',
    name: 'HC165 Option Cabin',
    tagline: 'Clean stainless steel cabin option.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Hairline stainless steel front and side walls, back wall finished with center mirror and hairline stainless steel, complete with LED linear light ceiling and PVC floor.',
    specifications: [
      { key: 'Ceiling', value: 'Hairline St. St., LED linear light' },
      { key: 'Walls', value: 'Hairline St. St.' },
      { key: 'Back Wall', value: 'Middle with Mirror St St, others are Hairline St. St.' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['Sleek minimalist industrial styling'],
    images: [{ url: '/images/elevator-steel.jpg', alt: 'HC165 Option Cabin' }],
    sortOrder: 120
  },
  {
    slug: 'hc170',
    name: 'HC170 Option Cabin',
    tagline: 'Yellow and mirror finish steel plate option.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Color steel plate with yellow and mirror finish, complete with LED flat light ceiling and PVC floor.',
    specifications: [
      { key: 'Ceiling', value: 'LED flat light' },
      { key: 'Front Wall', value: 'Hairline St. St.' },
      { key: 'Side Walls', value: 'Color steel plate with yellow and Mirror St. St.' },
      { key: 'Back Wall', value: 'Color steel plate with yellow and black' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['Bright visual aesthetics'],
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HC170 Option Cabin' }],
    sortOrder: 121
  },
  {
    slug: 'hc169',
    name: 'HC169 Option Cabin',
    tagline: 'White and mirror finish steel plate option.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Color steel plate with white and mirror finish, complete with LED flat light ceiling and PVC floor.',
    specifications: [
      { key: 'Ceiling', value: 'LED flat light' },
      { key: 'Front Wall', value: 'Hairline St. St.' },
      { key: 'Side/Back Walls', value: 'Color steel plate with white, mirror and blue accents' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['Classic elegant styling'],
    images: [{ url: '/images/elevator-steel.jpg', alt: 'HC169 Option Cabin' }],
    sortOrder: 122
  },
  {
    slug: 'hc171',
    name: 'HC171 Option Cabin',
    tagline: 'Dark brown and mirror finish steel plate option.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Colored steel plate with dark brown and mirror finish, completed with LED flat light ceiling and PVC floor.',
    specifications: [
      { key: 'Ceiling', value: 'LED flat light' },
      { key: 'Front Wall', value: 'Hairline St. St.' },
      { key: 'Side/Back Walls', value: 'Colored steel plate with dark brown, mirror and red accents' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['Warm premium tone styling'],
    images: [{ url: '/images/elevator-wood.jpg', alt: 'HC171 Option Cabin' }],
    sortOrder: 123
  },
  {
    slug: 'hc143',
    name: 'HC143 Premium Cabin',
    tagline: 'Luxury bronze hairline stainless steel option.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Featuring bronze hairline stainless steel walls and bronze mirror etched stainless steel back wall, complete with acrylic spotlight ceiling and marble flooring.',
    specifications: [
      { key: 'Ceiling', value: 'Acrylic, LED spotlights, bronze hairline stainless steel' },
      { key: 'Walls', value: 'Bronze hairline stainless steel' },
      { key: 'Back Wall', value: 'Bronze hairline stainless steel, bronze mirror etched stainless steel' },
      { key: 'Floor', value: 'Marble' }
    ],
    features: ['Luxury marble floor', 'Premium bronze finish'],
    images: [{ url: '/images/elevator-wood.jpg', alt: 'HC143 Premium Cabin' }],
    sortOrder: 124
  },
  {
    slug: 'hc144',
    name: 'HC144 Premium Cabin',
    tagline: 'Black titanium mirror and hairline stainless steel cabin.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Black titanium hairline and mirror stainless steel walls combined with patterned steel plate, finished with marble floor and acrylic ceiling.',
    specifications: [
      { key: 'Ceiling', value: 'Black titanium mirror stainless steel frame, acrylic' },
      { key: 'Front Wall', value: 'Black titanium hairline stainless steel' },
      { key: 'Side/Back Walls', value: 'Black titanium mirror stainless steel, patterned steel plate' },
      { key: 'Floor', value: 'Marble' }
    ],
    features: ['Sleek black reflective design', 'Marble floor'],
    images: [{ url: '/images/elevator-steel.jpg', alt: 'HC144 Premium Cabin' }],
    sortOrder: 125
  },
  {
    slug: 'hc145',
    name: 'HC145 Premium Cabin',
    tagline: 'Rose gold mirror and hairline stainless steel cabin.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Rose gold hairline and mirror stainless steel walls combined with patterned steel plate, finished with marble floor and acrylic inkjet printing ceiling.',
    specifications: [
      { key: 'Ceiling', value: 'Acrylic inkjet printing, LED spotlights, rosegold mirror stainless steel' },
      { key: 'Walls', value: 'Rose gold hairline stainless steel' },
      { key: 'Back/Side Walls', value: 'Rose gold hairline stainless steel, patterned steel plate' },
      { key: 'Floor', value: 'Marble' }
    ],
    features: ['Elegant rose gold metallic finish', 'Premium marble floor'],
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HC145 Premium Cabin' }],
    sortOrder: 126
  },
  {
    slug: 'hc157',
    name: 'HC157 Premium Cabin',
    tagline: 'Anti-fingerprint Roman bronze brown hairline steel cabin.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Roman bronze brown hairline anti-fingerprint stainless steel walls with deep Roman bronze brown hairline back wall, complete with LED lights and marble floor.',
    specifications: [
      { key: 'Ceiling', value: 'LED flat light' },
      { key: 'Walls', value: 'Roman bronze brown hairline anti-fingerprint stainless steel' },
      { key: 'Back Wall', value: 'Deep Roman Bronze Brown Hairline Anti-Fingerprint Stainless Steel, LED lights' },
      { key: 'Floor', value: 'Marble' }
    ],
    features: ['Anti-fingerprint technology', 'Deep Roman Bronze styling'],
    images: [{ url: '/images/elevator-wood.jpg', alt: 'HC157 Premium Cabin' }],
    sortOrder: 127
  },
  {
    slug: 'hc164',
    name: 'HC164 Option Cabin',
    tagline: 'Standard clean hairline stainless steel option.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'All walls and front door feature clean hairline stainless steel, combined with LED flat light ceiling and PVC floor.',
    specifications: [
      { key: 'Ceiling', value: 'LED flat light' },
      { key: 'Walls', value: 'Hairline St. St.' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['Durable utility design'],
    images: [{ url: '/images/elevator-steel.jpg', alt: 'HC164 Option Cabin' }],
    sortOrder: 128
  },
  {
    slug: 'hc168',
    name: 'HC168 Option Cabin',
    tagline: 'Begonia wood grain and warm white steel plate option.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Featuring begonia wood grain and white ice jade color steel plate walls, combined with acrylic transparent light strip ceiling and PVC floor.',
    specifications: [
      { key: 'Ceiling', value: 'Color steel plate with warm white and acrylic transparent light strip' },
      { key: 'Front Wall', value: 'Hairline St. St.' },
      { key: 'Side/Back Walls', value: 'Color steel plate with straight grain begonia wood and white ice jade' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['Warm begonia wood grain textures'],
    images: [{ url: '/images/elevator-wood.jpg', alt: 'HC168 Option Cabin' }],
    sortOrder: 129
  },
  {
    slug: 'hc166',
    name: 'HC166 Option Cabin',
    tagline: 'Yellow and brown steel plate cabin option.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Color steel plate walls in yellow and brown tones, combined with white and acrylic ceiling design and PVC floor.',
    specifications: [
      { key: 'Ceiling', value: 'Color steel plate with white and acrylic' },
      { key: 'Front Wall', value: 'Hairline St. St.' },
      { key: 'Side/Back Walls', value: 'Color steel plate with yellow and brown' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['Earthy dual-tone finish'],
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HC166 Option Cabin' }],
    sortOrder: 130
  },
  {
    slug: 'hc172',
    name: 'HC172 Option Cabin',
    tagline: 'Natural pear wood and yellow steel plate option.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Features natural pear wood steel plate side walls with yellow and natural pear wood back wall, completed with Acrylic transparent light strip and PVC floor.',
    specifications: [
      { key: 'Ceiling', value: 'Color steel plate with yellow with Acrylic transparent light strip' },
      { key: 'Front Wall', value: 'Hairline St. St.' },
      { key: 'Side Walls', value: 'Colored steel plate with natural pear wood' },
      { key: 'Back Wall', value: 'Color steel plate with yellow and natural pear wood' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['Elegant natural pear wood styling'],
    images: [{ url: '/images/elevator-wood.jpg', alt: 'HC172 Option Cabin' }],
    sortOrder: 131
  },
  {
    slug: 'hc173',
    name: 'HC173 Option Cabin',
    tagline: 'Mirror stainless steel and rock wood grain option.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Front wall in hairline stainless steel with side walls featuring rock and wood grain color steel plate, completed with mirror stainless steel ceiling with acrylic light strip and PVC floor.',
    specifications: [
      { key: 'Ceiling', value: 'Mirror St. St. with acrylic transparent light strip' },
      { key: 'Front Wall', value: 'Hairline St. St.' },
      { key: 'Side Walls', value: 'Color steel plate with rock and wood grain' },
      { key: 'Back Wall', value: 'Color steel plate with white, rock and wood grain' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['Organic rock and wood design combination'],
    images: [{ url: '/images/elevator-steel.jpg', alt: 'HC173 Option Cabin' }],
    sortOrder: 132
  },
  {
    slug: 'hc174',
    name: 'HC174 Option Cabin',
    tagline: 'Champagne gold mirror etched and French oak cabin.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Front wall in hairline stainless steel, side walls in French oak color steel plate, and back wall in champagne gold mirror etched stainless steel with French oak, PVC floor.',
    specifications: [
      { key: 'Ceiling', value: 'Champagne gold mirror etched St. St. with light strips' },
      { key: 'Front Wall', value: 'Hairline St. St.' },
      { key: 'Side Walls', value: 'Color steel plate with French oak' },
      { key: 'Back Wall', value: 'Champagne gold mirror etched St. St. with French oak' },
      { key: 'Floor', value: 'PVC' }
    ],
    features: ['Champagne gold mirror accents', 'French oak wood grain style'],
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HC174 Option Cabin' }],
    sortOrder: 133
  },
  {
    slug: 'hcm305',
    name: 'HCM305 Premium Cabin',
    tagline: 'Dark brown hairline and decorative ceramic sheet cabin.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Dark brown hairline anti-fingerprint stainless steel walls, back wall finished with a ceramic sheet, decorative strips and marble floor.',
    specifications: [
      { key: 'Ceiling', value: 'Dark browh hairline St St, laser cutting stylinglights' },
      { key: 'Front/Side Walls', value: 'Dark brown hairline anti-fingerprint St. St.' },
      { key: 'Back Wall', value: 'Middle with ceramic sheet, dark brown hairline anti-fingerprint St St and decorative strips' },
      { key: 'Floor', value: 'Marble' }
    ],
    features: ['Luxury ceramic sheet accent', 'Anti-fingerprint dark brown hairline', 'Marble floor'],
    images: [{ url: '/images/elevator-wood.jpg', alt: 'HCM305 Premium Cabin' }],
    sortOrder: 134
  },
  {
    slug: 'hcm309',
    name: 'HCM309 Premium Cabin',
    tagline: 'Roman bronze brown mirror etched and ceramic sheet cabin.',
    category: 'Home Lift',
    subCategory: 'More Cabin Options',
    tabGroup: 'Cabins',
    description: 'Features open-pore bronze sandblasted stainless steel ceiling, Roman bronze brown mirror etched anti-fingerprint walls with ceramic sheet, and marble floor.',
    specifications: [
      { key: 'Ceiling', value: 'Metallic white paint, open-pore bronze sandblasted St St, hidden light strips' },
      { key: 'Front Wall', value: 'Roman bronze brown mirror etched anti-fingerprint stainless steel' },
      { key: 'Side Walls', value: 'Roman bronze brown mirror etched anti-fingerprint stainless steel, ceramic sheet, bronze mirror St. St.' },
      { key: 'Back Wall', value: 'Roman bronze brown mirror etched anti-fingerprint stainless steel, ceramic sheet' },
      { key: 'Floor', value: 'Marble' }
    ],
    features: ['Premium sandblasted ceiling detail', 'Ceramic sheet background accent', 'Marble floor'],
    images: [{ url: '/images/elevator-steel.jpg', alt: 'HCM309 Premium Cabin' }],
    sortOrder: 135
  },

  // 4. Panoramic Cabins
  {
    slug: 'hcs509',
    name: 'HCS509 Panoramic Cabin',
    tagline: 'Elegant laminated glass panoramic observation cabin.',
    category: 'Home Lift',
    subCategory: 'Panoramic Cabin',
    tabGroup: 'Cabins',
    description: 'Finished in steel plate spray-painted to match aluminum alloy color with tempered laminated glass walls, HCL026 ceiling, and marble floor.',
    specifications: [
      { key: 'Ceiling', value: 'HCL026' },
      { key: 'Front Wall', value: 'Steel plate spray-painted to match aluminum alloy color' },
      { key: 'Side Walls', value: 'Tempered laminated glass, steel plate spray-painted to match aluminum alloy color' },
      { key: 'Back Wall', value: 'Tempered Laminated glass' },
      { key: 'Floor', value: 'Marble(FR034)' }
    ],
    features: ['Full-view tempered laminated safety glass', 'Premium spray-painted matching frame', 'Marble floor'],
    images: [{ url: '/images/projects-collage.png', alt: 'HCS509 Panoramic Cabin' }],
    sortOrder: 140
  },
  {
    slug: 'hcs511',
    name: 'HCS511 Panoramic Cabin',
    tagline: 'Tempered glass panoramic cabin with LED flat light.',
    category: 'Home Lift',
    subCategory: 'Panoramic Cabin',
    tabGroup: 'Cabins',
    description: 'Equipped with 5+5 tempered laminated glass side/back walls, LED flat light ceiling, and marble car floor.',
    specifications: [
      { key: 'Ceiling', value: 'LED flat light' },
      { key: 'Side Walls', value: '5+5 tempered laminated glass' },
      { key: 'Back Wall', value: '5+5 tempered laminated glass' },
      { key: 'Floor', value: 'Marble' }
    ],
    features: ['Double-layer 5+5 tempered safety glass', 'Flat panel LED ceiling lighting', 'Marble floor'],
    images: [{ url: '/images/projects-collage.png', alt: 'HCS511 Panoramic Cabin' }],
    sortOrder: 141
  },

  // 5. Art Background Walls
  {
    slug: 'art-hcs501',
    name: 'Monochrome Smoke Art',
    tagline: 'HCS501',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Monochrome smoke abstract art background wall design for Glarie home elevators.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HCS501 Monochrome Smoke Art' }],
    sortOrder: 150
  },
  {
    slug: 'art-hcs502',
    name: 'Infinite Loop Smoke',
    tagline: 'HCS502',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Infinite loop smoke abstract art background wall design.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HCS502 Infinite Loop Smoke' }],
    sortOrder: 151
  },
  {
    slug: 'art-hcs503',
    name: 'Marble Gold Veins',
    tagline: 'HCS503',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Marble with gold veins background wall design.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HCS503 Marble Gold Veins' }],
    sortOrder: 152
  },
  {
    slug: 'art-hcs504',
    name: 'Golden Helix Smoke',
    tagline: 'HCS504',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Golden helix smoke pattern background wall.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HCS504 Golden Helix Smoke' }],
    sortOrder: 153
  },
  {
    slug: 'art-hcs505',
    name: 'Abstract Gold Ripple',
    tagline: 'HCS505',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Abstract gold ripple background design.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HCS505 Abstract Gold Ripple' }],
    sortOrder: 154
  },
  {
    slug: 'art-hcs506',
    name: 'Glacial White Stone',
    tagline: 'HCS506',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Glacial white stone texture design.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HCS506 Glacial White Stone' }],
    sortOrder: 155
  },
  {
    slug: 'art-hcs510',
    name: 'Golden Dust Stream',
    tagline: 'HCS510',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Golden dust stream abstract wall pattern.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HCS510 Golden Dust Stream' }],
    sortOrder: 156
  },
  {
    slug: 'art-hpt001',
    name: 'Ocean Waves Blue',
    tagline: 'HPT001',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Ocean waves blue background design.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HPT001 Ocean Waves Blue' }],
    sortOrder: 157
  },
  {
    slug: 'art-hpt002',
    name: 'Black & Gold Strata',
    tagline: 'HPT002',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Black and gold strata luxury design.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HPT002 Black & Gold Strata' }],
    sortOrder: 158
  },
  {
    slug: 'art-hpt003',
    name: 'Geometric Ice Crystals',
    tagline: 'HPT003',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Geometric ice crystals wall pattern.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HPT003 Geometric Ice Crystals' }],
    sortOrder: 159
  },
  {
    slug: 'art-hpt004',
    name: 'Amber Horizon',
    tagline: 'HPT004',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Amber horizon light pattern design.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HPT004 Amber Horizon' }],
    sortOrder: 160
  },
  {
    slug: 'art-hpt005',
    name: 'Golden Water Glass',
    tagline: 'HPT005',
    category: 'Home Lift',
    subCategory: 'Art Background Wall',
    tabGroup: 'Components',
    description: 'Golden water glass texture design.',
    images: [{ url: '/images/elevator-gold.jpg', alt: 'HPT005 Golden Water Glass' }],
    sortOrder: 161
  }
];

async function seedHomeLifts() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully.');

    console.log(`Clearing existing Home Lift products...`);
    const deleteRes = await Product.deleteMany({ category: 'Home Lift' });
    console.log(`Deleted ${deleteRes.deletedCount} old Home Lift products.`);

    console.log(`Seeding ${homeLiftProducts.length} Home Lift products...`);
    const insertRes = await Product.insertMany(homeLiftProducts);
    console.log(`Successfully seeded ${insertRes.length} Home Lift products.`);

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
}

seedHomeLifts();
