import { prisma } from '@/lib/db/prisma'
import { NextResponse } from 'next/server'


export const GET = async(req:Request)=> {

    const {searchParams} =   new URL(req.url )
    const res = Number(searchParams.get('page'))

    console.log(searchParams)
    console.log(res)
    const result = await prisma.product.findMany({
        orderBy: {createdAt: 'desc'},
        take: res
    })
 return new NextResponse( JSON.stringify(result), {status: 201})
}