
import Image from 'next/image';
import React from 'react';

const page = async () => {
  return <div className="space-2  ml-auto h-full max-w-3xl ">

    <Image src={'/flower.png'} alt='omage' width={500} height={500}/>
  </div>;
};

export default page;
