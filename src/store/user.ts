import { UserProfileState } from '@/lib/types'
import { ROUTES } from '@/routes'
import { create } from 'zustand'

export const useUserState = create<UserProfileState>((set, get) => ({
  currentUser: null,
  isLoading: false,
  setCurrentUser: data => {
    set({ currentUser: data })
  },
  getUser: async () => {
    set({ isLoading: true })
    try {
      const { currentUser } = get()
      if (currentUser) {
        return currentUser
      } else {
        const response = await fetch(ROUTES.GET_USER)

        if (!response.ok) throw new Error('User not found!')
        const user = await response.json()
        set({
          currentUser: {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            password: user.user.password,
          },
        })
      }
    } catch (error) {
      console.log('Error with getting user', error)
    } finally {
      set({ isLoading: false })
    }
  },
}))
