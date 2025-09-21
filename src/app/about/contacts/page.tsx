import { Breadcrumbs } from '@/components/Breadcrumbs'
import ContactUsForm from '@/components/ContactUs/ContactUsForm'
import { CircleCheckBig, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Contacts = () => {
  return (
    <div className="mb-20 overflow-hidden px-3">
      <Breadcrumbs />
      <div className="my-5 space-y-2 text-center font-bold">
        <h2 className="text-2xl">Get in touch with us</h2>
        <h3 className="text-xs opacity-65">
          We’d love to hear from you. Fill out the form below or reach us at…
        </h3>
      </div>
      <div className="mt-10 flex flex-col justify-center gap-12">
        <div>
          <ContactUsForm />
        </div>
        <div className="relative mx-auto max-w-lg">
          <div className="my-5 font-bold">In Noiré you can find:</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <CircleCheckBig className="w-6" /> Wide product selection – From
              daily essentials to exclusive items.
            </li>
            <li className="flex gap-2">
              <CircleCheckBig className="w-6" /> Fast worldwide shipping – Get
              your order delivered quickly, no matter where you are.
            </li>
            <li className="flex gap-2">
              <CircleCheckBig className="w-6" /> Secure payments – Multiple
              payment options with top-level protection.
            </li>
            <li className="flex gap-2">
              <CircleCheckBig className="w-6" /> Eco-friendly packaging – We
              care about the planet as much as our customers.
            </li>
            <li className="flex gap-2">
              <CircleCheckBig className="w-6" /> Trusted by thousands – Join our
              community of happy shoppers.
            </li>
          </ul>
          <div className="absolute top-0 -right-20 opacity-25">
            <Image
              src={'/model.png'}
              alt="model"
              className=""
              width={250}
              height={330}
            />
          </div>
          <div className="mt-15 grid grid-cols-2 gap-3 text-xs break-all">
            <div className="flex gap-2">
              <MapPin className="w-10" />
              <div>Schallmooser Hauptstraße 24,5020 Salzburg, Österreich</div>
            </div>
            <div className="flex gap-2">
              <MapPin className="w-10" />
              <div>Mount Pleasant, Calgary, AB, Canada</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts
