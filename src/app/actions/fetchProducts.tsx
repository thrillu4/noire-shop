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
  const { available, collections, gender, priceRange, sizes, types } = filter

  if (gender !== 'all') where.gender = gender
  if (types?.length) where.type = { in: types }
  if (priceRange?.length === 2) {
    where.price = {
      gte: priceRange[0],
      lte: priceRange[1],
    }
  }
  if (collections?.length) where.collection = { in: collections }
  if (sizes?.length) where.variants = { some: { size: { in: sizes } } }
  if (available !== 'all') {
    if (available === 'available')
      where.variants = { some: { stock: { gt: 0 } } }
    if (available === 'unavailable')
      where.variants = { some: { stock: { lte: 0 } } }
  }
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
      prisma.product.findMany({
        distinct: ['id'],
        where,
      }),
    ])

    return { products, total: total.length }
  } catch (error) {
    console.log('Server error', error)
    return { products: [], total: 0 }
  }
}
