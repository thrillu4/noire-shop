'use server'
import prisma from '@/lib/prisma'

export async function getProductsFromCollection(
  skip: number,
  take: number,
  gender: undefined | 'male' | 'female',
  sort: undefined | string,
) {
  const lastCollection = await prisma.product.findFirst({
    where: {
      collection: { not: null },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      collection: true,
    },
  })

  if (!lastCollection?.collection) {
    return []
  }

  let orderBy = {}

  switch (sort) {
    case 'new':
      orderBy = { createdAt: 'desc' }
      break
    case 'low':
      orderBy = { price: 'asc' }
      break
    case 'high':
      orderBy = { price: 'desc' }
    default:
      orderBy = { createdAt: 'asc' }
  }

  const products = await prisma.product.findMany({
    where: {
      // collection: lastCollection?.collection ?? undefined,
      ...(gender ? { gender } : {}),
    },
    include: {
      images: { select: { url: true } },
    },
    skip,
    take,
    orderBy,
  })

  return products
}
