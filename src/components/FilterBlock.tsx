'use client';

import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { Leaf, X } from 'lucide-react';
import { Toggle } from './ui/toggle';
import { Button } from '@/components/ui/button';

interface FilterBlockProps {
  categories: Category[];
}

export const FilterBlock = ({ categories }: FilterBlockProps) => {
  const router = useRouter();
  const [filter, setFilter] = React.useState('popular');
  const [isNew, setIsNew] = React.useState(false);
  const [isFilteredLeaf, setIsFilteredLeaf] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState('');
  const [sortDirection, setSortDirection] = React.useState('asc');
  const query = { filter, isNew, categoryId, sortDirection, isFilteredLeaf };

  const url = qs.stringifyUrl(
    {
      url: '/',
      query,
    },
    { skipNull: true, skipEmptyString: true }
  );
  const clearAllFilter = () => {
    setFilter('popular');
    setIsNew(false);
    setIsFilteredLeaf(false);
    setCategoryId('');
    setSortDirection('asc');
  };

  React.useEffect(() => {
    router.push(url);
    let currentPosition = window.scrollY;

    setTimeout(() => {
      window.scroll(0, currentPosition);
    }, 50);
  }, [router, url]);

  return (
    <div className='overflow-x-auto flex-wrap w-full  justify-center  p-3 border-y flex items-center lg:gap-6 md:gap-3 gap-2'>
      <Select value={categoryId} onValueChange={setCategoryId}>
        <SelectTrigger className='max-w-[180px] rounded-full '>
          <SelectValue placeholder='Виберіть категорію' />
        </SelectTrigger>
        <SelectContent side='top'>
          <SelectGroup>
            <SelectLabel>Категорії</SelectLabel>
            <SelectItem value={''}>Всі</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className=' rounded-full font-normal w-32' variant='outline'>
            {filter === 'price' ? 'Ціна' : 'Популярні'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='top'>
          <DropdownMenuLabel>Фільтрувати</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
            <DropdownMenuRadioItem value='price'>Ціна</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='rating'>
              Популярні
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className=' rounded-full font-normal w-32' variant='outline'>
            {sortDirection === 'asc' ? `за зростанням` : ` за спаданням`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='top'>
          <DropdownMenuLabel>Фільтрувати</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={sortDirection}
            onValueChange={setSortDirection}
          >
            <DropdownMenuRadioItem value='asc'>
              за зростанням
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='desc'>
              за спаданням
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <div>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='terms'
            checked={isNew}
            //@ts-ignore
            onCheckedChange={setIsNew}
          />
          <Label htmlFor='terms'>Новинки</Label>
        </div>
      </div> */}

     <div className='gap-0 flex items-center'>
     <Toggle
        pressed={isFilteredLeaf}
        onPressedChange={setIsFilteredLeaf}
        className='rounded-full'
        aria-label='Toggle italic'
      >
        <Leaf size={20} />
      </Toggle>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={
                filter === 'popular' &&
                isNew === false &&
                isFilteredLeaf === false &&
                categoryId === '' &&
                sortDirection === 'asc'
              }
              onClick={clearAllFilter}
              className='rounded-full'
              variant={'ghost'}
              size={'icon'}
            >
              <X  />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Очистити фільтри</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
     </div>
    </div>
  );
};
