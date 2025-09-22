'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ProductType } from '@/lib/types'
import { ROUTES } from '@/routes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const DesktopNavMenu = () => {
  const [menTypes, setMenTypes] = useState<ProductType[]>([])
  const [womenTypes, setWomenTypes] = useState<ProductType[]>([])
  const [collections, setCollections] = useState<string[]>([])
  const about = [
    { title: 'Delivery & Returns', link: ROUTES.DELIVERY },
    { title: 'Contact Us', link: ROUTES.CONTACT },
    { title: 'Customer Reviews', link: ROUTES.REVIEWS },
    { title: 'FAQ', link: ROUTES.FAQ },
  ]
  useEffect(() => {
    fetch(ROUTES.GET_PRODUCTS_TYPE_MEN)
      .then(data => data.json())
      .then(data => setMenTypes(data.res))
    fetch(ROUTES.GET_PRODUCTS_TYPE_WOMEN)
      .then(data => data.json())
      .then(data => setWomenTypes(data.res))
    fetch(ROUTES.GET_PRODUCTS_COLLECTION)
      .then(data => data.json())
      .then(data => setCollections(data.res))
  }, [])
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="text-lg">
        {/*  */}

        {/*  */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={ROUTES.HOME}>Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/*  */}

        {/*  */}
        <NavigationMenuItem>
          <Link href={ROUTES.MEN}>
            <NavigationMenuTrigger>
              <div>Men</div>
            </NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent className="z-150 flex gap-15 px-10 py-5">
            <div>
              <div className="opacity-50">For Men</div>
              <div className="mt-4 grid min-w-max grid-cols-3 gap-x-8">
                {menTypes.map(type => (
                  <NavigationMenuLink
                    key={type.type}
                    href={`${ROUTES.MEN}/${type.type}`}
                  >
                    {type.type.charAt(0).toUpperCase() +
                      type.type.slice(1).toLowerCase()}
                  </NavigationMenuLink>
                ))}
              </div>
              <NavigationMenuLink
                href={ROUTES.MEN}
                className="mt-20 flex justify-end text-right text-sm underline opacity-55"
              >
                View All Products
              </NavigationMenuLink>
            </div>
            <div className="relative h-60 w-60">
              <Image
                src={'/for-men.avif'}
                alt="for men picture"
                fill
                className="object-cover"
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/*  */}

        {/*  */}
        <NavigationMenuItem>
          <Link href={ROUTES.WOMEN}>
            <NavigationMenuTrigger>Women</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent className="z-150 flex gap-15 px-10 py-5">
            <div>
              <div className="opacity-50">For Women</div>
              <div className="mt-4 grid min-w-max grid-cols-3 gap-x-8">
                {womenTypes.map(type => (
                  <NavigationMenuLink
                    key={type.type}
                    href={`${ROUTES.WOMEN}/${type.type}`}
                  >
                    {type.type.charAt(0).toUpperCase() +
                      type.type.slice(1).toLowerCase()}
                  </NavigationMenuLink>
                ))}
              </div>
              <NavigationMenuLink
                href={ROUTES.WOMEN}
                className="mt-10 flex justify-end text-right text-sm underline opacity-55"
              >
                View All Products
              </NavigationMenuLink>
            </div>
            <div className="relative h-60 w-60">
              <Image
                src={'/for-women.avif'}
                alt="for women picture"
                fill
                className="object-cover"
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/*  */}

        {/*  */}

        <NavigationMenuItem>
          <Link href={ROUTES.COLLECTIONS}>
            <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent className="z-150 flex gap-15 px-10 py-5">
            <div>
              <div className="opacity-50">Explore Our Collections</div>
              <div className="mt-4 grid min-w-max grid-cols-3 gap-x-8">
                {collections.map(col => (
                  <NavigationMenuLink
                    key={col}
                    href={`${ROUTES.COLLECTIONS}/${col.charAt(0).toLowerCase() + col.slice(1)}`}
                  >
                    {col.charAt(0).toUpperCase() + col.slice(1).toLowerCase()}
                  </NavigationMenuLink>
                ))}
              </div>
              <NavigationMenuLink
                href={ROUTES.COLLECTIONS}
                className="mt-10 flex justify-end text-right text-sm underline opacity-55"
              >
                View All Collections
              </NavigationMenuLink>
            </div>
            <div className="relative h-70 w-60">
              <Image
                src={'/collections.avif'}
                alt="collections picture"
                fill
                className="object-cover"
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/*  */}

        {/*  */}

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={ROUTES.NEW}>New</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/*  */}

        {/*  */}

        <NavigationMenuItem>
          <Link href={ROUTES.ABOUT}>
            <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent className="z-150 flex gap-15 px-10 py-5">
            <div>
              <div className="opacity-50">Learn About Noiré</div>
              <div className="mt-4 grid min-w-max grid-cols-2 gap-x-8">
                {about.map(obj => (
                  <NavigationMenuLink key={obj.title} href={obj.link}>
                    {obj.title}
                  </NavigationMenuLink>
                ))}
              </div>
              <NavigationMenuLink
                href={ROUTES.ABOUT}
                className="mt-10 flex justify-end text-right text-sm underline opacity-55"
              >
                About Us
              </NavigationMenuLink>
            </div>
            <div className="relative h-70 w-60">
              <Image
                src={'/about.avif'}
                alt="about us picture"
                fill
                className="object-cover"
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/*  */}
        {/*  */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default DesktopNavMenu
