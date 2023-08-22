'use client'
import { CopyToClipboard } from '@/components/CopyToClipboard'
import { QRCode } from '@/components/QRCode'
import { useLastTransactionStore } from '@/store/lastTransactionStore'
import { CompletedTransaction, Wallet, type Transaction } from '@/utils/types'
import { useEffect, useRef, useState } from 'react'

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
  const [completedTransaction, setCompletedTransaction] =
    useState<CompletedTransaction>()
  const [userWallet, setUserWallet] = useState<Wallet>()
  const [expiresIn, setExpiresIn] = useState(
    getExpiresIn(lastTransaction?.expiry),
  )
  const expiredRef = useRef(!expiresIn)
  expiredRef.current = !expiresIn

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

  useEffect(() => {
    let controller: AbortController

    const fetchCompletedTransaction = () => {
      controller?.abort()
      controller = new AbortController()
      const signal = controller.signal

      fetch(`/api/tx/${lastTransaction?.id}`, { signal })
        .then((res) => res.json())
        .then((res: { transactions: CompletedTransaction[] }) => {
          const completedTransaction = res.transactions[0]

          setCompletedTransaction(() => completedTransaction)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    fetchCompletedTransaction()

    const interval = setInterval(fetchCompletedTransaction, 5000)

    if (completedTransaction) {
      clearInterval(interval)
      controller!?.abort()
    }

    return () => {
      clearInterval(interval)
      controller?.abort()
    }
  }, [completedTransaction, lastTransaction?.id])

  useEffect(() => {
    let controller: AbortController

    const fetchUserWallet = () => {
      controller?.abort()
      controller = new AbortController()
      const signal = controller.signal

      fetch('/api/wallets', { signal })
        .then((res) => res.json())
        .then((res: { wallets: Wallet[] }) => {
          const userWallet = res.wallets[0]

          setUserWallet(() => userWallet)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    if (completedTransaction) {
      fetchUserWallet()
    }

    return () => {
      controller?.abort()
    }
  }, [completedTransaction])

  return (
    <section>
      {completedTransaction && userWallet ? (
        <>
          <h1 className="pt-2 pb-2">
            Transaction {lastTransaction?.id} completed!
          </h1>
          <h1 className="pt-2 pb-2">
            Current BTC balance:{' '}
            <span className="text-green-600">
              {Number(userWallet.accounts.BTC.availableBalance.amount) /
                100000000}
            </span>
          </h1>
        </>
      ) : (
        <>
          <h1 className="pt-2 pb-2">Almost done!</h1>
          <p className="pt-2 pb-2">
            Send BTC using this Bitcoin Lightning Network Invoice id
          </p>
          <div className="flex items-center justify-center pt-2 pb-2">
            <QRCode string={lastTransaction?.invoice!} />
          </div>

          <h1 className="pt-2 pb-2 text-red-600">
            {expiresIn > 0 ? `Expires in: ${formatTime(expiresIn)}` : `Expired`}
          </h1>

          <p className="pt-2 pb-2">
            Striga transaction ID: {lastTransaction?.id}
          </p>

          <div className="pt-2 pb-2">
            <CopyToClipboard valueToCopy={lastTransaction?.invoice!} />
          </div>
        </>
      )}
    </section>
  )
}
