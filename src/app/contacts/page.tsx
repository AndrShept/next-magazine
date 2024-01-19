import { Contacts } from '@/components/Contacts';
import React from 'react';

export const metadata = {
  title: 'Мої контакти',
};

const page = () => {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center rounded-lg bg-base-100 ">
      <Contacts />
    </div>
  );
};

export default page;
