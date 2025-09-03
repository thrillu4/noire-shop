import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
  try {
    const session = await verifySession()
    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId, size } = await req.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 },
      )
    }

    const cart = await prisma.cart.findFirst({
      where: { userId: session.userId },
    })

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    const deleted = await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId, ...(size ? { size } : {}) },
    })

    if (deleted.count === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const updatedCartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: {
        product: {
          include: {
            images: { take: 1 },
            variants: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, items: updatedCartItems })
  } catch (error) {
    console.log('Product remove error', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
