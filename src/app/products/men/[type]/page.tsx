'use client'

import { fetchProducts } from '@/app/actions/fetchProducts'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import SearchBar from '@/components/Home/SearchBar'
import FilterDrawer from '@/components/Products/FilterDrawer'
import ProductsSkeleton from '@/components/Skeletons/ProductsSkeleton'
import { Button } from '@/components/ui/button'
import { FilteredProduct } from '@/lib/types'
import { ROUTES } from '@/routes'
import { useFilterState } from '@/store/filter'
import { BrushCleaning } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const Types = ({ params }: { params: Promise<{ type: string }> }) => {
  const { type } = use(params)
  const [products, setProducts] = useState<FilteredProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const { filter, totalProducts, clearFilter, setTotalProducts } =
    useFilterState()
  const { ref, inView } = useInView()

  useEffect(() => {
    const loadProducts = async () => {
      const newProducts = await fetchProducts(page * 8, 8, {
        ...filter,
        gender: 'male',
        types: [type],
      })
      if (newProducts.products.length < 8) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
      setProducts(prev =>
        page === 0 ? newProducts.products : [...prev, ...newProducts.products],
      )
      setTotalProducts(newProducts.total)
      setLoading(false)
    }
    loadProducts()
  }, [filter, page, setTotalProducts, type])

  useEffect(() => {
    if (inView && hasMore) {
      setPage(prev => prev + 1)
    }
  }, [hasMore, inView])

  return (
    <div className="mb-20 px-3">
      <Breadcrumbs />
      <h1 className="my-3 text-2xl font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
        {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
      </h1>
      <SearchBar />
      <div className="mt-5 flex items-center justify-between">
        <FilterDrawer propType={type} propGender="male" setPage={setPage} />
        <div className="text-sm 2xl:text-lg">
          Total items: <span className="font-bold">({totalProducts})</span>
        </div>
      </div>
      <div className="mt-5 grid min-h-[50vh] grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-3 2xl:grid-cols-4">
        {loading && <ProductsSkeleton />}
        {!loading && products.length === 0 && (
          <div className="col-start-1 col-end-10 mt-10 font-bold">
            <div>😕 Nothing found matching your request.</div>
            <Button
              onClick={() => clearFilter()}
              className="mx-auto mt-4 flex justify-center"
            >
              <BrushCleaning /> Clear filter
            </Button>
          </div>
        )}
        {products.map(product => (
          <Link
            href={`${ROUTES.PRODUCTS}/${product.title}?productId=${product.id}`}
            key={product.id}
          >
            <div className="relative h-60 w-full sm:h-80 lg:h-120 xl:h-150">
              <Image
                src={product.images[0]?.url}
                alt={product.title}
                fill
                className="rounded-xl object-cover"
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
      {hasMore && <div ref={ref}>Loading more...</div>}
    </div>
  )
}

export default Types
