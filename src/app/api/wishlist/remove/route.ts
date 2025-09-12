import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
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

    const wishlist = await prisma.wishlist.findFirst({
      where: { userId: session.userId },
    })

    if (!wishlist)
      return NextResponse.json(
        { error: 'Wish list not found' },
        { status: 404 },
      )

    const wishListItem = await prisma.wishlistItem.findFirst({
      where: { productId, wishlistId: wishlist.id },
    })

    if (!wishListItem)
      return NextResponse.json(
        { error: 'Wish list item not found' },
        { status: 404 },
      )

    await prisma.wishlistItem.delete({
      where: { id: wishListItem.id, productId, wishlistId: wishlist.id },
    })

    const allWishListItems = await prisma.wishlistItem.findMany({
      where: { wishlistId: wishlist.id },
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
