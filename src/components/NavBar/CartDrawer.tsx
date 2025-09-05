'use client'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ROUTES } from '@/routes'
import { useCartStore } from '@/store/cart'
import { Handbag, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useEffect, useState } from 'react'

const CartDrawer = ({
  isAuth,
  userId,
}: {
  isAuth: boolean
  userId: string | null
}) => {
  const {
    items,
    loadCart,
    setAuthenticated,
    removeItem,
    totalPrice,
    totalItems,
  } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setAuthenticated(isAuth)
    loadCart()
  }, [isAuth, userId, setAuthenticated, loadCart])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (pathname === ROUTES.CART) return null

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="rounded-full border bg-black p-2">
          <Handbag className="h-auto w-4 text-white" />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto pt-10 pb-5">
        {items.length === 0 && (
          <div className="flex flex-col gap-1">
            <SheetHeader className="flex flex-col items-center gap-7">
              <div>
                <ShoppingBag />
              </div>
              <SheetTitle>
                <div>Your Shopping Bag is empty</div>
              </SheetTitle>
            </SheetHeader>
            <Link
              href={ROUTES.NEW}
              className="text-center underline opacity-60"
            >
              Shop What&apos;s New
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <div className="flex w-full flex-col items-center justify-center">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                Shopping Bag ({totalItems()})
              </SheetTitle>
            </SheetHeader>
            <div className="mt-3">
              {items.map(item => (
                <div
                  key={item.product?.id}
                  className="flex gap-4 border bg-neutral-100 px-1 py-5"
                >
                  <div className="min-w-28">
                    <Image
                      src={item.product.images[0].url}
                      alt="product-image"
                      width={112}
                      height={155}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex w-full flex-col justify-between text-xs">
                    <div className="font-bold">{item.product.title}</div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        Size: <span className="font-bold">{item.size}</span>
                      </div>
                      <div>
                        Qty: <span className="font-bold">{item.quantity}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>${item.product.price}</div>

                      <Trash2
                        onClick={() => removeItem(item.productId, item.size)}
                        size={19}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="my-4 flex w-full justify-between px-3 font-bold">
              <div>Total (USD)</div>
              <div>${totalPrice()}</div>
            </div>
            <SheetFooter>
              <Link href={ROUTES.CART}>
                <Button
                  type="submit"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <ShoppingBag /> Proceed to Purchase
                </Button>
              </Link>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default CartDrawer
