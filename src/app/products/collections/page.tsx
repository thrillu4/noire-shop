'use client'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import ContactUsLink from '@/components/ContactUsLink'
import SearchBar from '@/components/Home/SearchBar'
import LoadingSkeletonSpinner from '@/components/Skeletons/LoadingSkeletonSpinner'
import ProductsSkeleton from '@/components/Skeletons/ProductsSkeleton'
import { ROUTES } from '@/routes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface CollectionsWithImages {
  collections: string
  images: [
    {
      url: string
    },
  ]
}

const Collections = () => {
  const [collections, setCollections] = useState<CollectionsWithImages[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch(ROUTES.GET_PRODUCTS_COLLECTION_WITH_IMAGE)
      .then(data => data.json())
      .then(data => {
        setCollections(data.res)
        setLoading(false)
      })
  }, [])

  return (
    <div className="mb-20 px-3">
      <Breadcrumbs />
      <h1 className="mt-3 text-2xl font-bold">Explore Collections</h1>
      <h3 className="mt-3 mb-5 text-xs opacity-70">
        From timeless classics to modern essentials — find the collection that
        fits your lifestyle.
      </h3>
      <SearchBar />
      {loading && <LoadingSkeletonSpinner />}
      <div className="mt-7 mb-20 grid grid-cols-2 gap-x-2 gap-y-5">
        {loading && <ProductsSkeleton />}
        {collections.map(col => (
          <Link
            href={`${ROUTES.COLLECTIONS}/${col.collections.charAt(0).toLowerCase() + col.collections.slice(1)}`}
            key={col.collections}
            className="relative transition duration-200 hover:scale-105"
          >
            <Image
              src={col.images[0].url}
              alt={col.collections}
              width={200}
              height={280}
              className="opacity-40"
            />
            <div className="absolute top-1/2 right-1/2 z-10 translate-x-1/2 -translate-y-1/2 text-xl font-bold tracking-widest">
              {col.collections}
            </div>
          </Link>
        ))}
      </div>
      <ContactUsLink>Contact Us / Help</ContactUsLink>
    </div>
  )
}

export default Collections
