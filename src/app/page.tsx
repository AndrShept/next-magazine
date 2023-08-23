import PaginationBar from '@/components/PaginationBar';
import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import Link from 'next/link';

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = '1' },
}: HomeProps) {
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItem = 1;

  const totalItemCount = await prisma.product.count();
  const totalPage = Math.ceil((totalItemCount - heroItem) / pageSize);
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItem),
    take: pageSize + (currentPage === 1 ? heroItem : 0),
  });
  return (
    <>
    { products.length ? 
      <main className='flex flex-col'>
        <div className='flex  flex-col md:flex-row items-center  md:max-w-full max-w-md mx-auto    rounded-xl bg-base-100 p-4   gap-4 '>
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={400}
            height={800}
            priority
            className='w-full max-w-sm rounded-lg shadow-2xl '
          />
          <div className='flex flex-col  md:items-start justify-between '>
            <div>
              <h1 className='text-5xl font-bold'> {products[0].name}</h1>
              <p className='py-6'>{products[0].description}</p>
            </div>

            <Link
              href={`/products/${products[0].id}`}
              className='btn btn-secondary rounded-full text-white font-normal max-w-full'
            >
              Details
            </Link>
          </div>
        </div>

        <div className=' grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 my-4 gap-6 md:max-w-full max-w-md mx-auto'>
          {(currentPage === 1 ? products.slice(1) : products).map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        {totalPage > 1 && (
          <PaginationBar currentPage={currentPage} totalPages={totalPage} />
        )}
      </main> : 
      <main >
        <h1 className='text-center font-bold text-3xl'>Сторінка пустка добавте новий продукт</h1>
      </main>
      }
    </>
  );
}
