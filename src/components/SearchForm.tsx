'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import qs from 'query-string';
import React, { useEffect, useState, useTransition } from 'react';

import { Input } from './ui/input';

export const SearchForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState('');

  const url = qs.stringifyUrl(
    {
      url: pathname,
      query: { searchValue },
    },
    { skipEmptyString: true, skipNull: true },
  );

  const handleClearInput = () => {
    setSearchValue('');
  };

  useEffect(() => {
    startTransition(() => {
      router.push(url);
    });
  }, [router, searchValue, url]);
  return (
    <form className=" grid grid-cols-4  items-center px-2 sm:grid-cols-8 md:px-4 xl:grid-cols-10    ">
      <div className="relative col-span-6  flex sm:w-[280px] md:w-[280] lg:w-[340px] xl:col-span-8">
        <MagnifyingGlassIcon className="absolute left-2 top-2 h-6 w-6 text-gray-500" />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.trimStart())}
          placeholder="пошук..."
          className=" h-10 w-full min-w-[50px] px-9 "
        />
        {searchValue && (
          <XMarkIcon
            onClick={handleClearInput}
            className="absolute right-2 top-2 h-6 w-6 text-gray-500 opacity-70 hover:opacity-100 "
          />
        )}
      </div>
      <div className="col-span-2 hidden sm:block">
        {isPending && <Loader2 className=" ml-2 animate-spin" />}
      </div>
    </form>
  );
};
