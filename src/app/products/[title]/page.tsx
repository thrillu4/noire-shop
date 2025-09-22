'use server'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import ClientSingleProduct from '@/components/Products/ClientSingleProduct'
import prisma from '@/lib/prisma'

const SingleProduct = async ({
  searchParams,
}: {
  searchParams: Promise<{ productId: string }>
}) => {
  const { productId } = await searchParams

  const product = await prisma.product.findUnique({
    where: { id: Number(productId) },
    include: {
      images: true,
      variants: true,
    },
  })

  if (!product) return <div>no</div>
  return (
    <div className="mb-20">
      <div className="px-3">
        <Breadcrumbs />
      </div>
      <ClientSingleProduct product={product} />
    </div>
  )
}

export default SingleProduct
