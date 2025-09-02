import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await verifySession()
    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId, quantity = 1, size } = await req.json()

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

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        size: size || null,
      },
    })

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          quantity,
          size: size || null,
          productId,
          cartId: cart.id,
        },
      })
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
    })

    return NextResponse.json({
      success: true,
      items: cartItems,
    })
  } catch (error) {
    console.log('Error with adding items to cart', error)
    return NextResponse.json({ error: 'Invalid server error' }, { status: 500 })
  }
}
