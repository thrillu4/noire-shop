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
          <div className="absolute top-0 left-0 -z-50 block h-screen w-full bg-[url('/main-bg.jpg')] bg-cover bg-center bg-no-repeat lg:bg-cover" />
          <div className="px-3">
            <div>
              <SearchBar />
            </div>
            <h1
              className={`${bagel.className} mt-12 text-5xl lg:text-7xl xl:text-8xl`}
            >
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
            <Button className="mt-2 ml-2 gap-5 bg-[#d9d9d9] text-black hover:text-white lg:mt-6 lg:text-lg">
              Go To Shop <MoveRight />
            </Button>
          </Link>
        </div>

        <div className="mb-25">
          <h2
            className={`${bagel.className} mt-12 mb-1 ml-2 text-3xl lg:text-5xl`}
          >
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
              <Button
                variant={'ghost'}
                className="text-sm opacity-60 lg:text-base"
              >
                See All
              </Button>
            </Link>
          </div>
          <CarouselPlugin skip={20} nav={true} />
        </div>

        <div className="mb-25 px-2">
          <h2 className={`${bagel.className} mt-12 mb-8 text-3xl lg:text-5xl`}>
            <div>XIV</div>
            COLLECTIONS
            <div>24-25</div>
          </h2>
          <GridCollection />
        </div>

        <div className="text-center">
          <div className="px-3">
            <h3 className="mb-4 text-3xl font-extrabold lg:text-5xl">
              Our Approach to fashion design
            </h3>
            <p className="mb-18 text-sm leading-5 opacity-80 lg:text-lg">
              At elegant vogue , we blend creativity with craftsmanship to
              create fashion that transcends trends and stands the test of time
              each design is meticulously crafted, ensuring the highest quality
              exquisite finish
            </p>
          </div>

          <div className="mb-24 flex h-[300px] justify-center gap-2 overflow-hidden lg:h-[420px] xl:gap-10 2xl:h-150">
            <div className="flex">
              <div className="relative h-50 w-40 lg:h-70 lg:w-60 2xl:h-100 2xl:w-80">
                <Image
                  src={'/z.png'}
                  fill
                  alt="image-1"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex items-end">
              <div className="relative h-50 w-40 lg:h-70 lg:w-60 2xl:h-100 2xl:w-80">
                <Image
                  src={'/x.png'}
                  fill
                  alt="image-2"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex">
              <div className="relative flex h-50 w-40 lg:h-70 lg:w-60 2xl:h-100 2xl:w-80">
                <Image
                  src={'/c.png'}
                  fill
                  alt="image-3"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex items-end">
              <div className="relative h-50 w-40 lg:h-70 lg:w-60 2xl:h-100 2xl:w-80">
                <Image
                  src={'/v.png'}
                  fill
                  alt="image-4"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
