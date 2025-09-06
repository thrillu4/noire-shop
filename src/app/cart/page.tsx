'use client'
import { ROUTES } from '@/routes'
import { useCartStore } from '@/store/cart'
import {
  Heart,
  LockKeyhole,
  Minus,
  Plus,
  RefreshCcw,
  ShoppingBag,
  X,
} from 'lucide-react'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import TermsConditionsDialog from '@/components/TermsConditionsDialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Cart = () => {
  const { items, totalPrice, totalItems, removeItem, updateQuantity } =
    useCartStore()
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleCheck = () => {
    if (!isChecked) {
      setShowError(true)
    } else {
      setIsChecked(false)
      setShowError(false)
      router.push(ROUTES.CHECKOUT)
    }
  }
  return (
    <div className="min-h-[60vh]">
      {items.length === 0 && (
        <div className="mt-30 flex flex-col gap-3">
          <div className="flex flex-col items-center gap-7">
            <div>
              <ShoppingBag />
            </div>
            <div>Your Shopping Bag is empty</div>
          </div>
          <Link href={ROUTES.NEW} className="text-center underline opacity-60">
            Shop What&apos;s New
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div className="mb-20 px-2">
          <Breadcrumbs />
          <h2 className="mt-4 text-2xl font-extrabold">Shopping Bag</h2>
          {items.map(item => (
            <div
              className="my-10 grid grid-cols-[1fr_auto] gap-3.5 px-2 text-sm"
              key={item.productId}
            >
              <div className="flex w-full flex-col">
                <div className="relative min-w-[255px]">
                  <Image
                    src={item.product.images[0].url}
                    alt="product image"
                    width={265}
                    height={314}
                  />
                  <Heart
                    size={29}
                    className="absolute top-1 left-1 rounded-2xl bg-white p-1"
                  />
                </div>
                <div className="mt-2.5 mb-1 text-xs">
                  {item.product.type.toUpperCase()}
                </div>
                <div className="flex items-center justify-between font-bold">
                  {item.product.title}
                  <div>${item.product.price}</div>
                </div>
              </div>
              <div className="flex w-7 flex-col items-center text-lg">
                <X onClick={() => removeItem(item.productId, item.size)} />
                <div className="mt-10 font-bold">{item.size}</div>
                <div className="my-6 flex flex-col items-center border border-zinc-500">
                  <Plus
                    onClick={() =>
                      updateQuantity(
                        item.id!,
                        item.productId,
                        item.quantity + 1,
                        item.size,
                      )
                    }
                  />
                  <div className="w-full border-t border-b border-zinc-500 text-center font-bold">
                    {item.quantity}
                  </div>
                  <Minus
                    onClick={() =>
                      updateQuantity(
                        item.id!,
                        item.productId,
                        item.quantity - 1,
                        item.size,
                      )
                    }
                  />
                </div>
                <RefreshCcw
                  onClick={() =>
                    updateQuantity(item.id!, item.productId, 1, item.size)
                  }
                />
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-8 rounded-2xl border-2 px-5 py-9 font-semibold">
            <div>Order Summary</div>
            <div className="flex items-center justify-between text-sm">
              <div>Quantity of items:</div>
              <div>{totalItems()}</div>
            </div>
            <div className="flex items-center justify-between border-b pb-6 text-sm">
              <div>Item subtotal:</div>
              <div>${totalPrice()}</div>
            </div>
            <div className="flex items-center justify-between text-xl font-bold">
              <div>Total</div>
              <div>${totalPrice()}</div>
            </div>
            <div
              className={`${showError && !isChecked && 'rounded-2xl bg-red-300 p-2'} flex items-start gap-3`}
            >
              <Checkbox
                id="terms-2"
                name="checkbox"
                className="border-zinc-700"
                checked={isChecked}
                onClick={() => setIsChecked(!isChecked)}
              />
              <div className="grid gap-2">
                <Label htmlFor="terms-2" className="text-xs">
                  Accept terms and conditions
                </Label>
                <p className="text-muted-foreground text-[10px]">
                  By clicking this checkbox, you agree to the{' '}
                  <TermsConditionsDialog />
                </p>
              </div>
            </div>
            {showError && !isChecked && (
              <p className="text-xs text-red-500">
                You must accept Terms & Conditions and Privacy Policy
              </p>
            )}
            <Button onClick={handleCheck} className="flex items-center gap-3">
              <LockKeyhole /> Continue to checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
