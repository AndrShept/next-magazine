import { Contacts } from '@/components/Contacts';

import React from 'react';

export const metadata = {
  title: 'Мої контакти',
};

const page = () => {
  return (
    <div className='mx-auto flex justify-center w-full bg-base-100 items-center rounded-lg flex-col '>
      <Contacts />
    </div>
  );
};

export default page;
