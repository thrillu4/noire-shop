'use client'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/routes'
import { useOrderStore } from '@/store/order'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Success = () => {
  const { currentOrder } = useOrderStore()
  const router = useRouter()

  useEffect(() => {
    if (!currentOrder) {
      router.push(ROUTES.HOME)
    }
  }, [currentOrder, router])

  if (!currentOrder) {
    return null
  }
  return (
    <div className="mt-10 mb-20 flex min-h-[80vh] flex-col items-center justify-center space-y-4 px-2">
      <div className="relative h-30 w-30">
        <Image
          src={'/successful.png'}
          alt="successful"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="text-center font-extrabold">
        🎉 Your payment was successful!
      </h1>
      <h2 className="text-center font-bold">We will contact you soon. 🤗</h2>
      <Link href={ROUTES.PRODUCTS}>
        <Button>
          <ShoppingBag /> Continue Shopping
        </Button>
      </Link>
      <Link
        href={currentOrder.userId ? `${ROUTES.PROFILE}/${currentOrder.id}` : ''}
        className="mx-auto mt-3 w-full max-w-lg space-y-2 rounded-2xl border-2 p-5 text-sm"
      >
        <div className="flex items-center justify-between">
          <div className="font-bold">Details: </div>
          <div>
            <div>
              {currentOrder.paymentMethod === 'card'
                ? currentOrder.status.toUpperCase()
                : 'Confirmed'}
            </div>
            <div
              className={`border-b-2 ${currentOrder.status === 'paid' ? 'border-green-600' : 'border-red-500'} `}
            ></div>
          </div>
        </div>
        <div>
          Order №: <span className="font-bold">{currentOrder.id}</span>
        </div>
        <div>Date: {currentOrder.updatedAt.toDateString()}</div>
        <div>
          Payment Method:{' '}
          {currentOrder.paymentMethod === 'delivery'
            ? 'Cash on Delivery'
            : 'Card'}
        </div>
        <div>{currentOrder.fullName}</div>
        <div>{currentOrder.phone}</div>
        <div>{currentOrder.country}</div>
        <div>{currentOrder.city}</div>
        <div>{currentOrder.address}</div>
      </Link>
    </div>
  )
}

export default Success
