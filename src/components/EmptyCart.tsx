import Image from 'next/image';
import React from 'react';

export const EmptyCart = () => {
  return (
    <div className="m-auto  flex justify-center  ">
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-base-100 p-12">
        <h1 className="text-3xl font-semibold text-gray-400">Корзина пуста</h1>
        <p className="text-gray-400">Cпробуйте щось добавити</p>
        <div className="relative h-36 w-36">
          <Image
            fill
            className=" mx-auto rounded-3xl"
            src="https://cdn-icons-png.flaticon.com/128/891/891462.png"
            alt="image"
          />
        </div>
      </div>
    </div>
  );
};
