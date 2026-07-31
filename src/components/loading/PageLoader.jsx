'use client'

import LuxuryElevatorLoader from './LuxuryElevatorLoader'

export function PageLoader({ className = '', mode = 'compact' }) {
  return <LuxuryElevatorLoader mode={mode} className={className} />
}

export default PageLoader
