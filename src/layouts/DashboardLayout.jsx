'use client'

import React from 'react'
import Container from './Container'
import Grid from './Grid'

export function DashboardLayout({
  stats,
  charts,
  recentActivity,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-8 ${className}`} {...props}>
      {/* Stats row */}
      {stats && <Grid cols="4" gap="default">{stats}</Grid>}

      {/* Primary analytical dashboard layouts split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {charts}
        </div>
        <div className="lg:col-span-4 space-y-8">
          {recentActivity}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
