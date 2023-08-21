import { strigaFetch } from '@/utils/strigaFetch'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const user = await strigaFetch(`/user/${process.env.TEST_USER_ID}`, {
      method: 'GET',
    })

    console.log('====================================')
    console.log(user)
    console.log('====================================')

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
