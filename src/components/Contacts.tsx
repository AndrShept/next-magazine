import { MailOpen, PhoneIncoming } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export const Contacts = () => {
  return (
    <>
      <div className='text-center max-w-md p-4    '>
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-400 font-bold text-3xl'>
          Мої контакти
        </h1>
        <p className='text-gray-400 font-light mt-4'>
          Sample text Click to select the text box. CLick agains or double click
          to start editing the text
        </p>
      </div>
      <div className='w-full flex  text-black/80 md:flex-row flex-col  '>
        <div className=' flex-1 p-8 items-center justify-center '>
          <div className='flex items-center justify-center gap-2'>
            <PhoneIncoming size={40} strokeWidth={1.5} />
            <div className='flex flex-col'>
              <p>МІЙ ТЕЛЕФОН</p>
              <p className='text-gray-400'>8 050 000 11 22</p>
            </div>
          </div>
        </div>
        <div className=' flex  p-8  items-center justify-center   gap-2'>
          <div className='flex flex-col gap-2 '>
            <div className='flex items-center  gap-2'>
              <Image
                className='h-10 w-10'
                alt='logo'
                width={500}
                height={500}
                src='/viber.png'
              />
              <div className='flex flex-col flex-wrap'>
                <p className='text-left'>VIBER</p>
                <p className='text-gray-400'>8 050 000 11 22</p>
              </div>
            </div>

            <a
              href='https://www.facebook.com/'
              target='_blank'
              className='flex items-center  gap-2 hover:opacity-80'
            >
              <Image
                className='h-10 w-10'
                alt='logo'
                width={500}
                height={500}
                src='/facebook.png'
              />
              <div className='flex flex-col flex-wrap'>
                <p>FACEBOOK</p>
              </div>
            </a>
            <a
              href='https://www.instagram.com/'
              target='_blank'
              className='flex items-center  gap-2 hover:opacity-80'
            >
              <Image
                className='h-10 w-10'
                alt='logo'
                width={500}
                height={500}
                src='/inst.png'
              />
              <div className='flex flex-col flex-wrap'>
                <p>INSTAGRAM</p>
              </div>
            </a>
          </div>
        </div>
        <div className=' flex-1 p-8 items-center justify-center'>
          <div className='flex items-center justify-center gap-2'>
            <MailOpen size={40} strokeWidth={1.5} />
            <div className='flex flex-col '>
              <p className='text-left'>EMAIL</p>
              <p className='text-gray-400'>info@internet.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
