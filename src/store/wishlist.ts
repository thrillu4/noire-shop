import { WishListState } from '@/lib/types'
import { ROUTES } from '@/routes'
import { getLocalWishList } from '@/services/getLocalWishList'
import { setLocalWishList } from '@/services/setLocalWishList'
import { create } from 'zustand'

export const useWishListState = create<WishListState>((set, get) => ({
  items: [],
  isLoading: false,
  isAuthenticated: null,
  setAuthenticated: userId => {
    const prevAuth = get().isAuthenticated
    set({ isAuthenticated: userId })

    if (!prevAuth && userId) {
      get().migrateLocalWishList()
    }
  },
  addWishItem: async productId => {
    set({ isLoading: true })
    try {
      const { isAuthenticated } = get()
      if (isAuthenticated) {
        const response = await fetch(ROUTES.POST_WISHLIST_ADD, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ productId }),
        })
        if (!response.ok) throw new Error('Failed to add product to wish list')

        const data = await response.json()
        set({ items: data.items })
      } else {
        const localWishList = getLocalWishList()
        const existingItem = localWishList.find(
          item => item.productId === productId,
        )
        if (existingItem) throw new Error('Item already in your wish list')
        localWishList.push({ productId })
        setLocalWishList(localWishList)
        await get().loadWishList()
      }
    } catch (error) {
      console.log('Failed to add product to wish list', error)
    } finally {
      set({ isLoading: false })
    }
  },
  removeWishItem: async productId => {
    set({ isLoading: true })
    try {
      const { isAuthenticated } = get()
      if (isAuthenticated) {
        const response = await fetch(ROUTES.DELETE_WISHLIST_ITEM, {
          method: 'DELETE',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ productId }),
        })

        if (!response.ok)
          throw new Error('Failed to remove product from wish list')

        const data = await response.json()
        set({ items: data.items })
      } else {
        const localWishList = getLocalWishList()

        const filteredWishList = localWishList.filter(
          item => item.productId !== productId,
        )
        setLocalWishList(filteredWishList)
        await get().loadWishList()
      }
    } catch (error) {
      console.log('Error to remove product from wish list', error)
    } finally {
      set({ isLoading: false })
    }
  },
  loadWishList: async () => {
    set({ isLoading: true })
    try {
      const { isAuthenticated } = get()
      if (isAuthenticated) {
        const response = await fetch(ROUTES.GET_WISHLIST)
        if (!response.ok) throw new Error('Failed to load wish list')

        const data = await response.json()
        set({ items: data.items })
      } else {
        const localWishList = getLocalWishList()

        if (localWishList.length > 0) {
          const productIds = localWishList.map(item => item.productId)
          const response = await fetch(ROUTES.POST_LOCAL_WISHLIST, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ productIds }),
          })

          if (!response.ok) {
            set({ items: [] })
            throw new Error('Failed load local wishlist')
          }

          const data = await response.json()

          const wishListItems = localWishList
            .map(item => ({
              productId: item.productId,
              product: data.find(
                (pr: { id: number }) => pr.id === item.productId,
              ),
            }))
            .filter(item => item.product)
          set({ items: wishListItems })
        } else {
          set({ items: [] })
        }
      }
    } catch (error) {
      console.log('Failed to load wish list', error)
    } finally {
      set({ isLoading: false })
    }
  },
  migrateLocalWishList: async () => {
    const localWishList = getLocalWishList()

    if (localWishList.length === 0) return

    set({ isLoading: true })

    try {
      const response = await fetch(ROUTES.POST_WISHLIST_MIGRATE, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ items: localWishList }),
      })
      if (!response.ok) throw new Error('Failed to migrate local wish list')

      setLocalWishList([])
      await get().loadWishList()
    } catch (error) {
      console.log('Error migrating local wish list', error)
    } finally {
      set({ isLoading: false })
    }
  },
  totalItems: () => get().items.length,
}))
