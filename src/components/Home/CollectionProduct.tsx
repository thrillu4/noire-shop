'use client'

import { ProductWithImage } from '@/lib/types'
import { ROUTES } from '@/routes'
import Image from 'next/image'
import Link from 'next/link'

const CollectionProduct = ({ product }: { product: ProductWithImage }) => {
  return (
    <Link
      href={`${ROUTES.PRODUCTS}/${product.title}?productId=${product.id}`}
      className="mx-auto w-full text-xs lg:text-base"
    >
      <div className="relative h-60 w-full sm:h-80 lg:h-90 xl:h-140">
        <Image
          src={product.images[0].url}
          fill
          alt={product.title}
          className="rounded-xl object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="mb-1">
        {product.type.charAt(0).toUpperCase() +
          product.type.slice(1).toLowerCase()}
      </div>
      <div className="flex items-center justify-between font-bold">
        <div>{product.title}</div>
        <div>${product.price}</div>
      </div>
    </Link>
  )
}

export default CollectionProduct
