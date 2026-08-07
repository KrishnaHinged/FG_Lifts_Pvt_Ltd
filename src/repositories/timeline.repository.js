import { connectDB } from '@/lib/mongodb'
import TimelineMilestone from '@/models/TimelineMilestone'

export const DEFAULT_MILESTONES = [
  { year: '1993', title: 'Firozgar Elevator Established', desc: 'Inception of Firozgar Elevator, laying the foundation of precision engineering.', highlight: true, image: '/images/fg-building.jpg', sortOrder: 1 },
  { year: '1995', title: 'Geared Machine with Reed System', desc: 'Introduced advanced geared machines integrated with reed magnetic sensing.', image: '/images/intro/2.jpeg', sortOrder: 2 },
  { year: '1998', title: 'Relay Panel Technology', desc: 'Transitioned to automated relay control panels for enhanced reliability.', image: '/images/intro/3.jpeg', sortOrder: 3 },
  { year: '2001', title: 'First Auto Door Elevator', desc: 'Successfully engineered and installed our first fully automatic door system.', image: '/images/intro/4.jpeg', sortOrder: 4 },
  { year: '2003', title: 'Drive Controller Integration', desc: 'Adopted variable frequency drive controllers for smooth acceleration.', image: '/images/intro/5.jpeg', sortOrder: 5 },
  { year: '2005', title: '2,000+ Installations Landmark', desc: 'Crossed the 2,000 elevator milestone across commercial and residential sites.', highlight: true, image: '/images/intro/6.jpeg', sortOrder: 6 },
  { year: '2007', title: 'First Car Elevator Installed', desc: 'Expanded into heavy-duty automotive and heavy load vertical mobility.', image: '/images/intro/7.jpeg', sortOrder: 7 },
  { year: '2009', title: 'Emergency Rescue Device (ARD)', desc: 'Standardized automatic rescue devices ensuring passenger safety during power cuts.', image: '/images/intro/8.jpeg', sortOrder: 8 },
  { year: '2010', title: '3,000+ Installations Landmark', desc: 'Surpassed 3,000 active elevator installations across Western India.', image: '/images/intro/9.jpeg', sortOrder: 9 },
  { year: '2011', title: 'Own Manufacturing Unit', desc: 'Established our primary state-of-the-art manufacturing plant in Surat.', highlight: true, image: '/images/about-factory.png', sortOrder: 10 },
  { year: '2012', title: 'Touch Panel LOP/COP Buttons', desc: 'Introduced sleek capacitive glass touch operating panels.', image: '/images/intro/10.jpeg', sortOrder: 11 },
  { year: '2013', title: 'Gearless Machine Adoption', desc: 'Engineered high-efficiency permanent magnet gearless traction machines.', image: '/images/intro/11.jpeg', sortOrder: 12 },
  { year: '2015', title: 'First 18-Stop Elevator (1.75 m/s)', desc: 'Deployed high-speed 1.75 m/s elevators for multi-story towers.', image: '/images/intro/12.jpeg', sortOrder: 13 },
  { year: '2016', title: 'Fire-Rated Auto Doors', desc: 'Introduced certified fire-rated door assemblies meeting safety standards.', image: '/images/intro/13.jpeg', sortOrder: 14 },
  { year: '2018', title: 'Firozger Elevator Industries', desc: 'Rebranded to Firozger Elevator Industries to reflect growing scale.', image: '/images/intro/14.jpeg', sortOrder: 15 },
  { year: '2019', title: 'Digital Control System', desc: 'Pioneered micro-processor based digital elevator management systems.', image: '/images/intro/15.jpeg', sortOrder: 16 },
  { year: '2021', title: '22-Floor 2-Ton Heavy Lift', desc: 'Installed high-capacity 2-ton elevators reaching 22 floors.', image: '/images/intro/16.jpeg', sortOrder: 17 },
  { year: '2022', title: 'Vapi Branch Office', desc: 'Opened dedicated sales and support hub in Vapi to serve industrial corridors.', image: '/images/intro/17.jpeg', sortOrder: 18 },
  { year: '2023', title: 'Firozger Elevator Pvt. Ltd.', desc: 'Incorporated as a Private Limited Company (Firozger Elevator Pvt. Ltd.).', highlight: true, image: '/images/elevator-gold.jpg', sortOrder: 19 },
  { year: '2024', title: 'Indore Branch Office', desc: 'Expanded operations into Madhya Pradesh with a new branch in Indore.', image: '/images/intro/1.jpeg', sortOrder: 20 },
  { year: '2026', title: 'Rebranded to FG Lifts Pvt. Ltd.', desc: 'Evolved into FG Lifts Pvt. Ltd., representing modern luxury vertical mobility.', highlight: true, image: '/images/elevator-steel.jpg', sortOrder: 21 }
]

export async function getAllMilestonesPublic() {
  await connectDB()
  let list = await TimelineMilestone.find({ isActive: true }).sort({ sortOrder: 1, year: 1 }).lean()
  if (!list || list.length === 0) {
    // Seed default milestones if database is empty
    await TimelineMilestone.insertMany(DEFAULT_MILESTONES)
    list = await TimelineMilestone.find({ isActive: true }).sort({ sortOrder: 1, year: 1 }).lean()
  }
  return list
}

export async function getAllMilestonesAdmin() {
  await connectDB()
  let list = await TimelineMilestone.find().sort({ sortOrder: 1, year: 1 }).lean()
  if (!list || list.length === 0) {
    await TimelineMilestone.insertMany(DEFAULT_MILESTONES)
    list = await TimelineMilestone.find().sort({ sortOrder: 1, year: 1 }).lean()
  }
  return list
}

export async function getMilestoneById(id) {
  await connectDB()
  return TimelineMilestone.findById(id).lean()
}

export async function createMilestone(data) {
  await connectDB()
  return TimelineMilestone.create(data)
}

export async function updateMilestone(id, data) {
  await connectDB()
  return TimelineMilestone.findByIdAndUpdate(id, data, { new: true }).lean()
}

export async function deleteMilestone(id) {
  await connectDB()
  return TimelineMilestone.findByIdAndDelete(id).lean()
}
