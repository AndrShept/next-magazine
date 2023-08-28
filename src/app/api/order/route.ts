// import { prisma } from '@/lib/db/prisma';
// import { NextResponse } from 'next/server';

// export const POST = async (req: Request) => {
//   const body = await req.json();
//   if (!body) {
//     throw new Error('Missing required fields');
//   }
//   try {
//     const newOrder = await prisma.order.create({
    
//     });
//     return NextResponse.json(newOrder, { status: 201 });
//   } catch (error) {
//     console.log(error, `CREATE_ORDER-ERROR`);
//   }
// };
