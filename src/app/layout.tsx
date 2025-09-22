import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar/NavBar'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import './globals.css'
import LoadingState from '@/components/LoadingState'

export const metadata: Metadata = {
  title: 'Noiré',
  description:
    'Discover stylish and affordable clothing for men and women. Our online fashion store offers trendy outfits, everyday essentials, and seasonal collections designed to fit your lifestyle. Shop now for quality apparel with fast and secure delivery.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LoadingState />
        <div className="mx-auto max-w-[600px] sm:max-w-[710px] md:max-w-[968px] lg:max-w-[1220px]">
          <NavBar />
          {children}
        </div>
        <Toaster position="top-center" closeButton richColors />
        <Footer />
      </body>
    </html>
  )
}
