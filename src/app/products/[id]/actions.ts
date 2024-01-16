'use server';

import { createCart, getCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { CartItem } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/dist/client/components/headers';

export const incrementProductQuantity = async (productId: string) => {
  // await new Promise(resolve => setTimeout(resolve, 3000))
  const cart = (await getCart()) ?? (await createCart());
  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    const newItem = await prisma.cartItem.update({
      where: { id: articleInCart?.id },
      data: { quantity: { increment: 1 } },
      include: { product: true },
    });
    return newItem;
  } else {
    const newItem = await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity: 1 },
      include: { product: true },
    });
    return newItem;
  }
  // revalidatePath('/products/[id]')
  // revalidatePath('/')
};


