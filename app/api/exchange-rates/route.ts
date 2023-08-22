import { strigaFetch } from '@/utils/strigaFetch'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  try {
    // trick vercel
    cookies()
    const exchangeRates = await strigaFetch('/trade/rates', { method: 'POST' })

    return NextResponse.json(exchangeRates)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
