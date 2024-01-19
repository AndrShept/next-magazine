'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Product } from '@prisma/client';
import { ArrowLeft, Flower, Flower2, Loader2, Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { ImageUpload } from './ImageUpload';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { useToast } from './ui/use-toast';

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
    <div className="space-2 mx-auto h-full max-w-3xl px-4 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
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
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4 ">
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2  ">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Імя</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="назва продукту"
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
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Опис</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="описання продукту"
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
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Ціна</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="price"
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
              name="categoryId"
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
                      <SelectValue placeholder="Select category" />
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Статус</FormLabel>

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Включити</SelectItem>
                      <SelectItem value="inactive">Виключити</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isLeaf"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-base">Листок</FormLabel>
                  <div className="mt-0 flex items-center space-y-0.5 rounded-md border p-[6px]">
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
          <div className="w-full space-y-2">
            <Separator className="bg-primary/10" />
          </div>

          <div className="flex w-full justify-center">
            {isLoading ? (
              <Button size="lg" disabled={isLoading}>
                <Flower className="mr-3 animate-spin" />
                Загрузка...
              </Button>
            ) : (
              <Button size="lg" disabled={isLoading}>
                {product ? 'Оновити продукт' : 'Створити продукт'}
                <Flower2 className="ml-3 h-6 w-6" />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
