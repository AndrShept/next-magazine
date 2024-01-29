import { FilterBlock } from '@/components/FilterBlock';
import PaginationBar from '@/components/PaginationBar';
import { SwiperComponent } from '@/components/SwiperComponent';
import { ProductList } from '@/components/ui/ProductList';
import { SkeletonProductList } from '@/components/ui/SkeletetonProductList';
import { prisma } from '@/lib/db/prisma';
import { Suspense } from 'react';

export interface SearchParamsProps {
  searchParams: {
    page: string;
    categoryId: string;
    searchQuery: string;
    categoryState: string;
    filter: string ;
    isNew: boolean;
    sortDirection: string;
    searchValue: string;
    isFilteredLeaf: string;
  };
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const currentPage = parseInt(searchParams.page);
  const pageSize = 6;
  const heroItem = 1;
  const totalItemCount = await prisma.product.count();
  const totalPage = Math.ceil((totalItemCount - heroItem) / pageSize);
  const categories = await prisma.category.findMany();

  const imageUrls = await prisma.product.findMany({
    select: { imageArrUrl: true },
  });
  const allImageUrl = [];

  for (const imageUrl of imageUrls) {
    allImageUrl.push(...imageUrl.imageArrUrl);
  }
  return (
    <>
      <main className="flex flex-col ">
        <SwiperComponent allImageUrl={allImageUrl} />
        <FilterBlock categories={categories} />
        <Suspense fallback={<SkeletonProductList />}>
          <ProductList searchParams={searchParams} />
        </Suspense>
        {totalPage > 1 && false && (
          <PaginationBar currentPage={currentPage} totalPages={totalPage} />
        )}
      </main>
    </>
  );
}
