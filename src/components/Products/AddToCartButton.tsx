'use client'

import { useCartStore } from '@/store/store'

interface IProps {
  productId: number
  quantity: number
  size?: string
}

export function AddToCartButton({ productId, quantity, size }: IProps) {
  const { addItem, isLoading } = useCartStore()
  return (
    <button
      disabled={isLoading}
      onClick={() => addItem(productId, quantity, size)}
      className="rounded bg-black px-4 py-2 text-white"
    >
      {isLoading ? 'Loading...' : 'Add to cart'}
    </button>
  )
}
