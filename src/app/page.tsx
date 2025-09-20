import { CarouselPlugin } from '@/components/Home/CarouselPlugin'
import GridCollection from '@/components/Home/GridCollection'
import SearchBar from '@/components/Home/SearchBar'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import { bagel } from './fonts'
import Link from 'next/link'
import { ROUTES } from '@/routes'

export default async function Home() {
  return (
    <>
      <div>
        <div className="mb-25">
          <div className="px-3">
            <div>
              <SearchBar />
            </div>
            <h1 className={`${bagel.className} mt-12 text-5xl`}>
              <div>New</div> Collection
            </h1>
            <div className="mt-5 mb-12 flex w-full items-center justify-between rounded-2xl bg-black px-4 py-2 text-sm text-white">
              <div>SUMMER</div>
              <div>NOIRÉ</div>
              <div>2025</div>
            </div>
          </div>
          <CarouselPlugin skip={0} />
          <Link href={ROUTES.PRODUCTS}>
            <Button className="mt-2 ml-2 gap-5 bg-[#d9d9d9] text-black hover:text-white">
              Go To Shop <MoveRight />
            </Button>
          </Link>
        </div>

        <div className="mb-25">
          <h2 className={`${bagel.className} mt-12 mb-1 ml-2 text-3xl`}>
            <div>New</div>
            <span className="relative">
              This Week
              <span className="absolute top-0 -right-10 text-xl font-medium text-blue-800">
                (50)
              </span>
            </span>
          </h2>
          <div className="flex justify-end">
            <Link href={ROUTES.PRODUCTS}>
              <Button variant={'ghost'} className="text-sm opacity-60">
                See All
              </Button>
            </Link>
          </div>
          <CarouselPlugin skip={8} nav={true} />
        </div>

        <div className="mb-25 px-2">
          <h2 className={`${bagel.className} mt-12 mb-8 text-3xl`}>
            <div>XIV</div>
            COLLECTIONS
            <div>24-25</div>
          </h2>
          <GridCollection />
        </div>

        <div className="text-center">
          <div className="px-3">
            <h3 className="mb-4 text-3xl font-extrabold">
              Our Approach to fashion design
            </h3>
            <p className="mb-18 text-sm leading-5 opacity-80">
              At elegant vogue , we blend creativity with craftsmanship to
              create fashion that transcends trends and stands the test of time
              each design is meticulously crafted, ensuring the highest quality
              exquisite finish
            </p>
          </div>

          <div className="mb-24 flex h-[200px] gap-2 overflow-hidden">
            <div className="flex">
              <Image
                src={'/z.png'}
                width={120}
                height={160}
                alt=""
                className="h-[160px] max-w-none"
              />
            </div>
            <div className="flex items-end">
              <Image
                src={'/x.png'}
                width={120}
                height={160}
                alt=""
                className="h-[160px] max-w-none"
              />
            </div>
            <div className="flex">
              <Image
                src={'/c.png'}
                width={120}
                height={160}
                alt=""
                className="h-[160px] max-w-none"
              />
            </div>
            <div className="flex items-end">
              <Image
                src={'/v.png'}
                width={120}
                height={160}
                alt=""
                className="h-[160px] max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
