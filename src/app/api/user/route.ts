import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/sessions'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await verifySession()

  if (!session.userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  })

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 401 })

  return NextResponse.json({ success: true, user })
}
