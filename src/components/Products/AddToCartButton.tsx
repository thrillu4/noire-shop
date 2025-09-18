'use client'

import { useCartStore } from '@/store/cart'
import { Button } from '../ui/button'

interface IProps {
  productId: number
  quantity: number
  size?: string
}

export function AddToCartButton({ productId, quantity, size }: IProps) {
  const { addItem, isLoading } = useCartStore()
  return (
    <Button
      disabled={isLoading}
      onClick={() => addItem(productId, quantity, size)}
      className="w-full rounded bg-black px-4 py-2 text-white"
    >
      {isLoading ? 'Loading...' : 'Add to Cart'}
    </Button>
  )
}
