import { CartState } from '@/lib/types'
import { ROUTES } from '@/routes'
import { getLocalCart } from '@/services/getLocalCart'
import { setLocalCart } from '@/services/setLocalCart'
import { create } from 'zustand'

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,
  isAuthenticated: null,
  setAuthenticated: (auth, userId) => {
    const prevAuth = get().isAuthenticated
    set({ isAuthenticated: auth })

    // migration TODO!!!!!!!!!!!
  },
  getItemKey: (productId, size?) => {
    return size ? `${productId}-${size}` : `${productId}`
  },
  addItem: async (productId, quantity = 1, size?) => {
    set({ isLoading: true })

    try {
      const { isAuthenticated } = get()

      if (isAuthenticated) {
        const response = await fetch(ROUTES.POST_CART_ADD, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ productId, quantity, size }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Failed to add item')
        }

        const data = await response.json()
        set({ items: data.items })
      } else {
        const localCart = getLocalCart()
        const itemKey = get().getItemKey(productId, size)
        const existingItemIndex = localCart.findIndex(
          item => get().getItemKey(item.productId, item.size) === itemKey,
        )

        if (existingItemIndex !== -1) {
          localCart[existingItemIndex].quantity += quantity
        } else {
          localCart.push({
            productId,
            quantity,
            size,
            addedAt: new Date().toISOString(),
          })
        }
        setLocalCart(localCart)
        await get().loadCart()
      }
    } catch (error) {
      console.log('Error adding item to cart', error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  },
  removeItem: async (productId, size?) => {},
  updateQuantity: async (productId, quantity = 1, size?) => {},
  clearCart: async () => {},
  loadCart: async () => {
    set({ isLoading: true })
    try {
      const { isAuthenticated } = get()

      if (isAuthenticated) {
        const response = await fetch(ROUTES.GET_CART)
        if (!response.ok) throw new Error('Failed to load cart')
        const data = await response.json()
        set({ items: data.items })
      } else {
        const localCart = getLocalCart()

        if (localCart.length > 0) {
          const productIds = localCart.map(item => item.productId)
          const response = await fetch(ROUTES.POST_LOCAL_CART, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productIds }),
          })

          if (response.ok) {
            const products = await response.json()

            const itemsWithProducts = localCart
              .map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                size: item.size,
                product: products.find(
                  (pr: { id: number }) => pr.id === item.productId,
                ),
              }))
              .filter(item => item.product)

            set({ items: itemsWithProducts })
          } else {
            set({ items: [] })
          }
        } else {
          set({ items: [] })
        }
      }
    } catch (error) {
      console.log('Error loading cart', error)
      set({ items: [] })
    } finally {
      set({ isLoading: false })
    }
  },
  migrateLocalCart: async () => {},
  totalItems: () => {},
  totalPrice: () => {},
}))
