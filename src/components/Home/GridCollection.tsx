'use client'
import { getProductsFromCollection } from '@/app/actions/getProductsFromCollection'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProductWithImage } from '@/lib/types'
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronDown,
  LoaderCircle,
  Lollipop,
  Plus,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import CollectionProduct from './CollectionProduct'

const GridCollection = () => {
  const [products, setProducts] = useState<ProductWithImage[]>([])
  const [skip, setSkip] = useState(0)
  const [take] = useState(8)
  const [end, setEnd] = useState(false)
  const [gender, setGender] = useState<undefined | 'male' | 'female'>(undefined)
  const [sort, setSort] = useState<undefined | string>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchProducts = async () => {
      const newProducts = await getProductsFromCollection(
        skip,
        take,
        gender,
        sort,
      )
      if (skip > 0) {
        setProducts(prev => [...prev, ...newProducts])
      } else {
        setProducts(newProducts)
      }
      if (take > newProducts.length) {
        setEnd(true)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [gender, skip, sort, take])

  const handleLoadMore = () => {
    setSkip(prev => prev + take)
  }

  const handleFilterGenderChange = (gender: 'male' | 'female' | undefined) => {
    setSkip(0)
    setEnd(false)
    setGender(gender)
  }

  return (
    <>
      <div className="flex items-center justify-between text-sm opacity-70 lg:text-base">
        <ul className="flex items-center gap-4">
          <li
            onClick={() => handleFilterGenderChange(undefined)}
            className="cursor-pointer opacity-100"
          >
            (All)
          </li>
          <li
            className="cursor-pointer"
            onClick={() => handleFilterGenderChange('male')}
          >
            Men
          </li>
          <li
            className="cursor-pointer"
            onClick={() => handleFilterGenderChange('female')}
          >
            Women
          </li>
        </ul>
        <div className="flex items-center gap-1">
          <Select onValueChange={e => setSort(e)}>
            <SelectTrigger
              className="px-2 py-0 text-xs lg:text-base"
              aria-label="Sort products by"
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="sm:mr-2 md:mr-10 lg:mr-2">
              <SelectGroup>
                <SelectLabel>Sort by:</SelectLabel>
                <SelectItem value="new" className="flex items-center gap-1">
                  <Plus /> Newest
                </SelectItem>
                <SelectItem value="default" className="flex items-center gap-1">
                  <Lollipop /> Popularity
                </SelectItem>
                <SelectItem value="low" className="flex items-center gap-1">
                  <ArrowDownWideNarrow /> Low Price
                </SelectItem>
                <SelectItem value="high" className="flex items-center gap-1">
                  <ArrowUpNarrowWide /> High Price
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-3 mb-7 w-full border"></div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:gap-y-10 2xl:grid-cols-4 2xl:gap-x-5">
        {products.map(product => (
          <CollectionProduct key={product.id} product={product} />
        ))}
      </div>
      {!end && (
        <button onClick={handleLoadMore} className="mx-auto mt-8 block">
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <div className="text-sm leading-1 opacity-65 lg:text-lg">
                More
              </div>
              <ChevronDown className="mx-auto lg:size-7" />
            </>
          )}
        </button>
      )}
    </>
  )
}

export default GridCollection
