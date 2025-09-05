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
      return NextResponse.json({ success: true, items: [] })
    }

    let cart = await prisma.cart.findFirst({
      where: { userId: session.userId },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.userId,
        },
      })
    }

    for (const item of items) {
      const { productId, quantity, size } = item

      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { variants: true },
      })

      if (!product) continue

      if (size) {
        const variant = product.variants.find(item => item.size === size)
        if (!variant || variant.stock < quantity) continue
      }

      const existingItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          size: size || null,

          productId,
        },
      })

      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + quantity,
          },
        })
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
            size: size || null,
          },
        })
      }
    }

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

    return NextResponse.json({
      success: true,
      items: cartItems,
    })
  } catch (error) {
    console.log('Error with migrating local cart', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
