import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { productIds } = await req.json()

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json([])
    }

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      include: {
        images: { take: 1 },
        variants: true,
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.log('Local cart error', error)
    return NextResponse.json(
      {
        error: 'Invalid server error',
      },
      { status: 500 },
    )
  }
}
