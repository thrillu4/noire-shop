'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCartStore } from '@/store/cart'
import { useWishListState } from '@/store/wishlist'
import { Heart, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

interface PropProduct {
  id: number
  gender: string
  type: string
  title: string
  description: string
  price: number
  collection: string | null
  createdAt: Date
  updatedAt: Date
  images: {
    url: string
  }[]
  variants: { id: number; size: string; stock: number; productId: number }[]
}

const ClientSingleProduct = ({ product }: { product: PropProduct }) => {
  const [mainImageUrl, setMainImageUrl] = useState(product.images[0].url)
  const [quant, setQuant] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [error, setError] = useState<'size' | 'stock' | false>(false)
  const [stock, setStock] = useState(1)
  const { addWishItem, items, removeWishItem } = useWishListState()
  const { addItem, isLoading } = useCartStore()

  const inWishList = items.some(item => item.productId === product.id)

  const handleToggleWishList = () => {
    if (inWishList) {
      removeWishItem(product.id)
      toast.success(`${product.title} removed from wish list`)
    } else {
      addWishItem(product.id)
      toast.success(`${product.title} added to wish list`)
    }
  }
  return (
    <div className="mt-5">
      <div>
        <Image
          src={mainImageUrl}
          alt={product.title}
          width={305}
          height={305}
        />
      </div>
      <Carousel className="mt-7">
        <CarouselContent className="mx-1">
          {product.images.map(img => (
            <CarouselItem
              onClick={() => setMainImageUrl(img.url)}
              key={img.url}
              className={`${img.url === mainImageUrl ? '' : 'opacity-45'} basis-1/4 pl-4`}
            >
              <Image
                src={img.url}
                alt={product.title}
                width={200}
                height={240}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 px-3">
        <div className="flex items-center justify-between gap-5">
          <h1 className="font-bold tracking-widest">{product.title}</h1>
          <Heart
            fill={`${inWishList ? 'red' : 'none'}`}
            color={inWishList ? 'red' : 'black'}
            onClick={handleToggleWishList}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-5">
          <h2 className="opacity-60">{product.type}</h2>
          <div className="font-bold">${product.price}</div>
        </div>
        <div className="mt-10">{product.description}</div>
        <div className="my-6 space-y-2">
          <div className="opacity-55">Size :</div>
          <div className="flex gap-2">
            {product.variants.map(size => (
              <div
                onClick={() => {
                  if (selectedSize === size.size) {
                    setSelectedSize('')
                  } else {
                    setQuant(1)
                    setSelectedSize(size.size)
                    setStock(size.stock)
                  }
                }}
                key={size.id}
                className={`cursor-pointer border-2 px-3 py-2 text-xs ${size.size === selectedSize && 'border-black'}`}
              >
                {size.size}
              </div>
            ))}
          </div>
        </div>
        <div className="my-6 space-y-2">
          <div className="opacity-55">Quantity :</div>
          <div className="ml-3 flex items-center">
            <button
              disabled={quant === 1}
              className="rounded-l-xl border-2 p-1"
              onClick={() => setQuant(prev => prev - 1)}
            >
              <Minus />
            </button>
            <div className="border-2 px-4 py-1 font-extrabold">{quant}</div>
            <button
              className="rounded-r-xl border-2 p-1"
              onClick={() =>
                selectedSize === ''
                  ? setError('size')
                  : quant >= stock
                    ? setError('stock')
                    : setQuant(prev => prev + 1)
              }
            >
              <Plus />
            </button>
          </div>
          {quant === stock && error === 'stock' && (
            <p className="text-sm text-red-500">
              Only {stock} items are available in stock.
            </p>
          )}
        </div>

        {selectedSize ? (
          <div className="mt-10 flex w-full justify-center">
            <Button
              disabled={isLoading}
              onClick={() => {
                addItem(product.id, quant, selectedSize)
                toast.success('Added to shopping bag!')
              }}
              className="w-full rounded bg-black px-4 py-2 text-white"
            >
              {isLoading ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setError('size')}
                className="mx-auto mt-10 flex w-full rounded opacity-50"
              >
                Add to Cart
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Select Size</p>
            </TooltipContent>
          </Tooltip>
        )}
        {!selectedSize && error === 'size' && (
          <p className="mt-1 text-center text-sm text-red-500">
            Please select the size you need!
          </p>
        )}
      </div>
    </div>
  )
}

export default ClientSingleProduct
