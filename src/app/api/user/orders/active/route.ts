import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await verifySession()

  if (!session.userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const activeOrders = await prisma.order.findMany({
    where: {
      userId: session.userId,
      NOT: { status: { in: ['delivered', 'cancelled'] } },
    },
  })

  return NextResponse.json({ activeOrders })
}
