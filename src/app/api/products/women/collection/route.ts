import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const result = await prisma.product.findMany({
      distinct: ['collection'],
      select: { collection: true },
      where: { gender: 'female' },
    })
    const res = result.map(r => r.collection)
    return NextResponse.json({ res })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
