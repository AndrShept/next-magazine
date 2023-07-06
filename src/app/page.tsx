import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
  });
  return (
    <main className=''>
      <div className='hero rounded-xl bg-base-200'>
        <div className='hero-content flex-col md:flex-row '>
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={400}
            height={800}
            priority
            className='w-full max-w-sm rounded-lg shadow-2xl '
          />
          <div>
            <h1 className='text-5xl font-bold'> {products[0].name}</h1>
            <p className='py-6'>{products[0].description}</p>
            <Link
              href={`/products/${products[0].id}`}
              className='btn btn-primary'
            >
              Details
            </Link>
          </div>
        </div>
       
      </div>
      <div className=' grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 my-4 gap-6 md:max-w-full max-w-md mx-auto'>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
    </main>
  );
}
