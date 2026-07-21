/**
 * Project-specific Dashboard layout helper.
 */

export function calculateDashboardStats(inquiries = [], subscribers = [], productsCount = 0) {
  const totalLeads = inquiries.length
  const newLeads = inquiries.filter(i => i.status === 'New').length
  const activeSubs = subscribers.filter(s => s.isActive).length

  return [
    { label: 'Total Inquiries', value: totalLeads, change: '+12%', type: 'leads' },
    { label: 'New Leads', value: newLeads, change: 'Action required', type: 'pending' },
    { label: 'Active Subscribers', value: activeSubs, change: '+4.5%', type: 'subscribers' },
    { label: 'Active Catalog Systems', value: productsCount, change: 'All active', type: 'catalog' }
  ]
}

export function buildChartData(inquiries = []) {
  // Groups inquiries by day of week or month for administrative UI rendering
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const counts = Array(7).fill(0)

  inquiries.forEach(i => {
    if (i.createdAt) {
      const d = new Date(i.createdAt).getDay()
      counts[d]++
    }
  })

  return days.map((day, index) => ({
    label: day,
    value: counts[index]
  }))
}

export default {
  calculateDashboardStats,
  buildChartData
}
