import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { FilterSettings, ProductType } from '@/lib/types'
import { ROUTES } from '@/routes'
import { useEffect, useState } from 'react'

const FilterByTypeProduct = ({
  setFilterSettings,
  filter,
}: {
  setFilterSettings: (values: FilterSettings) => void
  filter: FilterSettings
}) => {
  const [isActive, setIsActive] = useState('')
  const [types, setTypes] = useState<ProductType[]>([])

  useEffect(() => {
    fetch(ROUTES.GET_PRODUCTS_TYPE)
      .then(data => data.json())
      .then(data => setTypes(data.res))
  }, [])

  return (
    <Carousel className="my-3 w-full">
      <CarouselContent>
        {types.map((type, index) => (
          <CarouselItem
            key={index}
            onClick={() => {
              setFilterSettings({ ...filter, type: type.type })
              setIsActive(type.type)
            }}
            className="basis-1/3 pl-4"
          >
            <div
              className={`${isActive === type.type && 'border-2 border-black'} flex items-center justify-center border py-1 text-xs opacity-70`}
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
