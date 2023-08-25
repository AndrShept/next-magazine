import { formatPrice } from '@/lib/format';
import React from 'react';

interface PriceTagProps {
  price: number;
  className?: string;
}

export const PriceTag = ({ price, className }: PriceTagProps) => {
  return (
    <span className={` ${className}  text-[#f000b8]/80   mt-6  font-medium`}>
      Ціна: {formatPrice(price)}
    </span>
  );
};
