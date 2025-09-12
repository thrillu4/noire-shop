'use client'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ROUTES } from '@/routes'
import { useCartStore } from '@/store/cart'
import { useWishListState } from '@/store/wishlist'
import { BaggageClaim, Heart, HeartOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '../ui/button'

const WishListDrawer = ({
  open,
  userId,
  setIsOpen,
}: {
  open?: boolean
  userId: string | null
  setIsOpen?: (open: boolean) => void
}) => {
  const { items, setAuthenticated, loadWishList, totalItems, removeWishItem } =
    useWishListState()
  const { addItem } = useCartStore()

  useEffect(() => {
    setAuthenticated(userId)
    loadWishList()
  }, [loadWishList, setAuthenticated, userId])

  if (!open) return null
  return (
    <Sheet>
      <SheetTrigger>
        <div className="rounded-full border bg-black p-2">
          <Heart className="h-auto w-4 text-white" />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto px-1 pt-10 pb-5">
        {items.length === 0 && (
          <div className="flex flex-col gap-1 text-center">
            <SheetHeader className="flex flex-col items-center gap-7">
              <div>
                <Heart />
              </div>
              <SheetTitle>
                <div>Your Wish List is currently empty</div>
                <div className="mt-3 text-xs opacity-60">
                  Add all your favorites to this Wish List
                </div>
              </SheetTitle>
            </SheetHeader>
            <Link
              href={ROUTES.NEW}
              onClick={() => setIsOpen && setIsOpen(false)}
              className="text-center underline opacity-60"
            >
              Shop What&apos;s New
            </Link>
          </div>
        )}
        {items.length > 0 && (
          <SheetHeader className="flex flex-col items-center gap-7">
            <SheetTitle>Wish List ({totalItems()})</SheetTitle>
            <div className="mt-3 space-y-5">
              {items.map(item => (
                <div
                  key={item.productId}
                  className="flex justify-between gap-3"
                >
                  <div className="relative">
                    <Image
                      src={item.product.images[0].url}
                      alt="product"
                      width={170}
                      height={100}
                    />
                    <HeartOff
                      size={24}
                      className="absolute top-1 left-1 rounded-2xl bg-white p-1"
                      onClick={() => removeWishItem(item.productId)}
                    />
                  </div>
                  <div className="flex flex-col justify-between text-xs">
                    <div className="font-bold">{item.product.title}</div>
                    <div className="flex items-center justify-between">
                      <div className="opacity-60">
                        {item.product.type.toUpperCase()}
                      </div>
                      <div className="font-bold">${item.product.price}</div>
                    </div>

                    <Button
                      onClick={() =>
                        addItem(
                          item.productId,
                          1,
                          item.product.variants[0].size,
                        )
                      }
                      variant="outline"
                      className="w-full text-xs"
                    >
                      <BaggageClaim /> Add to Bag
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setIsOpen && setIsOpen(false)}
              className="mx-auto"
            >
              <Link href={ROUTES.WISHLIST}>View Wish List</Link>
            </Button>
          </SheetHeader>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default WishListDrawer
