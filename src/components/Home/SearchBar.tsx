'use client'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ROUTES } from '@/routes'
import { Search, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Label } from '../ui/label'

interface Result {
  id: number
  title: string
  collection: string
  type: string
  price: number
  images: [{ url: string }]
}

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [results, setResults] = useState<Result[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const collections = [
    ...new Set(
      results.map(products => {
        return {
          collection: products.collection,
          type: products.type,
        }
      }),
    ),
  ]

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length > 1) {
        fetchProducts(query)
      } else {
        setResults([])
      }
    }, 1000)
    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const fetchProducts = async (search: string) => {
    try {
      setIsLoading(true)
      const res = await fetch(
        `${ROUTES.GET_SEARCH}?search=${encodeURIComponent(search)}`,
      )
      const data = await res.json()
      setResults(data.products)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
      if (results.length === 0) setNotFound(true)
    }
  }

  return (
    <Drawer
      direction="top"
      open={isOpen}
      onOpenChange={() => {
        setNotFound(false)
        setQuery('')
        setIsOpen(!isOpen)
      }}
    >
      <DrawerTrigger className="w-full">
        <div className="flex h-10 items-center justify-between bg-[#d9d9d9] px-3 text-sm opacity-60">
          <Search className="w-4" />
          <div>Search</div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="flex min-h-[35vh] overflow-auto bg-black text-white">
        <DrawerHeader className="mt-5">
          <DrawerTitle className="text-white">Search</DrawerTitle>
          <DrawerDescription>
            Write something in the input field.
          </DrawerDescription>
        </DrawerHeader>
        <div className="my-10 flex items-center justify-center gap-2 px-5">
          <Label htmlFor="search">
            <Search className="w-4" />
          </Label>
          <input
            className="w-full border-none shadow-none focus:outline-none"
            placeholder="Search Noiré"
            autoFocus
            id="search"
            name="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <DrawerClose asChild onClick={() => setQuery('')}>
            <X className="w-6" />
          </DrawerClose>
        </div>

        {query.length > 1 && (
          <>
            {isLoading && (
              <p className="flex animate-pulse items-center gap-2 px-5 pb-10">
                <Search className="size-3 animate-ping" />
                Searching . . .
              </p>
            )}
            {!isLoading && notFound && results.length === 0 && (
              <div className="px-5 pb-10">
                No results found for{' '}
                <span className="font-bold">{`"${query}"`}</span>
              </div>
            )}
            {!isLoading && collections.length > 0 && (
              <div className="space-y-3 border-b bg-white px-5 py-6 text-black">
                <h3 className="tracking-widest opacity-80">Collections</h3>
                <div className="grid grid-cols-2 gap-3 space-y-1">
                  {collections.map((col, i) => (
                    <Link
                      href={`${ROUTES.COLLECTIONS}/${col.collection.charAt(0).toLowerCase() + col.collection.slice(1)}`}
                      key={col.collection + i}
                      className="rounded-sm border px-3 py-1 text-sm"
                    >
                      <span className="opacity-70">{col.collection}</span> /{' '}
                      {col.type.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {!isLoading && results.length > 0 && (
              <div className="space-y-3 border-b bg-white px-5 py-6 text-black">
                <h3 className="tracking-widest opacity-80">Products</h3>
                {results.map(product => (
                  <Link
                    key={product.id}
                    href={`${ROUTES.PRODUCTS}/${product.title}?productId=${product.id}`}
                    className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    {product.images[0] && (
                      <div className="relative h-25 w-25">
                        <Image
                          src={product.images[0].url}
                          alt={product.title}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-between gap-2">
                      <div className="font-medium">{product.title}</div>
                      <div className="text-xs text-gray-500">
                        {product.collection || 'No collection'}
                      </div>
                      <div className="text-xs font-semibold">
                        ${product.price}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default SearchBar
