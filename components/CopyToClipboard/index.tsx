import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import style from './style.module.css'
import { Input } from '@/components/ui/input'

interface CopyToClipboardProps {
  valueToCopy: string
}

export const CopyToClipboard = ({ valueToCopy }: CopyToClipboardProps) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(() => false)
    }, 2500)

    return () => {
      clearTimeout(timeout)
    }
  }, [copied])

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy)
        setCopied(() => true)
      }}
    >
      <Input
        className="cursor-pointer pointer-events-none"
        value={valueToCopy}
        style={{
          color: 'rgb(var(--background-rgb))',
          background: 'rgb(var(--foreground-rgb))',
        }}
        onChange={() => {}}
      />
      <Button className={style.CopyToClipboard}>
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  )
}
