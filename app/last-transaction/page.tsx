'use client'
import { QRCode } from '@/components/QRCode'
import { useLastTransactionStore } from '@/store/lastTransactionStore'

export default function TestPage() {
  const lastTransaction = useLastTransactionStore(
    (state) => state.lastTransaction,
  )

  return (
    <>
      <QRCode string={lastTransaction?.invoice!} />
    </>
  )
}
