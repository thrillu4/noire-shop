import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { values } = await req.json()

    const { name, country, rating, text } = values

    if (!name || !text || !rating) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        name,
        country,
        rating,
        text,
      },
    })

    return NextResponse.json({ review })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
