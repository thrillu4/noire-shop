import { Mail } from 'lucide-react'
import React from 'react'

const ContactUsLink = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <div className="my-4 w-full border"></div>

      <div className="my-7">
        <div className="text-center text-sm font-semibold text-neutral-500">
          {children}
        </div>
        <div className="my-5">
          <a
            href="mailto:noire.shop.help@gmail.com"
            className="flex items-center justify-center gap-3"
          >
            <Mail />
            noire.shop.help@gmail.com
          </a>
        </div>
      </div>
    </>
  )
}

export default ContactUsLink
