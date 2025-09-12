import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { verifySession } from '@/lib/sessions'
import { ROUTES } from '@/routes'
import Image from 'next/image'
import CartDrawer from './CartDrawer'
import Hamburger from './Hamburger'
import UserDrawer from './UserDrawer'
import WishListDrawer from './WishListDrawer'

export default async function NavBar() {
  const session = await verifySession()

  return (
    <>
      {/* mobile  */}
      <div className="flex items-center justify-between px-3 py-8 sm:hidden">
        <div className="flex-1">
          <Hamburger isAuth={session.isAuth} userId={session.userId} />
        </div>

        <Link href={ROUTES.HOME} className="flex flex-1 justify-center">
          <Image alt="logo " src="/logo.png" width={30} height={30} />
        </Link>

        <div className="flex flex-1 justify-end gap-1">
          <WishListDrawer userId={session.userId} open={false} />
          <CartDrawer isAuth={session.isAuth} userId={session.userId} />
          <UserDrawer isAuth={session.isAuth} />
        </div>
      </div>
      {/* mobile  */}

      <div className="hidden sm:block">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href={ROUTES.HOME}>Home</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={ROUTES.MEN}>
                <NavigationMenuTrigger>Men</NavigationMenuTrigger>
              </Link>
              <NavigationMenuContent>
                <div className="grid min-w-max grid-cols-2 gap-2 p-4">
                  <NavigationMenuLink>
                    <Link href={ROUTES.MEN_SALE}>Jackets</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink>T-Shirts</NavigationMenuLink>
                  <NavigationMenuLink>Hoodies</NavigationMenuLink>
                  <NavigationMenuLink>View All</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={ROUTES.WOMEN}>
                <NavigationMenuTrigger>Women</NavigationMenuTrigger>
              </Link>
              <NavigationMenuContent>
                <div className="grid min-w-max grid-cols-2 gap-2 p-4">
                  <NavigationMenuLink href="/women/dresses">
                    Dresses
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/women/tops">
                    Tops
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/women/skirts">
                    Skirts
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={ROUTES.NEW}>New</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={ROUTES.SALE}>Sale</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid min-w-max grid-cols-2 gap-2 p-4">
                  <NavigationMenuLink href="/women/dresses">
                    Collections
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/women/dresses">
                    Collections
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/women/dresses">
                    Collections
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/women/dresses">
                    Collections
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  )
}
