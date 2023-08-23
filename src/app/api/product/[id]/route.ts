import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // const body = await req.json()

    if (!params.id) {
      throw new Error('Missing required fields');
    }
    const deletedProduct = await prisma.product.delete({
      where: { id: params.id },
    });
    revalidatePath('/product-list');
    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.log(error, `DELETE-PRODUCT-ERROR`);
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await req.json();
    const { name, description, price, categoryId, imageUrl, status } = body;
    if (!params.id && body) {
      throw new Error('Missing required fields');
    }
    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        price: Number(price),
        categoryId,
        imageUrl: imageUrl[0],
        imageArrUrl: imageUrl,
        status
      },
    });
    revalidatePath('/product-list');
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.log(error, `UPDATE-PRODUCT-ERROR`);
  }
};
