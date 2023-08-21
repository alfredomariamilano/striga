'use client'

import { useLastTransactionStore } from '@/store/lastTransactionStore'
import { Transaction, type ExchangeRates } from '@/utils/types'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const UPDATE_INTERVAL = 10000

export default function Home() {
  const router = useRouter()
  const [nextUpdatedRate, setNextUpdatedRate] = useState(UPDATE_INTERVAL)
  const setLastTransaction = useLastTransactionStore(
    (state) => state.setLastTransaction,
  )
  const [valueEUR, setValueEUR] = useState<number>(100)
  const [exchangeRateBTCEUR, setExchangeRateBTCEUR] =
    useState<ExchangeRates['BTCEUR']>()
  const valueBTC = useMemo(() => {
    return valueEUR / Number(exchangeRateBTCEUR?.price)
  }, [valueEUR, exchangeRateBTCEUR])

  useEffect(() => {
    const interval = setInterval(() => {
      setNextUpdatedRate((nextUpdatedRate) => {
        return Math.max(0, nextUpdatedRate - 1000)
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  useEffect(() => {
    let controller: AbortController

    const fetchExchangeRateBTCEUR = () => {
      controller?.abort()
      controller = new AbortController()
      const signal = controller.signal

      fetch('/api/exchange-rates', { signal })
        .then((res) => res.json())
        .then((res: ExchangeRates) => {
          setExchangeRateBTCEUR(() => res.BTCEUR)
          setNextUpdatedRate(UPDATE_INTERVAL)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    fetchExchangeRateBTCEUR()

    const interval = setInterval(fetchExchangeRateBTCEUR, UPDATE_INTERVAL)

    return () => {
      clearInterval(interval)
      controller?.abort()
    }
  }, [])

  const createInvoice = useCallback(() => {
    fetch('/api/lightning-topup', {
      method: 'POST',
      body: JSON.stringify({
        amount: (valueBTC * 100000000).toFixed(0),
      }),
    })
      .then((res) => res.json())
      .then((transaction: Transaction) => setLastTransaction(transaction))
      .then(() => router.push('/last-transaction'))
  }, [router, setLastTransaction, valueBTC])

  return (
    <section className="flex flex-col items-center justify-center">
      <h3>Create a Bitcoin Lightning Network Invoice</h3>
      <br />
      <div>
        <h4>EUR</h4>
        <Input
          className="focus:outline-none"
          type="number"
          style={{
            color: 'rgb(var(--background-rgb))',
            background: 'rgb(var(--foreground-rgb))',
          }}
          value={valueEUR}
          onChange={(e) => {
            setValueEUR(() => e.target.valueAsNumber)
          }}
        />
        <br />
        <hr />
        <br />
        <h4>
          BTC <small>(next update in {nextUpdatedRate / 1000}s)</small>
        </h4>
        <Input
          className="focus:outline-none"
          type="number"
          style={{
            color: 'rgb(var(--background-rgb))',
            background: 'rgb(var(--foreground-rgb))',
          }}
          disabled
          value={valueBTC}
          onChange={() => {}}
        />
      </div>

      <br />

      <Button onClick={createInvoice}>Create Invoice</Button>
    </section>
  )
}
