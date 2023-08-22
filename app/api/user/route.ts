import { strigaFetch } from '@/utils/strigaFetch'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // trick vercel
    const _trick = req.cookies.get('token')

    const user = await strigaFetch(`/user/${process.env.TEST_USER_ID}`, {
      method: 'GET',
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
