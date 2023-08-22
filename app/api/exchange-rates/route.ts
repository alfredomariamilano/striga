import { strigaFetch } from '@/utils/strigaFetch'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const exchangeRates = await strigaFetch('/trade/rates', { method: 'POST' })
    /* @ts-ignore */
    return (Response as unknown as NextResponse).json(exchangeRates)
  } catch (error) {
    /* @ts-ignore */
    return (Response as unknown as NextResponse).json(
      /* @ts-ignore */
      { error },
      { status: 500 },
    )
  }
}
