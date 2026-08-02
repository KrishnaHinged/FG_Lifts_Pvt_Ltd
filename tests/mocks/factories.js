/**
 * Test Mock Factories
 * FG Lift Pvt. Ltd.
 */

export const mockProduct = {
  _id: 'prod_123',
  name: 'Velox Passenger Elevator',
  slug: 'velox-passenger-elevator',
  category: 'Passenger',
  tabGroup: 'Passenger Elevators',
  isActive: true,
  has360View: true
}

export const mockInquiry = {
  _id: 'inq_123',
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+91-9876543210',
  elevatorType: 'Passenger',
  status: 'New',
  createdAt: new Date().toISOString()
}

export const mockAdminUser = {
  id: 'admin_123',
  name: 'Super Administrator',
  email: 'admin@fglifts.com',
  role: 'SUPER_ADMIN'
}
