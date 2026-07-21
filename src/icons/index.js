import React from 'react'
import Arrow from './Arrow'
import Chevron from './Chevron'
import Close from './Close'
import Menu from './Menu'
import Search from './Search'
import Download from './Download'
import Upload from './Upload'
import User from './User'
import Mail from './Mail'
import Phone from './Phone'
import Location from './Location'
import Calendar from './Calendar'
import Clock from './Clock'
import Building from './Building'
import Elevator from './Elevator'
import Industry from './Industry'
import Gallery from './Gallery'
import Blog from './Blog'
import Settings from './Settings'
import Dashboard from './Dashboard'
import Notification from './Notification'
import Warning from './Warning'
import Success from './Success'
import Info from './Info'
import ErrorIcon from './Error'
import Loader from './Loader'

// Registry of icons mapped by string name
export const IconRegistry = {
  arrow: Arrow,
  chevron: Chevron,
  close: Close,
  menu: Menu,
  search: Search,
  download: Download,
  upload: Upload,
  user: User,
  mail: Mail,
  phone: Phone,
  location: Location,
  calendar: Calendar,
  clock: Clock,
  building: Building,
  elevator: Elevator,
  industry: Industry,
  gallery: Gallery,
  blog: Blog,
  settings: Settings,
  dashboard: Dashboard,
  notification: Notification,
  warning: Warning,
  success: Success,
  info: Info,
  error: ErrorIcon,
  loader: Loader
}

/**
 * Reusable dynamic Icon component.
 * Renders any registered icon by name.
 */
export function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) {
  const IconComponent = IconRegistry[String(name).toLowerCase()]
  if (!IconComponent) {
    console.warn(`Icon "${name}" is not registered in the icon system.`)
    return null
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      aria-label={ariaLabel}
      {...props}
    />
  )
}

export {
  Arrow,
  Chevron,
  Close,
  Menu,
  Search,
  Download,
  Upload,
  User,
  Mail,
  Phone,
  Location,
  Calendar,
  Clock,
  Building,
  Elevator,
  Industry,
  Gallery,
  Blog,
  Settings,
  Dashboard,
  Notification,
  Warning,
  Success,
  Info,
  ErrorIcon,
  Loader
}

export default Icon
