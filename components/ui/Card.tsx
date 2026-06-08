import { ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
  className?: string
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`doc-card ${className}`}>
      {title && <h3 className="text-lg font-medium text-white mb-3">{title}</h3>}
      {children}
    </div>
  )
}