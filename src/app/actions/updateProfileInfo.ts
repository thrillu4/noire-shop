'use server'
import prisma from '@/lib/prisma'
import { UserData } from '@/lib/types'

export async function updateProfileInfo(
  userData: UserData | null,
  values: {
    name: string
    email: string
  },
) {
  if (!userData?.id) throw new Error('User not found')
  if (!values) throw new Error('Values are required')

  const updatedUser = await prisma.user.update({
    where: { id: userData.id },
    data: {
      email: values.email,
      name: values.name,
    },
  })

  if (!updatedUser) throw new Error('Failed to update user information')

  return updatedUser
}
