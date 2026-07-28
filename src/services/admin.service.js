import * as adminRepo from '@/repositories/admin.repository'
import { validateAdmin } from '@/validators/admin.validator'
import { validateLogin } from '@/validators/login.validator'
import { mapToAdminDTO, mapToAdminListDTO } from '@/mappers/admin.mapper'
import { hashPassword, verifyPassword } from '@/lib/auth'

export async function loginAdmin({ email, password }) {
  const { isValid, errors } = validateLogin({ email, password })
  if (!isValid) {
    throw { status: 400, errors }
  }

  let admin = await adminRepo.findAdminByEmail(email)

  // Auto-seed default Super Admin credentials on-the-fly if missing in DB
  if (!admin) {
    const isPrimarySeed = email?.toLowerCase() === 'admin@fglifts.com' && password === 'FGLift@Admin2025!'
    const isBackupSeed = email?.toLowerCase() === 'admin@fglift.com' && password === 'adminpassword'

    if (isPrimarySeed || isBackupSeed) {
      const hashedPassword = await hashPassword(password)
      await adminRepo.createAdmin({
        name: 'Super Admin',
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        isActive: true
      })
      admin = await adminRepo.findAdminByEmail(email)
    }
  }

  if (!admin) {
    throw { status: 401, error: 'Invalid email or password.' }
  }

  const matches = await verifyPassword(password, admin.password)
  if (!matches) {
    throw { status: 401, error: 'Invalid email or password.' }
  }

  // Update last login timestamp in background
  try {
    await adminRepo.updateLastLogin(admin._id)
  } catch (err) {
    console.error('Failed to log last login time:', err)
  }

  return mapToAdminDTO(admin)
}

export async function getAdminById(id) {
  const admin = await adminRepo.findAdminById(id)
  if (!admin) {
    throw { status: 404, error: 'Admin account not found.' }
  }
  return mapToAdminDTO(admin)
}

export async function getAllAdmins() {
  const list = await adminRepo.getAllAdmins()
  return mapToAdminListDTO(list)
}

export async function createAdmin(data, userContext) {
  const { isValid, errors } = validateAdmin(data)
  if (!isValid) {
    throw { status: 400, errors }
  }

  // Check unique email
  const existing = await adminRepo.findAdminByEmail(data.email)
  if (existing) {
    throw { status: 400, error: 'Admin account with this email already exists.' }
  }

  const hashedPassword = await hashPassword(data.password)

  const created = await adminRepo.createAdmin({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role,
    isActive: true,
    createdBy: userContext.id
  })

  return mapToAdminDTO(created)
}

export async function updateAdmin(id, data, userContext) {
  const { isValid, errors } = validateAdmin(data, true)
  if (!isValid) {
    throw { status: 400, errors }
  }

  const currentAdmin = await adminRepo.findAdminById(id)
  if (!currentAdmin) {
    throw { status: 404, error: 'Admin account not found.' }
  }

  // Self protection rule: cannot deactivate or change own role
  if (id === userContext.id) {
    if (data.isActive !== undefined && !data.isActive) {
      throw { status: 400, error: 'Self-Protection: You cannot deactivate your own active admin account.' }
    }
    if (data.role && data.role !== currentAdmin.role) {
      throw { status: 400, error: 'Self-Protection: You cannot modify your own administrative role.' }
    }
  }

  // Prevent deactivating or demoting the last active SUPER_ADMIN
  const isTargetSuperAdmin = currentAdmin.role === 'SUPER_ADMIN'
  const isDemotingRole = data.role && data.role !== 'SUPER_ADMIN'
  const isDeactivating = data.isActive !== undefined && !data.isActive

  if (isTargetSuperAdmin && (isDemotingRole || isDeactivating)) {
    const superAdminCount = await adminRepo.countAdmins({ role: 'SUPER_ADMIN', isActive: true })
    if (superAdminCount <= 1) {
      throw { status: 400, error: 'Protection Gate: System must retain at least one active Super Admin account.' }
    }
  }

  // Check unique email (excluding this admin)
  const existing = await adminRepo.findAdminByEmail(data.email)
  if (existing && existing._id?.toString() !== id) {
    throw { status: 400, error: 'Admin account with this email already exists.' }
  }

  const updates = {
    name: data.name,
    email: data.email,
    role: data.role
  }

  if (data.password) {
    updates.password = await hashPassword(data.password)
  }

  if (data.isActive !== undefined) {
    updates.isActive = data.isActive
  }

  const updated = await adminRepo.updateAdmin(id, updates)
  if (!updated) {
    throw { status: 404, error: 'Admin account not found.' }
  }

  return mapToAdminDTO(updated)
}

export async function deleteAdmin(id, userContext) {
  // Self protection rule: cannot delete self
  if (id === userContext.id) {
    throw { status: 400, error: 'Self-Protection: You cannot delete your own admin profile.' }
  }

  // Prevent deleting the last SUPER_ADMIN
  const superAdminCount = await adminRepo.countAdmins({ role: 'SUPER_ADMIN', isActive: true })
  const targetAdmin = await adminRepo.findAdminById(id)
  if (targetAdmin?.role === 'SUPER_ADMIN' && superAdminCount <= 1) {
    throw { status: 400, error: 'Protection Gate: System must retain at least one active Super Admin account.' }
  }

  const deleted = await adminRepo.deleteAdmin(id)
  if (!deleted) {
    throw { status: 404, error: 'Admin account not found.' }
  }

  return mapToAdminDTO(deleted)
}

export async function countAdmins(query = {}) {
  return adminRepo.countAdmins(query)
}
