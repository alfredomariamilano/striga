import { strigaFetch } from '@/utils/strigaFetch'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params: { txId } }: { params: { txId: string } },
) {
  try {
    // trick vercel
    const _trick = req.cookies.get('token')
    const bodyObject = {
      userId: process.env.TEST_USER_ID,
      accountId: '4677a5192e11a061faa80a08c6416363',
      txId,
    }

    const body = JSON.stringify(bodyObject)

    const txStatus = await strigaFetch(
      '/wallets/account/get-transactions-by-id',
      {
        method: 'POST',
        body,
      },
    )

    return NextResponse.json(txStatus)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
