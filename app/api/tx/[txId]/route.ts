import { strigaFetch } from '@/utils/strigaFetch'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params: { txId } }: { params: { txId: string } },
) {
  try {
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
    console.log('====================================')
    console.log(txStatus)
    console.log('====================================')

    return NextResponse.json(txStatus)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
