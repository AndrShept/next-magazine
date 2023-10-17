'use client';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import { Input } from './ui/input';
import qs from 'query-string';
import { Loader2 } from 'lucide-react';

export const SearchForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState('');

  const url = qs.stringifyUrl(
    {
      url: '/',
      query: { searchValue },
    },
    { skipEmptyString: true }
  );

  const handleCLick = () => {
    setSearchValue('');
  };

  useEffect(() => {
    startTransition(() => {
      router.push(url);
    });
  }, [searchValue]);
  return (
    <form className=' px-2 md:px-4  items-center grid grid-cols-12  '>
      <div className='relative flex lg:w-[340px] sm:w-[280px] col-span-10'>
        <MagnifyingGlassIcon className='h-6 w-6 text-gray-500 left-2 top-2 absolute' />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.trimStart())}
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
      <div className='col-span-2'>
        {isPending && <Loader2 className=' ml-2 animate-spin' />}
      </div>
    </form>
  );
};
