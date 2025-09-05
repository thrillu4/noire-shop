import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request) {
  try {
    const session = await verifySession()
    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { cartItemId, productId, quantity, size } = await req.json()

    if (quantity <= 0) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 })
    }

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID required!' },
        { status: 400 },
      )
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        variants: size ? { where: { size } } : true,
        images: { take: 1 },
      },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found!' }, { status: 404 })
    }

    if (size) {
      const variant = product.variants.find(variant => variant.size === size)
      if (!variant) {
        return NextResponse.json({ error: 'Size not found' }, { status: 404 })
      }
      if (variant.stock < quantity) {
        return NextResponse.json(
          { error: 'Insufficient stock' },
          { status: 400 },
        )
      }
    }

    if (!cartItemId)
      return NextResponse.json(
        { error: 'Cart item ID required!' },
        { status: 400 },
      )

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    })

    if (!updatedItem)
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })

    const cart = await prisma.cart.findFirst({
      where: { userId: session.userId },
    })

    if (!cart)
      return NextResponse.json({ error: 'Cart not found!' }, { status: 404 })

    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: {
        product: {
          include: {
            images: { take: 1 },
            variants: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return NextResponse.json({ success: true, items: cartItems })
  } catch (error) {
    console.log('Error with updating quantity item', error)
    return NextResponse.json({ error: 'Invalid server error' }, { status: 500 })
  }
}
