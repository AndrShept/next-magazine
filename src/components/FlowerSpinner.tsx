import { Flower, Loader2 } from 'lucide-react';
import React from 'react';

export const FlowerSpinner = () => {
  return (
    <div className='w-full flex justify-center items-center h-60 text-center'>
      {/* <Flower
        size={50}
        strokeWidth={1.3}
        className='animate-spin text-pink-600'
      /> */}
      <Loader2 size={40} className='animate-spin'/>
    </div>
  );
};
