'use client'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import SearchBar from '@/components/Home/SearchBar'
import FilterByTypeProduct from '@/components/Products/FilterByTypeProduct'
import FilterDrawer from '@/components/Products/FilterDrawer'
import ProductsSkeleton from '@/components/Products/ProductsSkeleton'
import { FilteredProduct } from '@/lib/types'
import { useFilterState } from '@/store/filter'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchProducts } from '../actions/fetchProducts'
import Image from 'next/image'

const Products = () => {
  const [products, setProducts] = useState<FilteredProduct[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const { filter, totalProducts, setFilterSettings, setTotalProducts } =
    useFilterState()

  const { ref, inView } = useInView()

  useEffect(() => {
    const loadProducts = async () => {
      const newProducts = await fetchProducts(page * 5, 5, filter)
      if (newProducts.products.length < 5) setHasMore(false)
      setProducts(prev =>
        page === 0 ? newProducts.products : [...prev, ...newProducts.products],
      )
      setTotalProducts(newProducts.total)
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
        <FilterDrawer filter={filter} setFilterSettings={setFilterSettings} />
        <div className="text-sm">
          Total items: <span className="font-bold">({totalProducts})</span>
        </div>
      </div>
      <FilterByTypeProduct
        filter={filter}
        setFilterSettings={setFilterSettings}
      />
      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {products.length === 0 && <ProductsSkeleton />}
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
