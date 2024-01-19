import { cn } from '@/lib/utils';
import React from 'react';

interface IndicatorProps {
  number: number;
  classname?: string;
}

export const Indicator = ({ number = 1, classname }: IndicatorProps) => {
  return (
    <div
      className={cn(
        'absolute right-[-2px] top-[1px] h-[0.9rem] rounded-full bg-black px-[0.438rem] leading-[0.9rem] text-white',
        classname,
      )}
    >
      <span className="text-[12px]">{number}</span>
    </div>
  );
};
