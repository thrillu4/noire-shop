import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const search = searchParams.get('search') || ''

  if (!search) return NextResponse.json({ products: [] })

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            collection: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            type: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        collection: true,
        type: true,
        price: true,
        images: {
          select: { url: true },
          take: 1,
        },
      },
      take: 10,
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
