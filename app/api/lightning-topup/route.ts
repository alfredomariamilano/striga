import { strigaFetch } from '@/utils/strigaFetch'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    // trick vercel
    cookies()

    const { amount } = await req.json()

    const bodyObject = {
      userId: process.env.TEST_USER_ID,
      accountId: '4677a5192e11a061faa80a08c6416363',
      amount,
      // ttl: 1440,
      ttl: 10,
    }

    const body = JSON.stringify(bodyObject)

    const lightningTopup = await strigaFetch(
      '/wallets/account/lightning/topup',
      {
        method: 'POST',
        body,
      },
    )

    return NextResponse.json(lightningTopup)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
