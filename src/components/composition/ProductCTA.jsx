import React from 'react'
import InlineCTA from './InlineCTA'

export function ProductCTA({ productName, onClick, ...props }) {
  return (
    <InlineCTA
      title={`Intrigued by the ${productName}?`}
      description={`Download specifications brochure, check certification documents, or configure custom finishes.`}
      actionText="Request Callback"
      onClick={onClick}
      {...props}
    />
  )
}

export default ProductCTA
