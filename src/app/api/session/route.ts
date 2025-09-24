import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/sessions'

export async function GET() {
  const session = await verifySession()
  return NextResponse.json(session)
}
