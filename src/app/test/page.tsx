'use client';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';

const TestPage = () => {
  const params = useSearchParams();
  const page = params.get('page');
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
const [users, setUsers] = useState([])
  useEffect(() => {
     const getData = async () => {

      const res  = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await res.json()

      setUsers(data)
    };
    getData()
  }, []);

  console.log(users)

  const addUrl = async () => {
    // setLoading( true)
    // const res = await new Promise(resolve => setTimeout(resolve, 5000))
    // setLoading(false)
    // console.log(res)

    startTransition(async () => {
      const res = await fetch('api/search?' + params);
      return res.json();
    });
  };

  return (
    <div className='flex mx-auto text-gray-600 text-3xl'>
      testPage : {params}
      <Link onClick={addUrl} className='btn btn-primary' href='?page=20'>
        asdadsdsa
      </Link>
      {(isPending || loading) && (
        <span className='loading loading-spinner text-gray-500' />
      )}
    </div>
  );
};

export default TestPage;
