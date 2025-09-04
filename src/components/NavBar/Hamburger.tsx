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
  Mail,
  Mars,
  Menu,
  Package,
  Shirt,
  User,
  Venus,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const Hamburger = ({ isAuth }: { isAuth: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
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

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

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
            <div className="ck flex flex-1 justify-end">
              <div className="rounded-full border bg-black p-2">
                <Heart className="h-auto w-4 text-white" />
              </div>
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
                  <Link href={ROUTES.MEN_T_SHIRT}>
                    <AccordionContent>T-Shirts</AccordionContent>
                  </Link>
                  <Link href={ROUTES.MEN_HOODIES}>
                    <AccordionContent>Hoodies & Sweatshirts</AccordionContent>
                  </Link>
                  <Link href={ROUTES.MEN_JACKETS}>
                    <AccordionContent>Jackets & Coats</AccordionContent>
                  </Link>
                  <Link href={ROUTES.MEN_JEANS}>
                    <AccordionContent>Jeans</AccordionContent>
                  </Link>
                  <Link href={ROUTES.MEN}>
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
                  <Link href={ROUTES.WOMEN_DRESSES}>
                    <AccordionContent>Dresses</AccordionContent>
                  </Link>
                  <Link href={ROUTES.WOMEN_TOPS}>
                    <AccordionContent>Tops & T-Shirts</AccordionContent>
                  </Link>
                  <Link href={ROUTES.WOMEN_BLOUSES}>
                    <AccordionContent>Blouses & Shirts</AccordionContent>
                  </Link>
                  <Link href={ROUTES.WOMEN_JEANS}>
                    <AccordionContent>Jeans & Pants</AccordionContent>
                  </Link>
                  <Link href={ROUTES.WOMEN}>
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

                  <Link href={ROUTES.COLLECTIONS}>
                    <AccordionContent>Adidas</AccordionContent>
                  </Link>
                  <Link href={ROUTES.COLLECTIONS}>
                    <AccordionContent>Nike</AccordionContent>
                  </Link>
                  <Link href={ROUTES.COLLECTIONS}>
                    <AccordionContent>Puma</AccordionContent>
                  </Link>
                  <Link href={ROUTES.COLLECTIONS}>
                    <AccordionContent>Zara</AccordionContent>
                  </Link>
                  <Link href={ROUTES.COLLECTIONS}>
                    <AccordionContent>View All</AccordionContent>
                  </Link>
                </AccordionItem>
              </Accordion>
            </li>
            <li className="py-4">
              <Link href={ROUTES.NEW} className="flex items-center gap-2">
                <Shirt /> New
              </Link>
            </li>
            <li className="py-4">
              <Link href={ROUTES.SALE} className="flex items-center gap-2">
                <BadgeDollarSign /> Sale
              </Link>
            </li>
          </ul>

          <div className="my-4 w-full border"></div>

          <div>
            <div className="mb-2 text-center text-sm text-neutral-500">
              My Account
            </div>
            <ul className="flex flex-col gap-1 text-lg font-semibold">
              <li className="py-4">
                <Link className="flex items-center gap-2" href={ROUTES.PROFILE}>
                  <User /> Profile
                </Link>
              </li>
              <li className="py-4">
                <Link className="flex items-center gap-2" href={ROUTES.CART}>
                  <Handbag /> Cart
                </Link>
              </li>
              <li className="py-4">
                <Link
                  className="flex items-center gap-2"
                  href={ROUTES.WISHLIST}
                >
                  <Heart /> Wishlist
                </Link>
              </li>
              <li className="py-4">
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
                    onClick={() => router.push(ROUTES.SIGNIN)}
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
              <Link href={ROUTES.DELIVERY} className="flex items-center gap-2">
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
                  <Link href={ROUTES.ABOUT}>
                    <AccordionContent>About Us</AccordionContent>
                  </Link>
                  <Link href={ROUTES.CONTACT}>
                    <AccordionContent>Contact Us</AccordionContent>
                  </Link>
                  <Link href={ROUTES.REVIEWS}>
                    <AccordionContent>Customer Reviews</AccordionContent>
                  </Link>
                  <Link href={ROUTES.FAQ}>
                    <AccordionContent>FAQ</AccordionContent>
                  </Link>
                </AccordionItem>
              </Accordion>
            </li>
          </ul>

          <div className="my-4 w-full border"></div>

          <div className="my-7">
            <div className="text-center text-sm font-semibold text-neutral-500">
              Help / Support
            </div>
            <div className="my-5">
              <a
                href="mailto:noire.shop.help@gmail.com"
                className="flex items-center justify-center gap-3"
              >
                <Mail />
                noire.shop.help@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Hamburger
