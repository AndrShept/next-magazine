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
import { FileEdit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ActionTooltip } from './ActionTooltip';
import { useToast } from './ui/use-toast';

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
      <ActionTooltip label="Edit">
        <div className="h-[38px] w-[38px] cursor-pointer rounded-md p-1 text-gray-600 hover:bg-zinc-200 sm:p-2  ">
          <FileEdit
            size={22}
            onClick={() => router.push('/add-product/' + productId)}
          />
        </div>
      </ActionTooltip>
      <>
        <AlertDialog>
          <AlertDialogTrigger>
            <ActionTooltip label="Delete">
              <div className="cursor-pointer rounded-md p-1 text-gray-600 hover:bg-zinc-200 sm:p-2 ">
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
