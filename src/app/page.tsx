import { Categories } from '@/components/Categories';
import PaginationBar from '@/components/PaginationBar';
import { ProductCard } from '@/components/ProductCard';
import { SwiperComponent } from '@/components/SwiperComponent';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/db/prisma';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface HomeProps {
  searchParams: { page: string; categoryId: string };
}

export default async function Home({
  searchParams: { page = '1', categoryId },
}: HomeProps) {
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItem = 1;

  const totalItemCount = await prisma.product.count();
  const totalPage = Math.ceil((totalItemCount - heroItem) / pageSize);
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany({
    where: { categoryId: categoryId, status: 'active' },
    orderBy: { id: 'desc' },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItem),
    take: pageSize + (currentPage === 1 ? heroItem : 0),
  });
  const imageUrls = await prisma.product.findMany({
    select: { imageArrUrl: true },
  });
  const allImageUrl = [];

  for (const imageUrl of imageUrls) {
    allImageUrl.push(...imageUrl.imageArrUrl);
  }
  return (
    <>
      <main className='flex flex-col '>
        <SwiperComponent allImageUrl={allImageUrl} />
        <Categories categories={categories} categoryId={categoryId} />
        {products.length ? (
          <div className=' grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 my-4 gap-6 md:max-w-full max-w-md mx-auto'>
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <h1 className='text-center  text-3xl text-gray-400 mt-20'>
            Нічого не знайдено
          </h1>
        )}
        {totalPage > 1 && false && (
          <PaginationBar currentPage={currentPage} totalPages={totalPage} />
        )}
      </main>
    </>
  );
}
