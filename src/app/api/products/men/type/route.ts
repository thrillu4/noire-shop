import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const result = await prisma.product.groupBy({
      by: ['type'],
      where: {
        gender: 'male',
      },
      _count: {
        type: true,
      },
      orderBy: {
        type: 'asc',
      },
    })

    const res = result.map(r => ({
      type: r.type,
      count: r._count.type,
    }))

    return NextResponse.json({ res })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
