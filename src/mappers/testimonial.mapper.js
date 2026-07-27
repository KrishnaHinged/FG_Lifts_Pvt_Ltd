function getInitials(name) {
  if (!name) return 'TL'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function mapToTestimonialDTO(testimonial) {
  if (!testimonial) return null
  return {
    id: testimonial._id?.toString(),
    name: testimonial.name,
    title: testimonial.title,
    quote: testimonial.quote,
    bgColor: testimonial.bgColor || 'bg-[#1A1A1A] text-white',
    avatar: getInitials(testimonial.name),
    isActive: !!testimonial.isActive,
    sortOrder: testimonial.sortOrder || 0,
    createdAt: testimonial.createdAt ? testimonial.createdAt.toString() : '',
    updatedAt: testimonial.updatedAt ? testimonial.updatedAt.toString() : ''
  }
}

export function mapToTestimonialListDTO(testimonials) {
  if (!Array.isArray(testimonials)) return []
  return testimonials.map(mapToTestimonialDTO)
}
