'use client'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import SearchBar from '@/components/Home/SearchBar'
import FilterByTypeProduct from '@/components/Products/FilterByTypeProduct'
import FilterDrawer from '@/components/Products/FilterDrawer'
import ProductsSkeleton from '@/components/Products/ProductsSkeleton'
import { Button } from '@/components/ui/button'
import { FilteredProduct } from '@/lib/types'
import { useFilterState } from '@/store/filter'
import { BrushCleaning } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchProducts } from '../actions/fetchProducts'

const Products = () => {
  const [products, setProducts] = useState<FilteredProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const { filter, totalProducts, clearFilter, setTotalProducts } =
    useFilterState()
  const { ref, inView } = useInView()

  useEffect(() => {
    const loadProducts = async () => {
      const newProducts = await fetchProducts(page * 8, 8, filter)
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
  }, [filter, page, setTotalProducts])

  useEffect(() => {
    if (inView && hasMore) {
      setPage(prev => prev + 1)
    }
  }, [hasMore, inView])

  return (
    <div className="mb-20 px-3">
      <Breadcrumbs />
      <h1 className="my-3 text-2xl font-bold">Products</h1>
      <SearchBar />
      <div className="mt-5 flex items-center justify-between">
        <FilterDrawer setPage={setPage} />
        <div className="text-sm">
          Total items: <span className="font-bold">({totalProducts})</span>
        </div>
      </div>
      <FilterByTypeProduct setPage={setPage} />
      <div className="grid min-h-[50vh] grid-cols-2 gap-x-3 gap-y-5">
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
          <div key={product.id}>
            <div className="flex justify-center">
              <Image
                src={product.images[0]?.url}
                alt={product.title}
                width={144}
                height={240}
              />
            </div>
            <div className="text-xs">{product.type.toUpperCase()}</div>
            <div className="flex items-center justify-between text-xs font-bold">
              <h3>{product.title}</h3>
              <p> ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && <div ref={ref}>Loading more...</div>}
    </div>
  )
}

export default Products
