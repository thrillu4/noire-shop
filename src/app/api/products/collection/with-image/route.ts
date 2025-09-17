import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const result = await prisma.product.findMany({
      distinct: ['collection'],
      select: { collection: true, images: { select: { url: true } } },
    })
    const res = result.map(r => {
      return { collections: r.collection, images: r.images }
    })
    return NextResponse.json({ res })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
