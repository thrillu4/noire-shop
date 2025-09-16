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
import { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import Link from 'next/link'
import Image from 'next/image'

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length > 1) {
        fetchProducts(query)
      } else {
        setResults([])
      }
    }, 1100)
    return () => clearTimeout(handler)
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
    }
  }

  return (
    <Drawer direction="top" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="w-full">
        <div className="flex h-10 items-center justify-between bg-[#d9d9d9] px-3 text-sm opacity-60">
          <Search className="w-4" />
          <div>Search</div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="flex min-h-[35vh] justify-center gap-7 bg-black px-5 text-white">
        <DrawerHeader>
          <DrawerTitle className="text-white">Search</DrawerTitle>
          <DrawerDescription>
            Write something in the input field.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center justify-center gap-2">
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
          <DrawerClose asChild>
            <X className="w-6" />
          </DrawerClose>
        </div>
        {isLoading && <p>loading........</p>}
        {query && results.length === 0 && (
          <div className="font-bold">No results found for {`"${query}"`}</div>
        )}

        {/* /////////// */}
        {!isLoading &&
          results.map(product => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100"
            >
              {product.images[0] && (
                <Image
                  src={product.images[0].url}
                  alt={product.title}
                  width={40}
                  height={40}
                  className="rounded object-cover"
                />
              )}
              <div>
                <div className="font-medium">{product.title}</div>
                <div className="text-xs text-gray-500">
                  {product.collection || 'No collection'}
                </div>
                <div className="text-xs font-semibold">${product.price}</div>
              </div>
            </Link>
          ))}
      </DrawerContent>
    </Drawer>
  )
}

export default SearchBar
