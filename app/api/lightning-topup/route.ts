import { strigaFetch } from '@/utils/strigaFetch'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { amount } = await req.json()

    const bodyObject = {
      userId: process.env.TEST_USER_ID,
      accountId: '4677a5192e11a061faa80a08c6416363',
      amount,
      ttl: 1440,
      // ttl: 10,
    }

    const body = JSON.stringify(bodyObject)

    const lightningTopup = await strigaFetch(
      '/wallets/account/lightning/topup',
      {
        method: 'POST',
        body,
      },
    )
    console.log('====================================')
    console.log(lightningTopup)
    console.log('====================================')

    return NextResponse.json(lightningTopup)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
