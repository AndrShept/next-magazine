import { formatPrice } from '@/lib/format';
import React from 'react';

interface PriceTagProps {
  price: number;
  className?: string;
}

export const PriceTag = ({ price, className }: PriceTagProps) => {
  return (
    <span className={` ${className}  text-muted-foreground text-base  mt-6  font-medium`}>
      {formatPrice(price)}
    </span>
  );
};
