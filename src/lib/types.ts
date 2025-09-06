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

export const CheckoutFormSchema = z.object({
  fullName: z
    .string()
    .min(3, {
      message: 'Username must be at least 3 characters.',
    })
    .trim(),
  phone: z
    .string()
    .min(1, 'Enter correct number')
    .max(20)
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  country: z.string().min(2, 'Country must be at least 2 characters.'),
  city: z.string().min(2, 'City name must be at least 2 characters.'),
  address: z.string().min(2, 'Country must be at least 2 characters.'),
})

export type CheckoutDatatype = z.infer<typeof CheckoutFormSchema>

//// store

export interface CartItemData {
  id?: number
  productId: number
  quantity: number
  size?: string
  product: {
    id: number
    title: string
    type: string
    price: number
    images: { url: string }[]
  }
}

export interface LocalCartItem {
  productId: number
  quantity: number
  size?: string
}

export interface CartState {
  items: CartItemData[]
  isLoading: boolean
  isAuthenticated: {
    isAuth: boolean
    userId: string | null
  }

  setAuthenticated: (isAuth: boolean, userId: string | null) => void
  addItem: (
    productId: number,
    quantity?: number,
    size?: string,
  ) => Promise<void>
  removeItem: (productId: number, size?: string) => Promise<void>
  updateQuantity: (
    cartItemId: number,
    productId: number,
    quantity: number,
    size?: string,
  ) => Promise<void>
  clearCart: () => Promise<void>
  loadCart: () => Promise<void>
  migrateLocalCart: () => Promise<void>

  totalItems: () => number
  totalPrice: () => string
}

/// checkout

// export interface CheckoutState {}

///

////

export const CardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, { message: '16 digits required' }),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Format MM/YY' }),
  cvv: z.string().regex(/^\d{3}$/, { message: '3 digits' }),
})

export type CardType = z.infer<typeof CardSchema>
