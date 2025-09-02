import { z } from 'zod'
import { Product } from '../../prisma/generated/prisma'

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Be at least 6 characters long' })
    .trim(),
  checkbox: z.literal(true, {
    error: () => ({
      message: 'You must accept Terms & Conditions and Privacy Policy',
    }),
  }),
})
export type SignUpType = z.infer<typeof SignupFormSchema>

export const SignInFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Be at least 6 characters long' })
    .trim(),
})
export type SignInType = z.infer<typeof SignInFormSchema>

export type SessionPayload = {
  userId: string | number
  expiresAt: Date
}

export interface ProductWithRelations extends Product {
  images: { id: number; url: string }[]
  variants: { id: number; size: string; stock: number }[]
}

//// store

export interface CartItemData {
  id?: number
  productId: number
  quantity: number
  size?: string
  product?: {
    id: number
    title: string
    price: number
    images: { url: string }[]
  }
}

export interface LocalCartItem {
  productId: number
  quantity: number
  size?: string
  addedAt: string
}

export interface CartState {
  items: CartItemData[]
  isLoading: boolean
  isAuthenticated: boolean | null

  setAuthenticated: (auth: boolean, userId: string | null) => void
  addItem: (
    productId: number,
    quantity?: number,
    size?: string,
  ) => Promise<void>
  removeItem: (productId: number, size?: string) => Promise<void>
  updateQuantity: (
    productId: number,
    quantity: number,
    size?: string,
  ) => Promise<void>
  clearCart: () => Promise<void>
  loadCart: () => Promise<void>
  migrateLocalCart: () => Promise<void>

  totalItems: () => number
  totalPrice: () => number
  getItemKey: (productId: number, size?: string) => string
}

////
