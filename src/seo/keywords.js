/**
 * Centralized SEO Keywords Dictionary
 * FG Lift Pvt. Ltd.
 */

export const keywords = {
  brand: [
    'FG Lift',
    'FG Lift Pvt Ltd',
    'FG Elevators',
    'FG Vertical Transport',
    'FG Lifts India'
  ],
  products: [
    'Passenger Elevators',
    'Goods Lifts',
    'Capsule Lifts',
    'Home Lifts',
    'Hospital Elevators',
    'Panoramic Lifts',
    'Gearless Elevators',
    'Hydraulic Lifts',
    'Machine Room Less Lifts',
    'MRL Elevators',
    'Custom Elevator Cabins'
  ],
  services: [
    'Elevator Manufacturing',
    'Elevator Installation',
    'Elevator Maintenance',
    'Elevator Modernization',
    '360 Elevator Customization',
    'Lift Inspection and Safety'
  ],
  locations: [
    'Elevator Manufacturer India',
    'Lifts Supplier Gujarat',
    'Ahmedabad Elevators',
    'Industrial Lifts India'
  ],
  getCombinedKeywords: (additional = []) => {
    const defaultList = [
      ...keywords.brand,
      ...keywords.products,
      ...keywords.services,
      ...keywords.locations
    ]
    return Array.from(new Set([...defaultList, ...additional])).join(', ')
  }
}

export default keywords
