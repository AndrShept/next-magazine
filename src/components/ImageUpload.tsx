'use client';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled: boolean;
  imageArr: string[];
  setImageArr: any;
  heroImage : string;
  setHeroImage: (img: string) => void
  
}

export const ImageUpload = ({
  imageArr,
  
  setImageArr,
  value,
  onChange,
  disabled,
  heroImage,
  setHeroImage
}: ImageUploadProps) => {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setHeroImage(imageArr[index])
    setIsMounted(true);
  }, [imageArr, index, setHeroImage]);
  if (!isMounted) return null;
  return (
    <>
      <div className='space-y-4 w-full flex flex-col justify-center items-center'>
        <CldUploadButton // npm i next-cloudinary
          onUpload={(result: any) => {
            onChange(result.info.secure_url);
            setImageArr((prev: any) => [...prev, result.info.secure_url]);
          }}
          options={{ maxFiles: 6, multiple: true }}
          uploadPreset='t3hvddvv' // cloudinary settings/Upload
        >
          <div className='p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex   '>
            <div className='relative w-40 h-40 '>
              <Image
                priority
                className='object-cover rounded-lg'
                fill
                alt='Upload'
                src={imageArr[index]  || '/placeholder.svg'}
              />
            </div>
          </div>
        </CldUploadButton>
      </div>
      <div className='w-full  flex justify-center gap-2 mt-10 flex-wrap'>
        {imageArr.map((item: any, i: number) => (
          <div
            onClick={() => setIndex(i)}
            className={`relative w-24 h-24  flex gap-4   cursor-pointer  border-2 overflow-hidden hover:opacity-90  duration-200 ${
              index === i ? 'border-pink-500/70 ' : 'border-transparent'
            }  `}
            key={item}
          >
            <Image
              className='object-cover duration-200  p-1  '
              fill
              alt='Upload'
              src={item || '/placeholder.svg'}
            />
          </div>
        ))}
      </div>
    </>
  );
};
