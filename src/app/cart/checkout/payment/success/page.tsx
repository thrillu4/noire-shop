'use client'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/routes'
import { useOrderStore } from '@/store/order'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
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
    <div className="mt-10 mb-20 flex min-h-[80vh] flex-col items-center justify-center space-y-3 px-2">
      <div className="max-w-[120px]">
        <Image
          src={'/successful.png'}
          alt="successful"
          width={120}
          height={120}
        />
      </div>
      <h1 className="font-extrabold">🎉 Your payment was successful!</h1>
      <h2 className="font-bold">We will contact you soon. 🤗</h2>
      <Button>
        <ShoppingBag /> Continue Shopping
      </Button>
      <div className="mt-3 space-y-2 rounded-2xl border-2 p-5 text-sm">
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
      </div>
    </div>
  )
}

export default Success
