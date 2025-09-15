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
import { ROUTES } from '@/routes'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { FilterSettings, ProductType } from '@/lib/types'

const FilterDrawer = ({
  setFilterSettings,
  filter,
}: {
  setFilterSettings: (values: FilterSettings) => void
  filter: FilterSettings
}) => {
  const [open, setOpen] = useState(false)
  const [types, setTypes] = useState<ProductType[]>([])
  const [collections, setCollections] = useState<string[]>([])
  const [range, setRange] = useState([0, 100])

  useEffect(() => {
    fetch(ROUTES.GET_PRODUCTS_TYPE)
      .then(data => data.json())
      .then(data => setTypes(data.res))
    fetch(ROUTES.GET_PRODUCTS_COLLECTION)
      .then(data => data.json())
      .then(data => setCollections(data.res))
  }, [])
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
                <div className="border px-2 py-1 text-xs">XS</div>
                <div className="border px-2 py-1 text-xs">S</div>
                <div className="border px-2 py-1 text-xs">M</div>
                <div className="border px-2 py-1 text-xs">L</div>
                <div className="border px-2 py-1 text-xs">XL</div>
                <div className="border px-2 py-1 text-xs">2XL</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gender">
              <AccordionTrigger>Gender</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <RadioGroup defaultValue="all">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={[0, 100]}
                  min={0}
                  max={100}
                  step={1}
                  value={range}
                  onValueChange={val => setRange(val)}
                  className="my-4"
                />
                <div className="text-muted-foreground flex justify-between text-sm">
                  <span>${range[0]}</span>
                  <span>${range[1]}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="type">
              <AccordionTrigger>Product type</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                {types.map(obj => (
                  <div className="flex items-center gap-2" key={obj.type}>
                    <Checkbox id={obj.type} />
                    <Label htmlFor={obj.type}>
                      {obj.type} ({obj.count})
                    </Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="collection">
              <AccordionTrigger>Collection</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                {collections.map(col => (
                  <div className="flex items-center gap-2" key={col}>
                    <Checkbox id={col} />
                    <Label htmlFor={col}>{col}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="available">
              <AccordionTrigger>Availability</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <RadioGroup defaultValue="all">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="avail" id="avail" />
                    <Label htmlFor="avail">Available</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="unavail" id="unavail" />
                    <Label htmlFor="unavail">Out of stack</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <SheetFooter>
          <Button>Apply Filter</Button>
          <Button variant="outline">Reset Filter</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default FilterDrawer
