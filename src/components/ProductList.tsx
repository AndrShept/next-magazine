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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatPrice } from '@/lib/format';

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
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
      </div>
      <Separator className='bg-primary/10' />
      <Table>
        <TableCaption>Весь асортимент товарів</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Name</TableHead>
            <TableHead className='w-[150px]'>Image</TableHead>
            <TableHead className='w-[10px]'>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Button</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
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
              <TableCell className='font-medium'>
                {formatPrice(product.price)}
              </TableCell>
              <TableCell className='font-medium'>
                <Select>
                  <SelectTrigger className='w-[100px]'>
                    <SelectValue placeholder='select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='true'>Включити</SelectItem>
                      <SelectItem value='false'>Виключити</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className='font-medium flex  '>
                <div className='text-gray-600 p-2 rounded-md hover:bg-zinc-200 cursor-pointer'>
                  <FileEdit />
                </div>
                <div className='text-gray-600 p-2 rounded-md hover:bg-zinc-200 cursor-pointer'>
                  <Trash2 />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
