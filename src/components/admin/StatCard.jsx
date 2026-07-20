import {
  Inbox,
  Sparkles,
  Boxes,
  Users,
  BookOpen,
  Mail,
  CheckCircle,
  XCircle
} from 'lucide-react'

const iconsMap = {
  inbox: Inbox,
  sparkles: Sparkles,
  boxes: Boxes,
  users: Users,
  bookOpen: BookOpen,
  mail: Mail,
  checkCircle: CheckCircle,
  xCircle: XCircle
}

export default function StatCard({ title, value, iconName, trend, color = 'blue' }) {
  const Icon = iconsMap[iconName] || Inbox

  // Get tailwind classes based on color parameter
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
          icon: 'text-emerald-600',
        }
      case 'amber':
        return {
          bg: 'bg-amber-50 text-amber-600 border-amber-100',
          icon: 'text-amber-600',
        }
      case 'red':
        return {
          bg: 'bg-red-50 text-red-600 border-red-100',
          icon: 'text-red-600',
        }
      case 'blue':
      default:
        return {
          bg: 'bg-blue-50 text-blue-600 border-blue-100',
          icon: 'text-blue-600',
        }
    }
  }

  const styles = getColorClasses()

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-start justify-between select-none">
      <div className="space-y-2">
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {title}
        </h4>
        <div className="text-3xl font-bold font-sans text-gray-900 leading-tight">
          {value}
        </div>
        {trend && (
          <div className="text-xs font-mono">
            {trend.startsWith('↑') ? (
              <span className="text-emerald-600 font-semibold">{trend}</span>
            ) : trend.startsWith('↓') ? (
              <span className="text-red-600 font-semibold">{trend}</span>
            ) : (
              <span className="text-gray-500">{trend}</span>
            )}
          </div>
        )}
      </div>

      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${styles.bg}`}>
        <Icon className={`w-5 h-5 ${styles.icon}`} />
      </div>
    </div>
  )
}
