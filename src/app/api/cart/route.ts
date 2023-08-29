import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const DELETE = async (req: Request) => {
  const body = await req.json();
  console.log(body);

  if (!body) {
    throw new Error('Missing required fields');
  }
  try {
    await prisma.cart.delete({
      where: { id: body },
    });
    revalidatePath('/cart')
    return NextResponse.json('card deleted success', { status: 200 });
  } catch (error) {
    console.log(error, `DELETE_CARD-ERROR`);
  }
};
