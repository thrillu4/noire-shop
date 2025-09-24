import Link from 'next/link'

import { ROUTES } from '@/routes'
import Image from 'next/image'
import ClientDrawersMenu from './ClientDrawersMenu'
import ClientMenu from './ClientMenu'
import DesktopNavMenu from './DesktopNavMenu'

export default function NavBar() {
  return (
    <>
      {/* mobile  */}
      <div className="flex w-full items-center justify-between px-3 py-8 lg:hidden">
        <div className="flex-1">
          <ClientMenu />
        </div>

        <Link href={ROUTES.HOME} className="relative h-[30px] w-[30px]">
          <Image alt="logo " src="/logo.png" fill className="object-contain" />
        </Link>

        <div className="flex flex-1 justify-end gap-1">
          <ClientDrawersMenu open={false} />
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
          <ClientDrawersMenu open={true} />
        </div>
      </div>
    </>
  )
}
