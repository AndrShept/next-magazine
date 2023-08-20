import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, description, image, price, category } = body;

    if (!name && !description && !image && !price && !category) {
      return new NextResponse('Missing required fields');
    }
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl: image,
        price: Number(price),
        category,
      },
    });
    revalidatePath('/');
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.log(error, `ADDPRODUCT-ERROR`);
  }
};
