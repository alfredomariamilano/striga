import style from './style.module.css'
import { PropsWithChildren } from 'react'

export const Modal = ({ children }: PropsWithChildren) => {
  return <div className={`${style.Modal} rounded`}>{children}</div>
}
