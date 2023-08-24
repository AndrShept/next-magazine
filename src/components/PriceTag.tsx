import { formatPrice } from '@/lib/format'
import React from 'react'

interface PriceTagProps {
    price: number
    className?: string
}

export const PriceTag = ({price, className}:PriceTagProps) => {
  return (
    <span className={`badge ${className} p-4 text-[#f000b8]/80 border-2 border-[#f000b8]/80 mt-6  text-base`}>Ціна: {formatPrice(price)}</span>
  )
}
