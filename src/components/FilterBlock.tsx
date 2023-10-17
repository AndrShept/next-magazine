'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

interface FilterBlockProps {
  categories: Category[];
}

export const FilterBlock = ({ categories }: FilterBlockProps) => {
  const router = useRouter();
  const [filter, setFilter] = React.useState('popular');
  const [isNew, setIsNew] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState('all');
  const [sortDirection, setSortDirection] = React.useState('asc');
  const query = { filter, isNew, categoryId, sortDirection };
  const url = qs.stringifyUrl(
    {
      url: '/',
      query,
    },
    { skipNull: true, skipEmptyString: true }
  );

  React.useEffect(() => {
    router.push(url);
  }, [filter, isNew, categoryId, sortDirection]);
  return (
    <div className='overflow-x-auto w-full sticky justify-center top-7 p-3 border-y z-50 flex items-center sm:gap-6 gap-2'>
      <Select onValueChange={setCategoryId}>
        <SelectTrigger className='max-w-[180px] rounded-full '>
          <SelectValue placeholder='Виберіть категорію' />
        </SelectTrigger>
        <SelectContent>
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
        <DropdownMenuContent>
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
        <DropdownMenuContent>
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
      <div>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='terms'
            checked={isNew}
            //@ts-ignore
            onCheckedChange={setIsNew}
          />
          <Label htmlFor='terms'>Новинки</Label>
        </div>
      </div>
    </div>
  );
};
