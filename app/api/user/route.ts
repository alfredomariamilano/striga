import { strigaFetch } from '@/utils/strigaFetch'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  try {
    // trick vercel
    cookies()

    const user = await strigaFetch(`/user/${process.env.TEST_USER_ID}`, {
      method: 'GET',
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
