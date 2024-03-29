'use client';

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
import { Product } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { TableIcons } from './TableIcons';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface ProductListProps {
  products: Product[];
}

export const AllProductListDashboard = ({ products }: ProductListProps) => {
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
    window.scroll(0, 0);
  }, []);
  if (!isMounted) return null;

  return (
    <div className="w-full space-y-2  ">
      <div className="flex items-center gap-2">
        <div
          onClick={() => router.back()}
          className="cursor-pointer rounded-full p-2 hover:bg-zinc-300"
        >
          <ArrowLeft className="text-gray-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Назад</h3>
          <p className="text-sm text-muted-foreground">
            General information about your Product
          </p>
        </div>
        {/* <div className='ml-6'>
          <Button onClick={handleClick}>Delete ALL</Button>
        </div> */}
      </div>
      <Separator className="bg-primary/10" />
      <Table>
        <TableCaption>Весь асортимент товарів</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="p-0">Name</TableHead>
            <TableHead className="w-[150px] p-0 sm:w-[200px]  ">
              Image
            </TableHead>
            <TableHead className="p-0 ">Price</TableHead>
            <TableHead className="w-[50px] p-0 ">Button</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              className={`rounded-md   ${
                product.status === 'inactive'
                  ? 'bg-red-100 opacity-50 hover:bg-red-200'
                  : ''
              } `}
              key={product.id}
            >
              <TableCell className="p-0 px-2 font-medium">
                {product.name}
              </TableCell>
              <TableCell className=" relative   ">
                <Image
                  className="rounded-md border  object-cover shadow-md  "
                  fill
                  src={product.imageUrl}
                  alt={'img'}
                />
              </TableCell>
              <TableCell className="px-1 text-center">
                {formatPrice(product.price)}
              </TableCell>
              <TableCell className="p-0 font-medium">
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
