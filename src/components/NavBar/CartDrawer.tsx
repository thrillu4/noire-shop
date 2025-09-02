'use client'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCartStore } from '@/store/store'
import { Handbag } from 'lucide-react'
import Image from 'next/image'

import { useEffect } from 'react'

const CartDrawer = ({
  isAuth,
  userId,
}: {
  isAuth: boolean
  userId: string | null
}) => {
  const { items, loadCart, setAuthenticated } = useCartStore()

  useEffect(() => {
    setAuthenticated(isAuth, userId)
    loadCart()
  }, [isAuth, userId, setAuthenticated, loadCart])

  console.log(items)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="rounded-full border bg-black p-2">
          <Handbag className="h-auto w-4 text-white" />
        </div>
      </SheetTrigger>
      <SheetContent className="max-h-[100vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div>
          {items.length > 0 ? (
            items.map(item => (
              <div key={item.product?.id}>
                <div>{item.product?.title}</div>
                {item.product?.images[0].url && (
                  <Image
                    src={item.product?.images[0].url}
                    width={40}
                    height={30}
                    alt="image"
                  />
                )}

                <div>{item.product?.price}</div>
              </div>
            ))
          ) : (
            <div>Cart is empty!</div>
          )}
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CartDrawer
