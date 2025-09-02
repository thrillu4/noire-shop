import { LocalCartItem } from '@/lib/types'

export function setLocalCart(cart: LocalCartItem[]): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem('local-cart', JSON.stringify(cart))
  } catch (error) {
    console.log('Error saving local cart', error)
  }
}
