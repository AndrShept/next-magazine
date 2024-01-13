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
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { ActionTooltip } from './ActionTooltip';

export const TableIcons = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleClickDelete = async () => {
    try {
      const res = await fetch(`/api/product/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast({
          title: 'Продукт успішно видалено!',
        });
        router.refresh();
        router.push('/product-list');
      }
      if (!res.ok) {
        toast({
          title: 'Щось пішло не так!',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ActionTooltip label='Edit'>
        <div className='text-gray-600 h-[38px] w-[38px] sm:p-2 p-1 rounded-md hover:bg-zinc-200 cursor-pointer  '>
          <FileEdit
            size={22}
            onClick={() => router.push('/add-product/' + productId)}
          />
        </div>
      </ActionTooltip>
      <>
        <AlertDialog>
          <AlertDialogTrigger>
            <ActionTooltip label='Delete'>
              <div className='text-gray-600 sm:p-2 p-1 rounded-md hover:bg-zinc-200 cursor-pointer '>
                <Trash2 size={22} />
              </div>
            </ActionTooltip>
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
              <AlertDialogAction onClick={handleClickDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </>
  );
};
