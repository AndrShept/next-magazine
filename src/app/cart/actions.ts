'use server';

import { createCart, getCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: articleInCart.id },
          },
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articleInCart.id },
              data: { quantity },
            },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
    }
  }

  revalidatePath('/cart');
}

export const DeleteProduct = async (productId: string, quantity: number) => {
  // const quantity = Number(e.target.value);

  await setProductQuantity(productId, quantity);
  revalidatePath('/cart');
};

export const increaseQuantity = async (productId: string, quantity: number) => {
  if (quantity >= 1) {
    await setProductQuantity(productId, quantity + 1);
    revalidatePath('/cart');
  }
};
export const decreaseQuantity = async (productId: string, quantity: number) => {
  if (quantity > 1) {
    await setProductQuantity(productId, quantity - 1);
    revalidatePath('/cart');
  }
};
