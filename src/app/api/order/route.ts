import { prisma } from '@/lib/db/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const body = await req.json();
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
              isLeaf: item.product.isLeaf,
              productId: item.product.id,
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

export const DELETE = async (req: NextRequest) => {
  const orderId = await req.json();
  if (!orderId) {
    throw new Error('Missing required fields');
  }

  try {
    await prisma.order.delete({
      where: { id: orderId },
    });
    return NextResponse.json('delete success', { status: 200 });
  } catch (error) {
    console.log(error, 'DELETE_ORDERS - ERROR');
    return NextResponse.json('DATABASE ERROR', { status: 500 });
  }
};
