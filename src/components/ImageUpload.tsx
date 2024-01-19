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
  heroImage: string;
  setHeroImage: (img: string) => void;
}

export const ImageUpload = ({
  imageArr,

  setImageArr,
  value,
  onChange,
  disabled,
  heroImage,
  setHeroImage,
}: ImageUploadProps) => {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setHeroImage(imageArr[index]);
    setIsMounted(true);
  }, [imageArr, index, setHeroImage]);
  if (!isMounted) return null;
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center space-y-4">
        <CldUploadButton // npm i next-cloudinary
          onUpload={(result: any) => {
            onChange(result.info.secure_url);
            setImageArr((prev: any) => [...prev, result.info.secure_url]);
          }}
          options={{ maxFiles: 6, multiple: true }}
          uploadPreset="t3hvddvv" // cloudinary settings/Upload
        >
          <div className="flex rounded-lg border-4 border-dashed border-primary/10 p-4 transition hover:opacity-75   ">
            <div className="relative h-40 w-40 ">
              <Image
                priority
                className="rounded-lg object-cover"
                fill
                alt="Upload"
                src={imageArr[index] || '/placeholder.svg'}
              />
            </div>
          </div>
        </CldUploadButton>
      </div>
      <div className="mt-10  flex w-full flex-wrap justify-center gap-2">
        {imageArr.map((item: any, i: number) => (
          <div
            onClick={() => setIndex(i)}
            className={`relative flex h-24  w-24 cursor-pointer   gap-4  overflow-hidden border-2 duration-200  hover:opacity-90 ${
              index === i ? 'border-pink-500/70 ' : 'border-transparent'
            }  `}
            key={item}
          >
            <Image
              className="object-cover p-1  duration-200  "
              fill
              alt="Upload"
              src={item || '/placeholder.svg'}
            />
          </div>
        ))}
      </div>
    </>
  );
};
