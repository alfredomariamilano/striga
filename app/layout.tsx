import { Modal } from '@/components/Modal'
import './globals.css'
import './globals.shadcn.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Striga Exchange',
  description: 'Striga Exchange',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="p-5 flex-1 flex justify-center items-center">
          <Modal>{children}</Modal>
        </main>
      </body>
    </html>
  )
}
