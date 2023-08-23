'use client';
import { ArrowLeft, FileEdit, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import { useRouter } from 'next/navigation';
import { Product } from '@prisma/client';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPrice } from '@/lib/format';
import { TableIcons } from './TableIcons';
import { Button } from './ui/button';

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const res = await fetch('/api/product', {
        method: 'DELETE',
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <div className='space-y-2 w-full  '>
      <div className='flex items-center gap-2'>
        <div
          onClick={() => router.back()}
          className='cursor-pointer rounded-full p-2 hover:bg-zinc-300'
        >
          <ArrowLeft className='text-gray-600' />
        </div>
        <div>
          <h3 className='text-lg font-medium'>Назад</h3>
          <p className='text-sm text-muted-foreground'>
            General information about your Product
          </p>
        </div>
        <div className='ml-6'>
          <Button onClick={handleClick}>Delete ALL</Button>
        </div>
      </div>
      <Separator className='bg-primary/10' />
      <Table>
        <TableCaption>Весь асортимент товарів</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=''>Name</TableHead>
            <TableHead className='w-[200px] '>Image</TableHead>
            <TableHead className=''>Price</TableHead>
            <TableHead className='w-[50px] '>Button</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              className={`rounded-md ${
                product.status === 'inactive' ? 'bg-red-100' : ''
              } `}
              key={product.id}
            >
              <TableCell className='font-medium'>{product.name}</TableCell>
              <TableCell className=' relative'>
                <Image
                  sizes='100wh'
                  className='object-cover'
                  fill
                  src={product.imageUrl}
                  alt={'img'}
                />
              </TableCell>
              <TableCell>{formatPrice(product.price)}</TableCell>
              <TableCell className='font-medium'>
                {' '}
                <TableIcons productId={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
