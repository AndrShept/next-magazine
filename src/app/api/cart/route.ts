import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const DELETE = async (req: Request) => {
  const cardId = await req.json();

  if (!cardId) {
    throw new Error('Missing required fields');
  }
  try {
    await prisma.cart.delete({
      where: { id: cardId },
    });
    revalidatePath('/cart');
    return NextResponse.json('card deleted success', { status: 200 });
  } catch (error) {
    console.log(error, `DELETE_CARD-ERROR`);
  }
};
