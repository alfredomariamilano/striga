import { useRef, useEffect, type CSSProperties } from 'react'
import QR from 'qrcode'

interface QRCodeProps {
  string: string
  style?: CSSProperties
}

export const QRCode = ({ string, style }: QRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    QR.toCanvas(canvasRef.current!, string, { width: 200 })
  }, [string])

  return <canvas ref={canvasRef} style={style} />
}
