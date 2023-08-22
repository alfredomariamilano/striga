import { strigaFetch } from '@/utils/strigaFetch'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  try {
    // trick vercel
    cookies()

    const bodyObject = {
      userId: process.env.TEST_USER_ID,
      startDate: 1000000000000,
      endDate: Date.now(),
      page: 1,
    }

    const body = JSON.stringify(bodyObject)

    const wallets = await strigaFetch(`/wallets/get/all`, {
      method: 'POST',
      body,
    })

    return NextResponse.json(wallets)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
