'use client'
import { logout } from '@/app/actions/auth'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ROUTES } from '@/routes'
import {
  BadgeDollarSign,
  Handbag,
  Heart,
  Info,
  Library,
  LogIn,
  LogOut,
  Mars,
  Menu,
  Package,
  Shirt,
  Store,
  User,
  Venus,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ContactUsLink from '../ContactUsLink'
import WishListDrawer from './WishListDrawer'
const Hamburger = ({
  isAuth,
  userId,
}: {
  isAuth: boolean
  userId: string | null
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {!isOpen && <Menu size={30} onClick={() => setIsOpen(true)} />}
      {isOpen && (
        <div className="fixed inset-0 z-50 min-h-screen w-screen overflow-auto bg-white px-3 py-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex-1">
              <X size={30} onClick={() => setIsOpen(false)} />
            </div>
            <Link
              href={ROUTES.HOME}
              onClick={() => setIsOpen(false)}
              className="flex flex-1 justify-center"
            >
              <Image alt="logo " src="/logo.png" width={30} height={30} />
            </Link>
            <div className="flex flex-1 justify-end">
              <WishListDrawer
                open={isOpen}
                userId={userId}
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
          <ul className="flex flex-col gap-1 text-lg font-semibold">
            <li>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">
                    <div className="flex items-center gap-2">
                      <Mars /> Men
                    </div>
                  </AccordionTrigger>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.MEN}>
                    <AccordionContent>T-Shirts</AccordionContent>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.MEN}>
                    <AccordionContent>Hoodies & Sweatshirts</AccordionContent>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.MEN}>
                    <AccordionContent>Jackets & Coats</AccordionContent>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.MEN}>
                    <AccordionContent>Jeans</AccordionContent>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.MEN}>
                    <AccordionContent>View All</AccordionContent>
                  </Link>
                </AccordionItem>
              </Accordion>
            </li>
            <li>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">
                    <div className="flex items-center gap-2">
                      <Venus /> Women
                    </div>
                  </AccordionTrigger>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.WOMEN}>
                    <AccordionContent>Dresses</AccordionContent>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.WOMEN}>
                    <AccordionContent>Tops & T-Shirts</AccordionContent>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.WOMEN}>
                    <AccordionContent>Blouses & Shirts</AccordionContent>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.WOMEN}>
                    <AccordionContent>Jeans & Pants</AccordionContent>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.WOMEN}>
                    <AccordionContent>View All</AccordionContent>
                  </Link>
                </AccordionItem>
              </Accordion>
            </li>
            <li>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">
                    <div className="flex items-center gap-2">
                      <Library /> Collections
                    </div>
                  </AccordionTrigger>

                  <Link
                    onClick={() => setIsOpen(false)}
                    href={ROUTES.COLLECTIONS}
                  >
                    <AccordionContent>Adidas</AccordionContent>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={ROUTES.COLLECTIONS}
                  >
                    <AccordionContent>Nike</AccordionContent>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={ROUTES.COLLECTIONS}
                  >
                    <AccordionContent>Puma</AccordionContent>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={ROUTES.COLLECTIONS}
                  >
                    <AccordionContent>Zara</AccordionContent>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={ROUTES.COLLECTIONS}
                  >
                    <AccordionContent>View All</AccordionContent>
                  </Link>
                </AccordionItem>
              </Accordion>
            </li>
            <li className="py-4">
              <Link
                onClick={() => setIsOpen(false)}
                href={ROUTES.NEW}
                className="flex items-center gap-2"
              >
                <Shirt /> New
              </Link>
            </li>
            <li className="py-4">
              <Link
                onClick={() => setIsOpen(false)}
                href={ROUTES.PRODUCTS}
                className="flex items-center gap-2"
              >
                <Store /> All Products
              </Link>
            </li>
          </ul>

          <div className="my-4 w-full border"></div>

          <div>
            <div className="mb-2 text-center text-sm text-neutral-500">
              My Account
            </div>
            <ul className="flex flex-col gap-1 space-y-8 py-4 text-lg font-semibold">
              <li>
                <Link
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2"
                  href={ROUTES.PROFILE}
                >
                  <User /> Profile
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2"
                  href={ROUTES.CART}
                >
                  <Handbag /> Cart
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2"
                  href={ROUTES.WISHLIST}
                >
                  <Heart /> Wishlist
                </Link>
              </li>
              <li>
                {isAuth ? (
                  <div
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <LogOut /> Log Out
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setIsOpen(false)
                      router.push(ROUTES.SIGNIN)
                    }}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <LogIn /> Sign In
                  </div>
                )}
              </li>
            </ul>
          </div>

          <div className="my-4 w-full border"></div>

          <ul className="flex flex-col gap-1 text-lg font-semibold">
            <div className="mb-2 text-center text-sm text-neutral-500">
              Info
            </div>
            <li className="py-4">
              <Link
                onClick={() => setIsOpen(false)}
                href={ROUTES.DELIVERY}
                className="flex items-center gap-2"
              >
                <Package /> Delivery & Returns
              </Link>
            </li>
            <li>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">
                    <div className="flex items-center gap-2">
                      <Info /> About Us
                    </div>
                  </AccordionTrigger>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.ABOUT}>
                    <AccordionContent>About Us</AccordionContent>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.CONTACT}>
                    <AccordionContent>Contact Us</AccordionContent>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.REVIEWS}>
                    <AccordionContent>Customer Reviews</AccordionContent>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={ROUTES.FAQ}>
                    <AccordionContent>FAQ</AccordionContent>
                  </Link>
                </AccordionItem>
              </Accordion>
            </li>
          </ul>

          <ContactUsLink>Help / Support</ContactUsLink>
        </div>
      )}
    </>
  )
}

export default Hamburger
