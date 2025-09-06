'use client'
import { Breadcrumbs } from '@/components/Breadcrumbs'

import { useState } from 'react'

import CardTabs from '@/components/Checkout/CardTabs'
import YourOrder from '@/components/Checkout/YourOrder'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CreditCard, PackageOpen, Truck } from 'lucide-react'

const Payment = () => {
  const [isOpen, setIsOpen] = useState(false)
  console.log(isOpen)

  return (
    <div className="px-2">
      <Breadcrumbs />
      <h2 className="mt-4 text-2xl font-extrabold">Payment & Delivery</h2>

      <h3 className="mt-5 mb-2 font-bold">Payment method</h3>
      <div className="mt-4 mb-10">
        <RadioGroup defaultValue="card">
          <Label htmlFor="r1" className="flex justify-between">
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="card"
                className="border-black"
                id="r1"
                onClick={() => setIsOpen(true)}
              />
              <CreditCard /> Credit or Debit Card
            </div>
            <div className="flex items-center gap-2">
              <Truck /> <span className="text-sm text-green-600">Free</span>
            </div>
          </Label>
          {isOpen && <CardTabs />}
          <Label htmlFor="r2" className="flex justify-between">
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="delivery"
                className="border-black"
                id="r2"
                onClick={() => setIsOpen(false)}
              />
              <PackageOpen /> Pay on delivery
            </div>
            <div className="flex items-center gap-2">
              <Truck /> <span>$2.5</span>
            </div>
          </Label>
        </RadioGroup>
      </div>
      <YourOrder />
    </div>
  )
}

export default Payment
