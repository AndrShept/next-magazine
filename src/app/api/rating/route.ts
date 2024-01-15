import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { productId, rating, userId } = await req.json();
    if (!productId) {
      return NextResponse.json(
        { message: 'Missing fields productId ' },
        { status: 401 }
      );
    }
    if (!rating) {
      return NextResponse.json(
        { message: 'Missing fields rating ' },
        { status: 401 }
      );
    }
    if (!userId) {
      return NextResponse.json(
        { message: 'Missing fields useId ' },
        { status: 401 }
      );
    }

    const newRating = await prisma.rating.create({
      data: { productId, rating, userId },
    });
    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: { rating: true },
    });
    const newRatingValue = product?.rating.reduce(
      (acc, item) => acc + item.rating,
      0
    );
    if (!product || !newRatingValue) {
      return NextResponse.json(
        { message: 'product not found' },
        { status: 401 }
      );
    }
    console.log(newRatingValue);
    await prisma.product.update({
      where: { id: productId },
      data: {
        ratingValue: Number(
          (newRatingValue / product?.rating.length).toFixed(1)
        ),
      },
    });
    return NextResponse.json(newRating, { status: 201 });
  } catch (error) {
    console.log('create-rating', error);
    return NextResponse.json(
      { error: 'Internal Server Error ' },
      { status: 500 }
    );
  }
};
