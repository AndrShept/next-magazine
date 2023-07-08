import { formatPrice } from '@/lib/format'
import React from 'react'

interface PriceTagProps {
    price: number
    className?: string
}

export const PriceTag = ({price, className}:PriceTagProps) => {
  return (
    <span className={`badge ${className} font-bold text-base`}>Price: {formatPrice(price)}</span>
  )
}
