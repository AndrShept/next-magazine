import React from 'react';

import { Skeleton } from './skeleton';

export const SkeletonProductList = () => {
  return (
    <ul className="mx-auto my-4 grid max-w-md grid-cols-2 gap-6  md:max-w-full md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-4 ">
      {[...Array(8)].map((_, idx) => (

        <Skeleton
          key={idx}
          className="flex h-[230px] w-[160px]  flex-col  sm:h-[260px] sm:w-[200px] md:h-[300px] md:w-[240px]  rounded-xl"
        />
          


      ))}
    </ul>
  );
};
