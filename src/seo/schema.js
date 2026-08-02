/**
 * Schema.jsx Component Facade for Next.js Script Injection
 * FG Lifts Pvt. Ltd.
 */

import React from 'react'
import * as jsonldBuilders from './jsonld'

export function SchemaScript({ schema }) {
  if (!schema) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const schema = {
  ...jsonldBuilders,
  Script: SchemaScript
}

export default schema
