import { strigaFetch } from '@/utils/strigaFetch'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const exchangeRates = await strigaFetch('/trade/rates', { method: 'POST' })
    console.log('====================================')
    console.log(exchangeRates)
    console.log('====================================')

    return NextResponse.json(exchangeRates)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
