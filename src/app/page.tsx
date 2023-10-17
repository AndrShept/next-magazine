import { FilterBlock } from '@/components/FilterBlock';
import PaginationBar from '@/components/PaginationBar';
import { ProductCard } from '@/components/ProductCard';
import { SwiperComponent } from '@/components/SwiperComponent';
import { prisma } from '@/lib/db/prisma';

interface HomeProps {
  searchParams: {
    page: string;
    categoryId: string;
    searchQuery: string;
    categoryState: string;
    filter: string;
    isNew: boolean;
    sortDirection: string;
    searchValue: string;
  };
}

export default async function Home({
  searchParams: {
    page = '1',
    categoryId,
    filter,
    isNew,
    sortDirection,
    searchValue,
  },
}: HomeProps) {
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItem = 1;
  console.log(searchValue);
  const totalItemCount = await prisma.product.count();
  const totalPage = Math.ceil((totalItemCount - heroItem) / pageSize);
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany({
    where: {
      categoryId: categoryId === 'all' ? undefined : categoryId,
      status: 'active',
      OR: searchValue
        ? [{ name: { contains: searchValue, mode: 'insensitive' } }]
        : undefined,
    },
    //@ts-ignore
    orderBy:
      filter === 'price' ? { price: sortDirection } : { id: sortDirection },
    // skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItem),
    // take: pageSize + (currentPage === 1 ? heroItem : 0),
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
        <FilterBlock categories={categories} />
        {products.length ? (
          <div className=' grid grid-cols-2   md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 my-4 md:gap-6 gap-3 md:max-w-full max-w-md mx-auto'>
            <ProductCard products={products} />
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
