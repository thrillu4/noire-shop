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

export const ReviewFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 character')
    .regex(/^[a-zA-Z]+$/, 'String must contain only latin letters.'),
  country: z
    .string()
    .min(2, 'Country must be at least 2 character')
    .regex(/^[a-zA-Z]+$/, 'String must contain only latin letters.'),
  rating: z
    .number()
    .min(1, 'Minimal value 1 star')
    .max(5, 'Maximum value 5 star'),
  text: z.string().max(100, 'The review is too long.'),
})

export type ReviewType = z.infer<typeof ReviewFormSchema>

export const ContactUsFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 character')
    .regex(/^[a-zA-Z]+$/, 'String must contain only latin letters.'),
  email: z.email({ message: 'Please enter a valid email.' }).trim(),
  message: z
    .string()
    .max(1000, 'The message is too long.')
    .min(5, 'The message is too short'),
  checkbox: z.boolean().refine(v => v, 'You must accept terms.'),
})

export type ContactUsType = z.infer<typeof ContactUsFormSchema>

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

export const CardSchema = z.discriminatedUnion('paymentMethod', [
  z.object({
    paymentMethod: z.literal('card'),
    cardNumber: z.string().min(16, 'Card number is required'),
    expiry: z.string().min(5, 'Expiry date is required'),
    cvv: z.string().min(3, 'CVV is required'),
    checkbox: z.boolean().refine(v => v, 'You must accept terms'),
  }),
  z.object({
    paymentMethod: z.literal('delivery'),
    checkbox: z.boolean().refine(v => v, 'You must accept terms'),
  }),
])

export type CardType = z.infer<typeof CardSchema>

export const ProfileEditSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.email({ message: 'Please enter a valid email.' }).trim(),
})

export type ProfileEditType = z.infer<typeof ProfileEditSchema>

export const PasswordEditSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, {
        message: 'Current password must be at least 6 characters long.',
      })
      .trim(),
    newPassword: z
      .string()
      .min(6, { message: 'New password must be at least 6 characters long.' })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type PasswordEditType = z.infer<typeof PasswordEditSchema>

// store
export interface ProductWithRelations extends Product {
  images: { id: number; url: string }[]
  variants: { id: number; size: string; stock: number }[]
}

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

export interface OrderItemData {
  id: string
  total: number
  status: string
  createdAt: Date
  updatedAt: Date
  paymentMethod: string
  userId?: string | null
  fullName: string
  phone: string
  country: string
  city: string
  address: string
}

export interface OrderState {
  orders: OrderItemData[]
  isLoading: boolean
  currentOrder: OrderItemData | null
  setCurrentOrder: (data: OrderItemData) => void
}

export interface UserData {
  id: string
  email: string
  password: string
  name: string
}

export interface UserProfileState {
  currentUser: UserData | null
  isLoading: boolean
  setCurrentUser: (data: UserData) => void
  getUser: () => Promise<void | UserData>
}

export interface WishListItem {
  id?: number
  productId: number
  product: {
    id: number
    title: string
    type: string
    price: number
    variants: { size: string }[]
    images: { url: string }[]
  }
}

export interface LocalWishListItem {
  productId: number
}

export interface WishListState {
  items: WishListItem[]
  isLoading: boolean
  isAuthenticated: string | null
  setAuthenticated: (userId: string | null) => void
  addWishItem: (productId: number) => Promise<void>
  removeWishItem: (productId: number) => Promise<void>
  loadWishList: () => Promise<void>
  migrateLocalWishList: () => Promise<void>
  totalItems: () => number
}

export interface FilterSettings {
  gender: 'all' | 'male' | 'female'
  types: string[]
  priceRange: number[]
  collections: string[]
  sizes: string[]
  available: 'all' | 'available' | 'unavailable'
}

export interface FilterState {
  filter: FilterSettings
  totalProducts: number
  setFilterSettings: (values: FilterSettings) => void
  setTotalProducts: (total: number) => void
  clearFilter: () => void
}

export interface FilteredProduct {
  id: number
  gender: string
  type: string
  title: string
  description: string
  price: number
  collection: string | null
  images: { url: string }[]
  variants: { size: string; stock: number }[]
}

export interface ProductType {
  type: string
  count: number
}
