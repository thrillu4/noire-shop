import { Breadcrumbs } from '@/components/Breadcrumbs'
import SearchBar from '@/components/Home/SearchBar'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import { ROUTES } from '@/routes'
import { Shirt, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const New = async () => {
  const session = await verifySession()
  const newProducts = await prisma.product.findMany({
    take: 28,
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      images: { select: { url: true } },
    },
  })

  return (
    <div className="mb-20 px-3">
      <Breadcrumbs />
      <div className="my-5">
        <SearchBar />
      </div>
      <h1 className="mt-3 mb-2 text-center text-2xl font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
        New In
      </h1>
      <h2 className="text-center text-sm opacity-65 2xl:text-base">
        Discover the latest and greatest arrivals,{' '}
        <Link href={ROUTES.COLLECTIONS} className="underline opacity-100">
          new collections
        </Link>{' '}
        to know, exclusive{' '}
        <Link href={ROUTES.PRODUCTS} className="underline opacity-100">
          products
        </Link>{' '}
        and more style inspiration.
        {!session.userId && (
          <span>
            Want to stay in the know?{' '}
            <Link href={ROUTES.SIGNUP} className="underline opacity-100">
              Sign up
            </Link>{' '}
            for updates.
          </span>
        )}
      </h2>
      <div className="mt-10 grid min-h-[50vh] grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-3 2xl:grid-cols-4">
        {newProducts.length === 0 && (
          <div className="col-start-1 col-end-10 mt-10 text-center font-bold">
            New In is empty check out all our{' '}
            <Link
              href={ROUTES.PRODUCTS}
              className="inline-flex gap-3 underline"
            >
              <Shirt /> products
            </Link>
          </div>
        )}
        {newProducts.map(product => (
          <Link
            href={`${ROUTES.PRODUCTS}/${product.title}?productId=${product.id}`}
            key={product.id}
          >
            <div className="relative h-60 w-full sm:h-80 md:h-96 md:w-auto lg:h-120">
              <Image
                src={product.images[0]?.url}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw,(max-width: 1280px) 33vw, 25vw"
              />
            </div>
            <div className="mt-2 text-xs lg:text-sm">
              {product.type.toUpperCase()}
            </div>
            <div className="flex items-center justify-between text-xs font-bold lg:text-lg">
              <h3>{product.title}</h3>
              <p> ${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href={ROUTES.PRODUCTS}
        className="mt-15 flex items-center justify-center gap-3 rounded-2xl border py-4 transition duration-200 hover:scale-105"
      >
        View All Products <ShoppingBag className="w-5" />
      </Link>
    </div>
  )
}

export default New
