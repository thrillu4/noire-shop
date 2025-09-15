'use server'
import prisma from '@/lib/prisma'
import { FilteredProduct, FilterSettings } from '@/lib/types'

export async function fetchProducts(
  skip: number,
  take: number,
  filter: FilterSettings,
): Promise<{ products: FilteredProduct[]; total: number }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {}
  const { available, collection, gender, maxPrice, minPrice, size, type } =
    filter

  if (gender) where.gender = gender
  if (type) where.type = type
  if (minPrice) where.price = { gte: minPrice }
  if (maxPrice) where.price = { ...where.price, lte: maxPrice }
  if (collection) where.collection = collection
  if (size) where.variants = { some: { size } }
  if (available) where.variants = { some: { stock: { gt: 0 } } }

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        include: {
          images: { select: { url: true } },
          variants: { select: { size: true, stock: true } },
        },
      }),
      prisma.product.count({
        where,
      }),
    ])

    return { products, total }
  } catch (error) {
    console.log('Server error', error)
    return { products: [], total: 0 }
  }
}
