import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  try {
    const body = await req.json();
    const { name, content } = body;

    if (!name || !content) {
      throw new Error('Missing required fields ');
    }
    const newReview = await prisma.review.create({
      data: { content, name, userImage: session?.user.image},
    });
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.log(error, 'REVIEW-CREATE-ERROR');
    return new NextResponse('DATABASE ERROR', { status: 500 });
  }
};
