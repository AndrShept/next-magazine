'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export const SearchForm = () => {
  const router = useRouter();

  const searchProducts = (formData: FormData) => {
    const searchQuery = formData.get('searchQuery')?.toString();
    if (searchQuery?.length) {
      router.push(`/search?searchQuery=${searchQuery}`);
    } 
  };

  return (
    <form className=' px-2 md:px-4 ' action={searchProducts}>
      <div className='form-control '>
        <input
          placeholder='search'
          name='searchQuery'
          type='text'
          className='input input-bordered w-full min-w-[50px]'
        />
      </div>
    </form>
  );
};
