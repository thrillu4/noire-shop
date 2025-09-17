import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { ProductType } from '@/lib/types'
import { ROUTES } from '@/routes'
import { useFilterState } from '@/store/filter'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const FilterByTypeProduct = ({
  propGender,
  setPage,
}: {
  propGender: 'all' | 'male' | 'female'
  setPage: Dispatch<SetStateAction<number>>
}) => {
  const { setFilterSettings, filter, clearFilter } = useFilterState()
  const [isActive, setIsActive] = useState('')
  const [types, setTypes] = useState<ProductType[]>([])

  useEffect(() => {
    if (propGender === 'all') {
      fetch(ROUTES.GET_PRODUCTS_TYPE)
        .then(data => data.json())
        .then(data => setTypes(data.res))
    } else if (propGender === 'male') {
      fetch(ROUTES.GET_PRODUCTS_TYPE_MEN)
        .then(data => data.json())
        .then(data => setTypes(data.res))
    } else if (propGender === 'female') {
      fetch(ROUTES.GET_PRODUCTS_TYPE_WOMEN)
        .then(data => data.json())
        .then(data => setTypes(data.res))
    }
  }, [propGender])

  useEffect(() => {
    setIsActive('')
  }, [
    filter.available,
    filter.collections,
    filter.priceRange,
    filter.sizes,
    filter.gender,
  ])

  return (
    <Carousel className="my-3 w-full">
      <CarouselContent>
        {types.map((type, index) => (
          <CarouselItem
            key={index}
            onClick={() => {
              if (isActive === type.type) {
                setIsActive('')
                setPage(0)
                clearFilter()
              } else {
                setPage(0)
                setFilterSettings({ ...filter, types: [type.type] })
                setIsActive(type.type)
              }
            }}
            className="basis-1/3 pl-4"
          >
            <div
              className={`${isActive === type.type ? 'border-2 border-black' : ''} flex items-center justify-center border py-1 text-xs opacity-70`}
            >
              {type.type.toUpperCase()}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default FilterByTypeProduct
