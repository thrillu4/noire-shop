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
    id: number
    productId: number
    url: string
  }[]
  variants: { id: number; size: string; stock: number; productId: number }[]
}

const ClientSingleProduct = ({ product }: { product: PropProduct }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0)
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
    <div className="mt-5 justify-center lg:flex lg:min-h-[70vh] lg:w-full lg:items-center lg:gap-5 xl:items-start 2xl:min-h-[90vh] 2xl:items-center 2xl:gap-15">
      <div className="lg:flex">
        <div className="relative mx-auto h-80 w-full md:h-100 lg:h-120 lg:min-w-[350px] xl:h-150 xl:min-w-[500px] 2xl:h-180">
          <Image
            src={product.images[mainImageIndex].url}
            alt={product.title}
            fill
            className="object-contain lg:object-cover"
          />
        </div>
        {product.images.length > 1 && (
          <>
            <Carousel
              orientation="horizontal"
              className="mx-auto mt-7 md:max-w-3xl lg:hidden lg:min-w-40 lg:flex-col"
            >
              <CarouselContent className="mx-1">
                {product.images.map((img, i) => (
                  <CarouselItem
                    onClick={() => setMainImageIndex(i)}
                    key={img.id}
                    className={`${i === mainImageIndex ? '' : 'opacity-45'} basis-1/3 pl-4 sm:basis-1/4`}
                  >
                    <div className="relative h-20 w-full">
                      <Image
                        src={img.url}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <Carousel
              orientation="vertical"
              className="mx-auto mt-7 hidden md:max-w-3xl lg:block lg:min-w-30"
            >
              <CarouselContent className="mx-1">
                {product.images.map((img, i) => (
                  <CarouselItem
                    onClick={() => setMainImageIndex(i)}
                    key={img.id}
                    className={`${i === mainImageIndex ? '' : 'opacity-45'} basis-1/3 pl-4 sm:basis-1/4`}
                  >
                    <div className="relative h-20 w-full">
                      <Image
                        src={img.url}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-lg px-3 sm:max-w-xl md:max-w-3xl lg:mx-0 lg:max-w-none xl:flex xl:flex-col 2xl:text-xl">
        <div className="flex items-center justify-between gap-5">
          <h1 className="font-bold tracking-widest">{product.title}</h1>
          <Heart
            fill={`${inWishList ? 'red' : 'none'}`}
            color={inWishList ? 'red' : 'black'}
            onClick={handleToggleWishList}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-5">
          <h2 className="opacity-60">
            {product.type.charAt(0).toUpperCase() +
              product.type.slice(1).toLowerCase()}
          </h2>
          <div className="font-bold">${product.price}</div>
        </div>
        <div className="mt-10">{product.description}</div>
        <div className="my-6 space-y-2">
          <div className="opacity-55">Size :</div>
          <div className="flex gap-2">
            {product.variants.length === 0 && (
              <div className="font-bold">Unavailable</div>
            )}
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
                className={`cursor-pointer border-2 px-3 py-2 text-xs 2xl:text-base ${size.size === selectedSize && 'border-black'}`}
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
            <div className="border-2 px-4 py-1 text-base font-extrabold">
              {quant}
            </div>
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
