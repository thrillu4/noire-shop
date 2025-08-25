import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ROUTES } from "@/routes";

export default function NavBar() {
  return (
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
            <div className="grid grid-cols-2 gap-2 p-4">
              <NavigationMenuLink href="/men/jackets">
                Jackets
              </NavigationMenuLink>
              <NavigationMenuLink href="/men/tshirts">
                T-Shirts
              </NavigationMenuLink>
              <NavigationMenuLink href="/men/hoodies">
                Hoodies
              </NavigationMenuLink>
              <NavigationMenuLink href="/men/hoodies">
                View All
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={ROUTES.WOMEN}>
            <NavigationMenuTrigger>Women</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <div className="grid gap-2 p-4">
              <NavigationMenuLink href="/women/dresses">
                Dresses
              </NavigationMenuLink>
              <NavigationMenuLink href="/women/tops">Tops</NavigationMenuLink>
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
            <div className="grid w-[400px] grid-cols-2 gap-2 p-4">
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
  );
}
