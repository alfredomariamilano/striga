import { strigaFetch } from '@/utils/strigaFetch'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    // trick vercel
    new URL(req.url)
    const exchangeRates = await strigaFetch('/trade/rates', { method: 'POST' })

    return NextResponse.json(exchangeRates)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
