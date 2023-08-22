'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Flower, Flower2, Loader2, Wand2 } from 'lucide-react';
import z from 'zod';
import { ImageUpload } from './ImageUpload';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';

export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Імя продукту обовязкове поле',
  }),
  description: z.string().min(1, {
    message: ' Описання продукту обовязкове поле',
  }),

  price: z.string().min(1, { message: 'Ціна обовязове поле' }),
  image: z.string().min(1, {
    message: 'Фото продукту обовязкове поле',
  }),
  categoryId: z.string().min(1, {
    message: 'Категорія продукту обовязкова поле',
  }),
});

export const AddProductFrom = ({ categories }: { categories: Category[] }) => {
  const [imageArr, setImageArr] = useState<any>([]);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      price: '',
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newValues = { ...values, image: imageArr };
    try {
      const res = await fetch('/api/addProduct', {
        method: 'POST',
        body: JSON.stringify(newValues),
      });
      if (res.ok) {
        toast({
          title: 'Продукт створено успішно!',
          description: new Date().toLocaleString(),
        });
        router.refresh();
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Продукт створено успішно!',
        variant: 'destructive',
      });
    }
  };
  return (
    <div className='h-full p-4 space-2 max-w-3xl mx-auto '>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 pb-10'
        >
          <div className='space-y-2 w-full  '>
            <div className='flex items-center gap-2'>
              <div onClick={()=> router.back()} className='cursor-pointer rounded-full p-2 hover:bg-zinc-300'>
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
          </div>
          <FormField
            name='image'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex flex-col items-center justify-center space-y-4 '>
                <FormControl>
                  <ImageUpload
                    imageArr={imageArr}
                    setImageArr={setImageArr}
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Імя</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='назва продукту'
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is how your AI Companion will be named
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Опис</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='описання продукту'
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Short description for your AI Companion
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='price'
              control={form.control}
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Ціна</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      disabled={isLoading}
                      placeholder='price'
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Write couple of examples of a human chatting with your AI
                    companion, write expected answers.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='categoryId'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категорія</FormLabel>

                  <Select
                    disabled={isLoading}
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* <FormDescription>Select companion category</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='space-y-2 w-full'>
            <Separator className='bg-primary/10' />
          </div>

          <div className='w-full flex justify-center'>
            {isLoading ? (
              <Button size='lg' disabled={isLoading}>
                <Flower className='animate-spin mr-3' />
                Загрузка...
              </Button>
            ) : (
              <Button size='lg' disabled={isLoading}>
                Створити продукт
                <Flower2 className='w-6 h-6 ml-3' />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
