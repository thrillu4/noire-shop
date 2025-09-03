'use server'
import prisma from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/sessions'
import { SignInFormSchema, SignupFormSchema } from '@/lib/types'
import { ROUTES } from '@/routes'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

export type FormState = {
  success?: boolean
  errors?: Record<string, string>
  fields?: Record<string, string>
}

export async function signup(prevState: FormState, formData: FormData) {
  const parsed = SignupFormSchema.safeParse({
    name: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    checkbox: formData.get('checkbox') === 'on',
  })

  const fields = Object.fromEntries(formData) as Record<string, string>

  if (!parsed.success) {
    const errors: Record<string, string> = {}
    parsed.error.issues.forEach(issue => {
      const field = issue.path[0] as string
      errors[field] = issue.message
    })
    return { success: false, errors, fields }
  }

  const { name, email, password } = parsed.data

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      success: false,
      errors: { server: 'User with this email address already exist!' },
      fields,
    }
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashPassword,
      name,
    },
  })

  if (!user) {
    return {
      success: false,
      errors: { server: 'An error occurred while creating your account.' },
      fields,
    }
  }

  await createSession(user.id)
  redirect(ROUTES.HOME)
}

export async function signin(prevState: FormState, formData: FormData) {
  const parsed = SignInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  const fields = Object.fromEntries(formData) as Record<string, string>

  if (!parsed.success) {
    const errors: Record<string, string> = {}
    parsed.error.issues.forEach(issue => {
      const field = issue.path[0] as string
      errors[field] = issue.message
    })
    return { success: false, errors, fields }
  }

  const { email, password } = parsed.data

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return {
      success: false,
      errors: { server: 'Invalid credentials!' },
      fields,
    }
  }

  const decryptedPassword = await bcrypt.compare(password, user.password)

  if (!decryptedPassword) {
    return {
      success: false,
      errors: { server: 'Invalid credentials!' },
      fields,
    }
  }

  await createSession(user.id)
  redirect(ROUTES.HOME)
}

export async function logout() {
  await deleteSession()
  redirect(ROUTES.HOME)
}
