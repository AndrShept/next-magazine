import { formatPrice } from '@/lib/format';
import React from 'react';

interface PriceTagProps {
  price: number;
  className?: string;
}

export const PriceTag = ({ price, className }: PriceTagProps) => {
  return (
    <span
      className={` ${className}  mt-6 text-sm font-medium  text-muted-foreground  sm:text-base`}
    >
      {formatPrice(price)}
    </span>
  );
};
