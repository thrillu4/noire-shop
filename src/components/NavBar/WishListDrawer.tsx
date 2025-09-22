'use client'
import {
  Sheet,
  SheetClose,
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
import { toast } from 'sonner'
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
  const cart = useCartStore()
  useEffect(() => {
    setAuthenticated(userId)
    loadWishList()
  }, [loadWishList, setAuthenticated, userId])

  if (!open) return null
  return (
    <Sheet>
      <SheetTrigger>
        <div className="group flex items-center">
          <span className="hidden cursor-pointer rounded-full border-4 border-black bg-white px-4 py-2 text-sm font-bold text-black transition-all duration-200 lg:group-hover:inline-block">
            Wish List
          </span>
          <div className="relative cursor-pointer rounded-full border-4 border-black bg-black p-2 text-white transition-all duration-200 hover:bg-white hover:text-black">
            <Heart className="h-auto w-4 lg:w-5" />
            {totalItems() > 0 && (
              <div className="absolute -right-1 -bottom-2 rounded-full border bg-orange-500 px-1 text-xs text-white">
                {totalItems()}
              </div>
            )}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="max-w-md overflow-y-auto px-1 pt-10 pb-5 lg:max-w-lg">
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
            <div className="mt-3 w-full max-w-sm space-y-5">
              {items.map(item => (
                <div
                  key={item.productId}
                  className="flex justify-between gap-3"
                >
                  <div className="relative h-28 w-full flex-1 lg:h-50">
                    <Image
                      src={item.product.images[0].url}
                      alt="product"
                      fill
                      className="object-contain lg:object-cover"
                    />
                    <HeartOff
                      size={24}
                      className="absolute top-1 left-1 rounded-2xl bg-white p-1"
                      onClick={() => {
                        removeWishItem(item.productId)
                        toast.message('Product removed from your wishlist!')
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between text-xs lg:justify-evenly">
                    <Link
                      href={`${ROUTES.PRODUCTS}/${item.product.title}?productId=${item.product.id}`}
                      className="font-bold"
                    >
                      {item.product.title}
                    </Link>
                    <div className="flex items-center justify-between">
                      <div className="opacity-60">
                        {item.product.type.toUpperCase()}
                      </div>
                      <div className="font-bold">${item.product.price}</div>
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
                      variant="outline"
                      className="w-full text-xs"
                    >
                      {cart.isLoading ? (
                        <>
                          <BaggageClaim /> Adding ...
                        </>
                      ) : (
                        <>
                          <BaggageClaim /> Add to Bag
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <SheetClose asChild>
              <Link
                onClick={() => setIsOpen && setIsOpen(false)}
                href={ROUTES.WISHLIST}
                className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              >
                View Wish List
              </Link>
            </SheetClose>
          </SheetHeader>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default WishListDrawer
