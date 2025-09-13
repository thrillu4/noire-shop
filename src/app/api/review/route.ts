import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const take = parseInt(searchParams.get('take') || '6', 10)

    const reviews = await prisma.review.findMany({
      take,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ reviews: reviews })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
