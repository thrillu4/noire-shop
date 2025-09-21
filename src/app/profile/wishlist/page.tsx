'use client'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import LoadingSkeletonSpinner from '@/components/Skeletons/LoadingSkeletonSpinner'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/routes'
import { useCartStore } from '@/store/cart'
import { useWishListState } from '@/store/wishlist'
import { Heart, HeartOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

const WishList = () => {
  const { items, removeWishItem, isLoading } = useWishListState()
  const cart = useCartStore()

  return (
    <div className="min-h-screen px-3">
      <Breadcrumbs />
      {!isLoading && items.length === 0 && (
        <div className="mt-20 flex flex-col gap-1 text-center">
          <div className="flex flex-col items-center gap-7">
            <div>
              <Heart size={60} className="font-bold" />
            </div>
            <div>
              <div className="font-bold">Your Wish List is currently empty</div>
              <div className="mt-3 text-xs opacity-60">
                Add all your favorites to this Wish List
              </div>
            </div>
          </div>
          <Link
            href={ROUTES.NEW}
            className="mt-10 text-center underline opacity-60"
          >
            Shop What&apos;s New
          </Link>
        </div>
      )}
      {items.length > 0 && (
        <div>
          <h1 className="mt-3 text-2xl font-extrabold">Your Wish List</h1>
          <div className="mt-6 mb-20 grid grid-cols-2 gap-x-3 gap-y-5">
            {isLoading || (cart.isLoading && <LoadingSkeletonSpinner />)}
            {items.map(item => (
              <div key={item.productId}>
                <div className="relative h-60 w-full">
                  <Image
                    src={item.product.images[0].url}
                    alt="product"
                    fill
                    className="object-contain"
                  />
                  <HeartOff
                    size={24}
                    className="absolute top-1 right-1 rounded-2xl bg-white p-1"
                    onClick={() => {
                      removeWishItem(item.productId)
                      toast.message('Product removed from your wishlist!')
                    }}
                  />
                </div>
                <div className="mt-1 space-y-3 text-sm">
                  <div className="font-bold">{item.product.title}</div>
                  <div className="opacity-65">
                    {item.product.type.toUpperCase()}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Size: {item.product.variants[0].size}</div>
                    <div>${item.product.price}</div>{' '}
                  </div>
                  <Button
                    onClick={() => {
                      cart.addItem(
                        item.productId,
                        1,
                        item.product.variants[0].size,
                      )
                      toast.success('Product added to shopping bag!')
                    }}
                    className="w-full"
                  >
                    {cart.isLoading ? 'Adding...' : 'Add to Bag'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default WishList
