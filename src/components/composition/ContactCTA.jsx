import React from 'react'
import BannerCTA from './BannerCTA'

export function ContactCTA({ onClick, ...props }) {
  return (
    <BannerCTA
      title="Initiate Project Architecture Consultation"
      description="Connect directly with our engineering division. Get custom estimations, layout compliance checklists, and vertical transit studies."
      actionText="Contact Specialist"
      onClick={onClick}
      {...props}
    />
  )
}

export default ContactCTA
