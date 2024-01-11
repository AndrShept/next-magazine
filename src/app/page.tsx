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
    isFilteredLeaf: string;
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
    isFilteredLeaf,
  },
}: HomeProps) {
  const obj = [
    { name: 'adsad', age: 23 },
    { name: 'olga', age: 34 },
  ];
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItem = 1;
  const totalItemCount = await prisma.product.count();
  const totalPage = Math.ceil((totalItemCount - heroItem) / pageSize);
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany({
    where: {
      categoryId: categoryId === 'all' ? undefined : categoryId,
      status: 'active',
      isLeaf: isFilteredLeaf === 'true' ? true : undefined,
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
          <div className='grid max-w-md grid-cols-2 gap-6 mx-auto my-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-6 md:max-w-full'>
            <ProductCard products={products} />
          </div>
        ) : (
          <h1 className='mt-20 text-3xl text-center text-gray-400'>
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
