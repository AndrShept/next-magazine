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
        'absolute rounded-full h-[0.9rem] px-[0.438rem] leading-[0.9rem] right-[-2px] top-[1px] text-white bg-black',
        classname
      )}
    >
      <span className='text-[12px]'>{number}</span>
    </div>
  );
};
