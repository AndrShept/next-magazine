import Image from 'next/image';
import React from 'react';

export const EmptyCart = () => {
  return (
    <div className="m-auto flex flex-col items-center justify-center gap-4 rounded-xl bg-base-100 p-12   ">
      <h1 className="text-center text-4xl font-bold ">Корзина пуста</h1>
      <p className="text-gray-400">Cпробуйте щось добавити</p>

      <Image
        width={350}
        height={350}
        className=" mx-auto rounded-3xl"
        src="/empty1.png"
        alt="image"
      />
    </div>
  );
};
