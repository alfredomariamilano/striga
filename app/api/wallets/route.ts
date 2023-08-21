import { strigaFetch } from '@/utils/strigaFetch'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
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

    console.log('====================================')
    console.log(wallets)
    console.log('====================================')

    return NextResponse.json(wallets)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
