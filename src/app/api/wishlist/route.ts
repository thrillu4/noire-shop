import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await verifySession()

    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const wishList = await prisma.wishlist.findFirst({
      where: { userId: session.userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { take: 1 },
                variants: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ items: wishList?.items || [] })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
