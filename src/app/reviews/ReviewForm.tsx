'use client';

import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flower } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '../../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';

const reviewSchema = z.object({
  name: z.string().min(3).max(20),
  content: z.string().min(4).max(100),
});

export const ReviewForm = ({
  setIsOpen,
}: {
  setIsOpen: (bool: boolean) => void;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: '',
      content: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      if (res.ok) {
        router.refresh();
        router.push('/reviews');
        setIsOpen(false);
        toast({
          title: 'Success',
          description: 'Відгук успішно добавлений!',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'ERROR',
        description: 'SOMETHING WENT WRONG',
        variant: 'destructive',
      });
    }
  };
  const isLoading = form.formState.isSubmitting;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ім&apos;я</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Ваше ім'я"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Відгук</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    disabled={isLoading}
                    placeholder="Напишіть ваш відгук"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="w-full rounded-full"
            type="submit"
          >
            Відправити{' '}
            {isLoading && (
              <span>
                <Flower className="ml-2 animate-spin" />
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
