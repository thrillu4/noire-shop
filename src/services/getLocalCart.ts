import { LocalCartItem } from '@/lib/types'

export function getLocalCart(): LocalCartItem[] {
  if (typeof window === 'undefined') return []

  try {
    const cart = localStorage.getItem('local-cart')
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.log('Error parsing local cart', error)
    return []
  }
}
