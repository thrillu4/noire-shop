import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await verifySession()
    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { items } = await req.json()

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ items: [] })
    }

    let wishlist = await prisma.wishlist.findFirst({
      where: { userId: session.userId },
    })

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: {
          userId: session.userId,
        },
      })
    }

    for (const item of items) {
      const { productId } = item

      const product = await prisma.product.findUnique({
        where: { id: productId },
      })

      if (!product) continue

      const existingItem = await prisma.wishlistItem.findFirst({
        where: { productId, wishlistId: wishlist.id },
      })

      if (existingItem) continue

      await prisma.wishlistItem.create({
        data: { wishlistId: wishlist.id, productId },
      })
    }

    const wishListItems = await prisma.wishlistItem.findMany({
      where: { wishlistId: wishlist.id },
    })

    return NextResponse.json({ wishListItems })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
