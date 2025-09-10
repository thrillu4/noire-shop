'use server'

import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import bcrypt from 'bcrypt'

export async function updatePassword({
  currentPassword,
  newPassword,
  confirmPassword,
}: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}) {
  if (!currentPassword) throw new Error('Old password is required')
  if (!newPassword) throw new Error('New password is required')
  if (newPassword !== confirmPassword) throw new Error('Passwords do not match')
  if (currentPassword === newPassword)
    return {
      success: false,
      error: 'The new password must not match the current password.',
    }

  const session = await verifySession()

  if (!session.userId) throw new Error('Unauthorized')

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  })

  if (!user) throw new Error('User not found!')

  const decryptedPassword = await bcrypt.compare(currentPassword, user.password)

  if (!decryptedPassword)
    return { success: false, error: 'Incorrect current password' }

  const hashPassword = await bcrypt.hash(newPassword, 10)

  const updatedUserPassword = await prisma.user.update({
    where: { id: session.userId },
    data: {
      password: hashPassword,
    },
  })

  if (!updatePassword) throw new Error('Failed to update password')

  return { success: true, user: updatedUserPassword }
}
