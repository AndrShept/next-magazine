'use client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Trash2, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

export const DeleteIcon = ({ orderId }: { orderId: string }) => {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();
  const router = useRouter();
  const handleClick = async () => {
    try {
      if (confirm('Видалити цей заказ?')) {
        startTransition(async () => {
          const res = await fetch('/api/order', {
            method: 'DELETE',
            body: JSON.stringify(orderId),
          });
          if (res.ok) {
            router.refresh();
          }
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'ERROR',
        description: 'SOMETHING WENT WRONG',
      });
    }
  };
  return (
    <>
      {isPending ? (
        <Loader2 className='animate-spin ml-2' size={20} />
      ) : (
        <Trash2Icon
          onClick={handleClick}
          size={20}
          className='ml-2 cursor-pointer hover:text-red-600 duration-200'
        />
      )}
    </>
  );
};
