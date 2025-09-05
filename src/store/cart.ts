import { CartState } from '@/lib/types'
import { ROUTES } from '@/routes'
import { getLocalCart } from '@/services/getLocalCart'
import { setLocalCart } from '@/services/setLocalCart'
import { create } from 'zustand'

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,
  isAuthenticated: null,
  setAuthenticated: auth => {
    const prevAuth = get().isAuthenticated
    set({ isAuthenticated: auth })

    if (!prevAuth && auth) {
      get().migrateLocalCart()
    }
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
        const existingItemIndex = localCart.findIndex(
          item => item.productId === productId,
        )

        if (existingItemIndex !== -1) {
          localCart[existingItemIndex].quantity += quantity
        } else {
          localCart.push({
            productId,
            quantity,
            size,
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
  removeItem: async (productId, size?) => {
    set({ isLoading: true })

    try {
      const { isAuthenticated } = get()

      if (isAuthenticated) {
        const response = await fetch(ROUTES.DELETE_CART_ITEM, {
          method: 'DELETE',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ productId, size }),
        })

        if (!response.ok) throw new Error('Failed to delete product')
        const updatedCart = await response.json()
        set({ items: updatedCart.items })
      } else {
        const localCart = getLocalCart()
        const filteredCart = localCart.filter(
          item => item.productId !== productId,
        )
        setLocalCart(filteredCart)
        await get().loadCart()
      }
    } catch (error) {
      console.log('Error with remove item', error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  },
  updateQuantity: async (cartItemId, productId, quantity, size?) => {
    if (quantity <= 0) {
      return get().removeItem(productId, size)
    }

    set({ isLoading: true })

    try {
      const { isAuthenticated } = get()

      if (isAuthenticated) {
        const response = await fetch(ROUTES.PATCH_CART_QUANT, {
          method: 'PATCH',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ cartItemId, productId, quantity, size }),
        })
        if (!response.ok) throw new Error('Failed to update quantity')

        const updatedCart = await response.json()
        set({ items: updatedCart.items })
      } else {
      }
    } catch (error) {
      console.log('Error with updating quantity', error)
    } finally {
      set({ isLoading: false })
    }
  },
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
  migrateLocalCart: async () => {
    const localCart = getLocalCart()

    if (localCart.length === 0) return

    set({ isLoading: true })

    try {
      const response = await fetch(ROUTES.POST_CART_MIGRATE, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ items: localCart }),
      })

      if (!response.ok) throw new Error('Failed to migrate local cart')

      setLocalCart([])
      await get().loadCart()
    } catch (error) {
      console.log('Error migrating local cart', error)
    } finally {
      set({ isLoading: false })
    }
  },
  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },
  totalPrice: () => {
    return get()
      .items.reduce((total, item) => {
        return total + (item.product.price || 0) * item.quantity
      }, 0)
      .toFixed(2)
  },
}))
