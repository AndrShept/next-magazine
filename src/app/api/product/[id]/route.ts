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
    const {
      name,
      description,
      price,
      categoryId,
      status,
      imageUrl,
      imageArr,
      isLeaf,
    } = body;
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
        imageUrl: imageUrl,
        imageArrUrl: imageArr,
        status,
        isLeaf,
      },
    });
    revalidatePath('/product-list');
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.log(error, `UPDATE-PRODUCT-ERROR`);
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    if (!params.id) {
      return NextResponse.json('Missing required fields', { status: 401 });
    }
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { rating: true },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error, `UPDATE-PRODUCT-ERROR`);
  }
};
