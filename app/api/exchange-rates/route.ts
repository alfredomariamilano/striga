import { strigaFetch } from '@/utils/strigaFetch'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // trick vercel
    const _trick = req.cookies.get('token')
    const exchangeRates = await strigaFetch('/trade/rates', { method: 'POST' })

    return NextResponse.json(exchangeRates)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
