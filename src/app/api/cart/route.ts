import { verifySession } from '@/lib/sessions'
import { getUserCart } from '@/services/getUserCart'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await verifySession()

    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const cart = await getUserCart(session.userId)
    return NextResponse.json({
      items: cart?.items || [],
    })
  } catch (error) {
    console.log('Cart fetch error', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      { status: 500 },
    )
  }
}
