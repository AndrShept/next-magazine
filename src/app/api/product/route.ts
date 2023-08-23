import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, description, imageUrl, price, category, categoryId } = body;
    console.log(body);

    if (!name && !description && !imageUrl && !price && !category) {
      return new NextResponse('Missing required fields');
    }
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl: imageUrl[0],
        imageArrUrl: imageUrl,
        price: Number(price),
        category,
        categoryId,
      },
    });
    revalidatePath('/');
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.log(error, `ADDPRODUCT-ERROR`);
  }
};

export const DELETE = async (req: Request) => {
  try {
    await prisma.product.deleteMany();
    revalidatePath('/product-list');
    return NextResponse.json('ALL PRODUCT DELETE ', { status: 200 });
  } catch (error) {
    console.log(error, `DELETE-PRODUCT-ERROR`);
  }
};