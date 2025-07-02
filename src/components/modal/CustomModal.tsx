import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export default function CustomModal({ children }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      {children}
    </div>
  )
}
