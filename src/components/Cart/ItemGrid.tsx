import { CartItemData } from '@/lib/types'
import { ROUTES } from '@/routes'
import { useCartStore } from '@/store/cart'
import { useWishListState } from '@/store/wishlist'
import { Heart, Minus, Plus, RefreshCcw, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import LoadingSkeletonSpinner from '../Skeletons/LoadingSkeletonSpinner'

const ItemGrid = ({ cartItem }: { cartItem: CartItemData }) => {
  const { updateQuantity, removeItem } = useCartStore()
  const { addWishItem, items, removeWishItem, isLoading } = useWishListState()
  const inWishList = items.find(item => item.productId === cartItem.product.id)
  const handleToggleWishList = () => {
    if (inWishList) {
      removeWishItem(cartItem.product.id)
      toast.message(`${cartItem.product.title} removed from wish list`)
    } else {
      addWishItem(cartItem.product.id)
      toast.success(`${cartItem.product.title} added to wish list`)
    }
  }
  return (
    <>
      {isLoading && <LoadingSkeletonSpinner />}
      <div
        className="my-10 grid grid-cols-[1fr_auto] gap-3.5 text-sm"
        key={cartItem.productId}
      >
        <div className="flex w-full flex-col">
          <div className="relative min-w-[235px]">
            <Image
              src={cartItem.product.images[0].url}
              alt="product image"
              width={265}
              height={314}
            />
            <Heart
              size={29}
              fill={inWishList ? 'red' : 'none'}
              color={inWishList ? 'red' : 'black'}
              className="absolute top-1 left-1 rounded-2xl bg-white p-1"
              onClick={handleToggleWishList}
            />
          </div>
          <div className="mt-2.5 mb-1 text-xs">
            {cartItem.product.type.toUpperCase()}
          </div>
          <div className="flex items-center justify-between font-bold">
            <Link
              href={`${ROUTES.PRODUCTS}/${cartItem.product.title}?productId=${cartItem.product.id}`}
            >
              {cartItem.product.title}
            </Link>
            <div>${cartItem.product.price}</div>
          </div>
        </div>
        <div className="flex w-7 flex-col items-center text-lg">
          <X onClick={() => removeItem(cartItem.productId, cartItem.size)} />
          <div className="mt-10 font-bold">{cartItem.size}</div>
          <div className="my-6 flex flex-col items-center border border-zinc-500">
            <Plus
              onClick={() =>
                updateQuantity(
                  cartItem.id!,
                  cartItem.productId,
                  cartItem.quantity + 1,
                  cartItem.size,
                )
              }
            />
            <div className="w-full border-t border-b border-zinc-500 text-center font-bold">
              {cartItem.quantity}
            </div>
            <Minus
              onClick={() =>
                updateQuantity(
                  cartItem.id!,
                  cartItem.productId,
                  cartItem.quantity - 1,
                  cartItem.size,
                )
              }
            />
          </div>
          <RefreshCcw
            onClick={() =>
              updateQuantity(cartItem.id!, cartItem.productId, 1, cartItem.size)
            }
          />
        </div>
      </div>
    </>
  )
}

export default ItemGrid
