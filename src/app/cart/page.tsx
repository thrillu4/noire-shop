'use client'
import { ROUTES } from '@/routes'
import { useCartStore } from '@/store/cart'
import { LockKeyhole, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import ItemGrid from '@/components/Cart/ItemGrid'
import TermsConditionsDialog from '@/components/TermsConditionsDialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CartPageSkeleton from '@/components/Skeletons/LoadingSkeletonSpinner'

const Cart = () => {
  const { items, totalPrice, totalItems, isLoading } = useCartStore()
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleCheck = () => {
    setLoading(true)
    if (!isChecked) {
      setShowError(true)
      setLoading(false)
    } else {
      setIsChecked(false)
      setShowError(false)
      setLoading(false)
      router.push(ROUTES.CHECKOUT)
    }
  }
  return (
    <div className="min-h-[60vh]">
      {isLoading && <CartPageSkeleton />}
      {!isLoading && items.length === 0 && (
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
          {items.map((item, i) => (
            <ItemGrid key={i} cartItem={item} />
          ))}
          <div className="mx-auto flex max-w-lg flex-col gap-8 rounded-2xl border-2 px-5 py-9 font-semibold">
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
              <LockKeyhole />
              {loading ? 'Processing...' : 'Continue to checkout'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
