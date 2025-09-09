import { ROUTES } from '@/routes'
import { useOrderStore } from '@/store/order'
import { SquarePen } from 'lucide-react'
import { useRouter } from 'next/navigation'

const YourInfo = () => {
  const order = useOrderStore(state => state.currentOrder)
  const router = useRouter()
  return (
    <div className="rounded-2xl border px-5 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Your Contact Information</h2>
        <SquarePen onClick={() => router.push(ROUTES.CHECKOUT)} />
      </div>
      <div className="space-y-3">
        <div>{order?.fullName}</div>
        <div>{order?.phone}</div>
        <div>{order?.country}</div>
        <div>{order?.city}</div>
        <div>{order?.address}</div>
      </div>
    </div>
  )
}

export default YourInfo
