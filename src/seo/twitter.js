/**
 * Twitter Card Metadata Generator
 * FG Lift Pvt. Ltd.
 */

export function buildTwitterCard({
  title = 'FG Lift Pvt. Ltd. | Premium Elevator Manufacturing',
  description = 'Industry-leading elevator engineering, passenger lifts, goods elevators, and 360-degree interactive cabin design systems.',
  card = 'summary_large_image',
  creator = '@fglift',
  images = ['/images/projects-collage.png']
} = {}) {
  return {
    card,
    title,
    description,
    creator,
    images
  }
}

export default buildTwitterCard
