'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { ProductType } from '@/lib/types'
import { ROUTES } from '@/routes'
import { useFilterState } from '@/store/filter'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

const FilterDrawer = ({
  propCollection,
  propType,
  propGender,
  setPage,
}: {
  propCollection?: string
  propType?: string
  propGender: 'all' | 'male' | 'female'
  setPage: Dispatch<SetStateAction<number>>
}) => {
  const [open, setOpen] = useState(false)
  const [types, setTypes] = useState<ProductType[]>([])
  const [collections, setCollections] = useState<string[]>([])
  const { filter, setFilterSettings, clearFilter } = useFilterState()
  const [gender, setGender] = useState<'all' | 'male' | 'female'>(
    filter.gender || 'all',
  )
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    filter.types || [],
  )
  const [priceRange, setPriceRange] = useState<number[]>(
    filter.priceRange || [0, 100],
  )
  const [selectedCollections, setSelectedCollections] = useState<string[]>(
    filter.collections || [],
  )
  const [sizes, setSizes] = useState<string[]>(filter.sizes || [])
  const [available, setAvailable] = useState<
    'available' | 'unavailable' | 'all'
  >(filter.available || 'all')

  useEffect(() => {
    if (propGender === 'all') {
      fetch(ROUTES.GET_PRODUCTS_TYPE)
        .then(data => data.json())
        .then(data => setTypes(data.res))
      fetch(ROUTES.GET_PRODUCTS_COLLECTION)
        .then(data => data.json())
        .then(data => setCollections(data.res))
    } else if (propGender === 'male') {
      setGender('male')
      fetch(ROUTES.GET_PRODUCTS_TYPE_MEN)
        .then(data => data.json())
        .then(data => setTypes(data.res))
      fetch(ROUTES.GET_PRODUCTS_COLLECTION_MEN)
        .then(data => data.json())
        .then(data => setCollections(data.res))
    } else if (propGender === 'female') {
      setGender('female')
      fetch(ROUTES.GET_PRODUCTS_TYPE_WOMEN)
        .then(data => data.json())
        .then(data => setTypes(data.res))
      fetch(ROUTES.GET_PRODUCTS_COLLECTION_WOMEN)
        .then(data => data.json())
        .then(data => setCollections(data.res))
    }
  }, [propGender])

  const toggleArrayValue = (
    arr: string[],
    value: string,
    set: (value: string[]) => void,
  ) => {
    if (arr.includes(value)) {
      set(arr.filter(params => params !== value))
    } else {
      set([...arr, value])
    }
  }

  const applyFilter = () => {
    setFilterSettings({
      gender,
      types: selectedTypes,
      priceRange,
      collections: selectedCollections,
      sizes,
      available,
    })
    setPage(0)
    setOpen(false)
  }

  const resetFilter = () => {
    setPage(0)
    clearFilter()
    setGender('all')
    setSelectedTypes([])
    setPriceRange([0, 100])
    setSelectedCollections([])
    setSizes([])
    setAvailable('all')
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="inline-flex items-center gap-1 text-lg font-bold">
          Filters{' '}
          {open ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="min-h-screen overflow-auto px-3">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Filters
          </SheetTitle>
        </SheetHeader>
        <div>
          <Accordion type="multiple" defaultValue={['size']} className="w-full">
            <AccordionItem value="size">
              <AccordionTrigger>Size</AccordionTrigger>
              <AccordionContent className="flex gap-1">
                {['XS', 'S', 'M', 'L', 'XL', '2XL'].map(size => (
                  <div
                    onClick={() => toggleArrayValue(sizes, size, setSizes)}
                    key={size}
                    className={`cursor-pointer border px-2 py-1 text-xs ${sizes.includes(size) && 'border-black'}`}
                  >
                    {size}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            {propGender === 'all' && (
              <AccordionItem value="gender">
                <AccordionTrigger>Gender</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  <RadioGroup
                    defaultValue="all"
                    value={gender}
                    onValueChange={val =>
                      setGender(val as 'all' | 'male' | 'female')
                    }
                  >
                    {['all', 'male', 'female'].map(val => (
                      <div className="flex items-center gap-3" key={val}>
                        <RadioGroupItem value={val} id={val} />
                        <Label htmlFor={val}>{val}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            )}
            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={val => setPriceRange(val)}
                  className="my-4"
                />
                <div className="text-muted-foreground flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
            {!propType && (
              <AccordionItem value="type">
                <AccordionTrigger>Product type</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  {types.map(obj => (
                    <div className="flex items-center gap-2" key={obj.type}>
                      <Checkbox
                        checked={selectedTypes.includes(obj.type)}
                        onCheckedChange={() =>
                          toggleArrayValue(
                            selectedTypes,
                            obj.type,
                            setSelectedTypes,
                          )
                        }
                        id={obj.type}
                      />
                      <Label htmlFor={obj.type}>
                        {obj.type} ({obj.count})
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}

            {!propCollection && (
              <AccordionItem value="collection">
                <AccordionTrigger>Collection</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  {collections.map(col => (
                    <div className="flex items-center gap-2" key={col}>
                      <Checkbox
                        checked={selectedCollections.includes(col)}
                        onCheckedChange={() =>
                          toggleArrayValue(
                            selectedCollections,
                            col,
                            setSelectedCollections,
                          )
                        }
                        id={col}
                      />
                      <Label htmlFor={col}>{col}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="available">
              <AccordionTrigger>Availability</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <RadioGroup
                  defaultValue="all"
                  value={available}
                  onValueChange={val =>
                    setAvailable(val as 'all' | 'available' | 'unavailable')
                  }
                >
                  {['all', 'available', 'unavailable'].map(variants => (
                    <div key={variants} className="flex items-center gap-3">
                      <RadioGroupItem value={variants} id={variants} />
                      <Label htmlFor={variants}>{variants}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <SheetFooter>
          <Button onClick={() => applyFilter()}>Apply Filter</Button>
          <Button variant="outline" onClick={() => resetFilter()}>
            Reset Filter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default FilterDrawer
