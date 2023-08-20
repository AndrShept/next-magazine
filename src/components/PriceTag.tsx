import { formatPrice } from '@/lib/format'
import React from 'react'

interface PriceTagProps {
    price: number
    className?: string
}

export const PriceTag = ({price, className}:PriceTagProps) => {
  return (
    <span className={`badge ${className} p-4 text-white bg-[#f000b8]/80 mt-6  text-base`}>Ціна: {formatPrice(price)}</span>
  )
}
