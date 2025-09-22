import { CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import prisma from '@/lib/prisma'
import { ROUTES } from '@/routes'
import Image from 'next/image'
import Link from 'next/link'

export async function CarouselPlugin({
  skip,
  nav,
}: {
  skip: number
  nav?: boolean
}) {
  const newProducts = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 8,
    skip,
    include: {
      images: { take: 1 },
    },
  })
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="mx-auto w-full"
    >
      <CarouselContent className="ml-0">
        {newProducts.map((product, i) => (
          <CarouselItem key={i} className="w-45 flex-none pl-2 sm:w-55 lg:w-70">
            <Link
              href={`${ROUTES.PRODUCTS}/${product.title}?productId=${product.id}`}
            >
              <CardContent className="relative aspect-square">
                <div className="relative h-60 w-full sm:h-70 lg:h-80">
                  <Image
                    src={product.images[0].url}
                    alt={`Slide ${i}`}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <div className="mt-2 text-xs opacity-40 lg:text-sm">
                  {product.type.charAt(0).toUpperCase() +
                    product.type.slice(1).toLowerCase()}
                </div>
                <div className="flex items-center justify-between text-xs font-semibold lg:items-baseline-last lg:text-base">
                  <div>{product.title}</div>
                  <div>${product.price}</div>
                </div>
              </CardContent>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      {nav && (
        <div className="mt-6 flex justify-center gap-2 lg:mt-10 lg:gap-5">
          <CarouselPrevious className="static rounded-none lg:size-12" />
          <CarouselNext className="static rounded-none lg:size-12" />
        </div>
      )}
    </Carousel>
  )
}
