import { Contacts } from '@/components/Contacts';
import { MailOpen, PhoneIncoming } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const page = () => {
  return (
    <div className='mx-auto flex justify-center w-full bg-base-100 items-center rounded-lg flex-col '>
      <Contacts />
    </div>
  );
};

export default page;
