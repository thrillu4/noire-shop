import { AddToCartButton } from '@/components/Products/AddToCartButton'
import prisma from '@/lib/prisma'
import Image from 'next/image'

const page = async () => {
  const products = await prisma.product.findMany({
    take: 5,
    include: {
      variants: {
        take: 1,
      },
      images: {
        select: {
          url: true,
        },
      },
    },
  })

  return (
    <div>
      {products.map(pr => (
        <div key={pr.id}>
          {pr.title}
          <div>{pr.price}</div>
          <div className="flex items-center gap-5">
            {pr.images.map((src, i) => (
              <Image
                key={i}
                width={60}
                height={60}
                src={src.url.toString()}
                alt="photo"
              />
            ))}
          </div>
          <AddToCartButton
            productId={pr.id}
            quantity={1}
            size={pr.variants[0].size}
          />
        </div>
      ))}
    </div>
  )
}

export default page
