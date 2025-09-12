import { LocalWishListItem } from '@/lib/types'

export function setLocalWishList(wishlist: LocalWishListItem[]) {
  if (typeof window === 'undefined') return []

  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  } catch (error) {
    console.log('Error saving wish list', error)
  }
}
