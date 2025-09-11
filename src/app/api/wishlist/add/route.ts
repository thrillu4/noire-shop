import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await verifySession()

    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId } = await req.json()

    if (!productId)
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 },
      )

    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product)
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })

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

    const existingProductInWishList = await prisma.wishlistItem.findFirst({
      where: { productId, wishlistId: wishlist.id },
    })

    if (existingProductInWishList)
      return NextResponse.json(
        { error: 'Product already in wishlist' },
        { status: 400 },
      )

    await prisma.wishlistItem.create({
      data: {
        productId,
        wishlistId: wishlist.id,
      },
    })

    const allWishListItems = await prisma.wishlistItem.findMany({
      where: { productId, wishlistId: wishlist.id },
      include: {
        product: {
          include: {
            images: { take: 1 },
            variants: true,
          },
        },
      },
    })

    return NextResponse.json({ items: allWishListItems })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
