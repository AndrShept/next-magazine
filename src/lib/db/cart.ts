import { cookies } from 'next/dist/client/components/headers';
import { prisma } from './prisma';
import { Cart, Prisma } from '@prisma/client';

export type CartWithProduct = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = Cart & {
  size: number;
  subtotal: number;
};

export const getCart = async (): Promise<CartWithProduct> => {
  const localCartId = cookies().get('localCartId')?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) null;
  return {
    ...cart,
    size: cart?.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart?.items.reduce(
      (acc, item) => acc + item.quantity + item.product.price,
      0
    ),
  };
};

export const createCart = async () => {
  const newCart = await prisma.cart.create({
    data: {},
  });
  cookies().set('localCartId', newCart.id);

  return {
    ...newCart,
    size:0,
    subtotal:0 
  }
};
