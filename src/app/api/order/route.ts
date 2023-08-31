import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const body = await req.json();
  console.log(body);
  const { name, phoneNumber, email, subtotal, items } = body;

  if (!body) {
    throw new Error('Missing required fields');
  }
  try {
    const newOrder = await prisma.order.create({
      data: {
        email,
        name,
        phoneNumber,
        subtotal,
        orderItem: {
          createMany: {
            data: items.map((item: any) => ({
              quantity: item.quantity,

              productName: item.product.name,
              imageUrl: item.product.imageUrl,
              productPrice: item.product.price,
            })),
          },
        },
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.log(error, `CREATE_ORDER-ERROR`);
    return NextResponse.json('DATABASE ERROR', { status: 500 });
  }
};
