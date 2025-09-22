import Link from 'next/link'

import { verifySession } from '@/lib/sessions'
import { ROUTES } from '@/routes'
import Image from 'next/image'
import CartDrawer from './CartDrawer'
import DesktopNavMenu from './DesktopNavMenu'
import Hamburger from './Hamburger'
import UserDrawer from './UserDrawer'
import WishListDrawer from './WishListDrawer'

export default async function NavBar() {
  const session = await verifySession()

  return (
    <>
      {/* mobile  */}
      <div className="flex w-full items-center justify-between px-3 py-8 lg:hidden">
        <div className="flex-1">
          <Hamburger isAuth={session.isAuth} userId={session.userId} />
        </div>

        <Link href={ROUTES.HOME} className="relative h-[30px] w-[30px]">
          <Image alt="logo " src="/logo.png" fill className="object-contain" />
        </Link>

        <div className="flex flex-1 justify-end gap-1">
          <WishListDrawer userId={session.userId} open={false} />
          <CartDrawer isAuth={session.isAuth} userId={session.userId} />
          <UserDrawer isAuth={session.isAuth} />
        </div>
      </div>
      {/* mobile  */}

      <div className="hidden items-center justify-between px-3 py-8 lg:flex">
        <div className="flex-1">
          <DesktopNavMenu />
        </div>

        <Link
          href={ROUTES.HOME}
          className="relative h-[30px] w-[30px] lg:h-10 lg:w-10"
        >
          <Image alt="logo " src="/logo.png" fill className="object-contain" />
        </Link>

        <div className="flex flex-1 justify-end gap-2">
          <WishListDrawer userId={session.userId} open={true} />
          <CartDrawer isAuth={session.isAuth} userId={session.userId} />
          <UserDrawer isAuth={session.isAuth} />
        </div>
      </div>
    </>
  )
}
