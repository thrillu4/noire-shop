import { LocalWishListItem } from '@/lib/types'

export function getLocalWishList(): LocalWishListItem[] {
  if (typeof window === 'undefined') return []

  try {
    const wishlist = localStorage.getItem('wishlist')
    return wishlist ? JSON.parse(wishlist) : []
  } catch (error) {
    console.log('Error parsing local wish list', error)
    return []
  }
}
