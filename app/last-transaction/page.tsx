'use client'
import { QRCode } from '@/components/QRCode'
import { useLastTransactionStore } from '@/store/lastTransactionStore'
import { type Transaction } from '@/utils/types'
import { useEffect, useState } from 'react'

const getCurrentTime = () => Math.round(Date.now() / 1000)

const getExpiresIn = (expiry?: Transaction['expiry']) => {
  return Math.max(0, (expiry || getCurrentTime()) - getCurrentTime())
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

export default function TestPage() {
  const lastTransaction = useLastTransactionStore(
    (state) => state.lastTransaction,
  )
  const [expiresIn, setExpiresIn] = useState(
    getExpiresIn(lastTransaction?.expiry),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const newExpiresIn = getExpiresIn(lastTransaction?.expiry)
      setExpiresIn(() => newExpiresIn)

      if (newExpiresIn <= 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [lastTransaction?.expiry])

  return (
    <>
      {expiresIn > 0 ? (
        <h1>Expires in: {formatTime(expiresIn)}</h1>
      ) : (
        <h1>Expired</h1>
      )}

      <QRCode string={lastTransaction?.invoice!} />
    </>
  )
}
