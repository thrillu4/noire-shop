import { useUserState } from '@/store/user'
import ActiveOrders from './ActiveOrders'
import ArchiveOrders from './ArchiveOrders'
import { useEffect } from 'react'
import { Archive, PackageCheck } from 'lucide-react'
import { Button } from '../ui/button'
import { ROUTES } from '@/routes'
import ContactUsLink from '../ContactUsLink'
import Link from 'next/link'

const MyOrders = () => {
  const { currentUser, getUser } = useUserState()
  useEffect(() => {
    if (!currentUser?.id) {
      getUser()
    }
  }, [currentUser?.id, getUser])

  return (
    <div className="mx-auto mt-10 mb-20 max-w-lg px-3 sm:max-w-xl md:max-w-4xl">
      <h1 className="font-extrabold">Your Orders</h1>
      <h2 className="my-3 flex items-center gap-2 font-bold">
        <PackageCheck />- Active orders
      </h2>
      <ActiveOrders userId={currentUser?.id} />
      <h2 className="mt-10 mb-3 flex items-center gap-2 font-bold">
        <Archive />- Archive orders
      </h2>
      <ArchiveOrders userId={currentUser?.id} />
      <Button className="mx-auto mt-16 flex" variant="link">
        <Link href={ROUTES.PROFILE}>Back to Profile</Link>
      </Button>
      <ContactUsLink>Contact Us / Help</ContactUsLink>
    </div>
  )
}

export default MyOrders
