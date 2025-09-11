import { useUserState } from '@/store/user'
import ActiveOrders from './ActiveOrders'
import ArchiveOrders from './ArchiveOrders'
import { useEffect } from 'react'
import { Archive, PackageCheck } from 'lucide-react'

const MyOrders = () => {
  const { currentUser, getUser } = useUserState()
  useEffect(() => {
    if (!currentUser?.id) {
      getUser()
    }
  }, [currentUser?.id, getUser])

  return (
    <div className="mt-10 mb-20 px-3">
      <h1 className="font-extrabold">Your Orders</h1>
      <h2 className="my-3 flex items-center gap-2 font-bold">
        <PackageCheck />- Active orders
      </h2>
      <ActiveOrders userId={currentUser?.id} />
      <h2 className="mt-10 mb-3 flex items-center gap-2 font-bold">
        <Archive />- Archive orders
      </h2>
      <ArchiveOrders userId={currentUser?.id} />
    </div>
  )
}

export default MyOrders
