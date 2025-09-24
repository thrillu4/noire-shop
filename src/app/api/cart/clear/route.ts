import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import { NextResponse } from 'next/server'

export async function DELETE() {
  const session = await verifySession()
  if (!session.userId) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 })
  }

  const cart = await prisma.cart.findFirst({
    where: { userId: session.userId },
  })

  if (!cart) {
    return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
  }

  const clearCartItemsCount = await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  })

  return NextResponse.json({ success: true, count: clearCartItemsCount })
}
