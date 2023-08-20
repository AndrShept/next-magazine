'use client';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
    console.log(value)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <div className='space-y-4 w-full flex flex-col justify-center items-center'>
      <CldUploadButton // npm i next-cloudinary
        onUpload={(result: any) => onChange(result.info.secure_url)}
        options={{ maxFiles: 1 }}
        uploadPreset='t3hvddvv' // cloudinary settings/Upload
      >
        <div className='p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex   '>
          <div className='relative w-40 h-40 '>
            <Image
              className='object-cover rounded-lg'
              fill
              alt='Upload'
              src={value || '/placeholder.svg'}
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};
