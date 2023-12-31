'use client';
import React, { useEffect, useState } from 'react';
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { ArrowLeft, Flower, Flower2, Loader2, Wand2 } from 'lucide-react';
import z from 'zod';
import { ImageUpload } from './ImageUpload';
import { Category, Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { Switch } from './ui/switch';

export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Імя продукту обов`язкове поле',
  }),
  description: z.string().max(100),

  price: z.any(),
  imageUrl: z.string().min(1, {
    message: 'Фото продукту обовя`зкове поле',
  }),
  categoryId: z.string().min(1, {
    message: 'Категорія продукту обов`язкова поле',
  }),
  status: z.string().min(1, {
    message: 'Статус продукту обов`язкова поле',
  }),
  isLeaf: z.boolean().default(false).optional(),
});

interface AddProductFromProps {
  categories: Category[];
  product: Product | null;
}

export const AddProductFrom = ({
  categories,
  product,
}: AddProductFromProps) => {
  const [imageArr, setImageArr] = useState<any>([]);
  const [heroImage, setHeroImage] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product || {
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      categoryId: undefined,
      status: 'active',
      isLeaf: false,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newValues = {
      ...values,
      imageUrl: heroImage,
      imageArr: !imageArr.length ? product?.imageArrUrl : imageArr,
    };

    try {
      if (!product) {
        const res = await fetch('/api/product', {
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
        } else {
          toast({
            title: 'Щось пішло не так при створені продукту!',
            variant: 'destructive',
          });
        }
      } else {
        const res = await fetch(`/api/product/${product.id}`, {
          method: 'PUT',
          body: JSON.stringify(newValues),
        });
        if (res.ok) {
          toast({
            title: 'Продукт оновлено успішно!',
            description: new Date().toLocaleString(),
          });
          router.refresh();
          router.push('/product-list');
        } else {
          toast({
            title: 'Щось пішло не так з оновленням продукту!',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Щось пішло не так!',
        variant: 'destructive',
      });
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className='h-full px-4 space-2 max-w-3xl mx-auto '>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 pb-10'
        >
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
          </div>
          <FormField
            name='imageUrl'
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
                    heroImage={heroImage}
                    setHeroImage={setHeroImage}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4  '>
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

            <FormField
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Статус</FormLabel>

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='active'>Включити</SelectItem>
                      <SelectItem value='inactive'>Виключити</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isLeaf'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel className='text-base'>Листок</FormLabel>
                  <div className='space-y-0.5 flex border p-[6px] rounded-md items-center mt-0'>
                    {/* <FormDescription>
                      Receive emails about your account security.
                    </FormDescription> */}
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </div>
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
                {product ? 'Оновити продукт' : 'Створити продукт'}
                <Flower2 className='w-6 h-6 ml-3' />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
