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
          <CarouselItem key={i} className="w-45 flex-none pl-2 sm:w-55">
            <Link
              href={`${ROUTES.PRODUCTS}/${product.title}?productId=${product.id}`}
            >
              <CardContent className="relative aspect-square">
                <div className="relative h-60 w-full sm:h-70">
                  <Image
                    src={product.images[0].url}
                    alt={`Slide ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-2 text-xs opacity-40">{product.type}</div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div>{product.title}</div>
                  <div>${product.price}</div>
                </div>
              </CardContent>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      {nav && (
        <div className="mt-6 flex justify-center gap-2">
          <CarouselPrevious className="static rounded-none" />
          <CarouselNext className="static rounded-none" />
        </div>
      )}
    </Carousel>
  )
}
