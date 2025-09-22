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
      <div className="relative h-60 w-full sm:h-80 lg:h-90">
        <Image
          src={product.images[0].url}
          fill
          alt={product.title}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="mb-1 opacity-50">
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
