import { Star } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

export const FavoriteIconButton = () => {
  return (
    <Button
      className='absolute right-2 top-2 h-8 w-8 rounded-full text-yellow-700  md:h-10 md:w-10'
      variant={'secondary'}
      size={'icon'}
    >
      <Star className='h-5 w-6 md:h-[22px] md:w-[22px]' />
    </Button>
  );
};
