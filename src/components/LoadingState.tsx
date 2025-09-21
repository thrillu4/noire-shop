'use client'

import { useCartStore } from '@/store/cart'
import { useWishListState } from '@/store/wishlist'
import LoadingSkeletonSpinner from './Skeletons/LoadingSkeletonSpinner'

const LoadingState = () => {
  const { isLoading } = useCartStore()
  const wishlist = useWishListState()

  if (isLoading || wishlist.isLoading) return <LoadingSkeletonSpinner />
}

export default LoadingState
