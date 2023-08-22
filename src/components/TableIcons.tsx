import { FileEdit, Trash2 } from 'lucide-react';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Erica_One } from 'next/font/google';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

export const TableIcons = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleClick = async () => {
    try {
      const res = await fetch(`/api/product/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast({
          title: 'product success deleted',
        });
        router.refresh();
        router.push('/product-list');
      }
      if(!res.ok){
        toast({
            title: 'SOMETHING WRONG',
            variant: 'destructive',
          });
      }

    } catch (error) {
      console.log(error);

    }
  };
  return (
    <>
      <div className='text-gray-600 p-2 rounded-md hover:bg-zinc-200 cursor-pointer'>
        <FileEdit />
      </div>
      <>
        <AlertDialog>
          <AlertDialogTrigger>
            <div className='text-gray-600 p-2 rounded-md hover:bg-zinc-200 cursor-pointer'>
              <Trash2 />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ви абсолютно впевнені?</AlertDialogTitle>
              <AlertDialogDescription>
                Ви абсолютно впевнені, що хочете видалити цей продукт з бази?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClick}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </>
  );
};
