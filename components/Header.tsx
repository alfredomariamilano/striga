'use client'

import { useLastTransactionStore } from '@/store/lastTransactionStore'
import Link from 'next/link'

export const Header = () => {
  const lastTransaction = useLastTransactionStore(
    (state) => state.lastTransaction,
  )

  return (
    <header>
      <nav className="flex">
        <Link href="/">
          <h3 className="p-5">Home</h3>
        </Link>
        {lastTransaction && (
          <Link href="/last-transaction">
            <h3 className="p-5">Last transaction</h3>
          </Link>
        )}
      </nav>
    </header>
  )
}
