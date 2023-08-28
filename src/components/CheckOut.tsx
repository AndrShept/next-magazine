import { ShoppingCart } from '@/lib/db/cart';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.',
  }),
  email: z.string().email().min(1, {
    message: 'email must be at least 1 characters.',
  }),
});

export const CheckOut = ({ cart }: { cart: ShoppingCart | null }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const res = await fetch('/api/order',{
        method: 'POST',
        body: JSON.stringify({...values,...cart })
      })
    } catch (error) {
      console.log(error)
    }
    console.log(cart)
    console.log(values);



  }

  return (
    <div className=''>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Ваше імя' {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='номер телефону'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ваш email</FormLabel>
                <FormControl>
                  <Input placeholder='example@gmail.com' {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='  rounded-full bg-[#f000b8] hover:bg-[#db32b4]' type='submit'>Замовити</Button>
        </form>
      </Form>
    </div>
  );
};
