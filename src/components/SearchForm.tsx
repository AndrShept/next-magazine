'use client';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { Input } from './ui/input';

export const SearchForm = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [isPending, startTransition] = useTransition();
  // const searchQuery = formData.get('searchQuery')?.toString();

  // if (searchValue?.length) {
  //   router.push(`/search?searchQuery=${searchValue}`);
  // }
  // if (!searchValue?.length) {
  //   router.push(`/`);
  // }

  const handleSubmit = (e:any) => {
    e.preventDefault(); // Зупиняємо дефолтну поведінку форми
    if (searchValue?.length) {
      router.push(`/search?searchQuery=${searchValue}`);
    } else {
      router.push(`/`);
    }
  };
  const onChange = (e: any) => {
    startTransition(() => {
      setSearchValue(e.target.value);
    });
  };
  const handleCLick = () => {
    setSearchValue('');
    router.push(`/`);
  };

  return (
    <form className=' px-2 md:px-4   ' onSubmit={handleSubmit}>
      <div className='form-control '>
        <div className='relative flex'>
          <MagnifyingGlassIcon className='h-6 w-6 text-gray-500 left-2 top-2 absolute' />
          <Input
            value={searchValue.trimStart()}
            onChange={onChange}
            placeholder='пошук...'
            className=' w-full min-w-[50px] pl-9 h-10 '
          />
          {searchValue && (
            <XMarkIcon
              onClick={handleCLick}
              className='h-6 w-6 text-gray-500 absolute right-2 top-2 opacity-70 hover:opacity-100 '
            />
          )}
        </div>
      </div>
    </form>
  );
};
