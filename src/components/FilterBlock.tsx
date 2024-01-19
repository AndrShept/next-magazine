'use client';

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
import { Leaf, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import * as React from 'react';

import { ActionTooltip } from './ActionTooltip';
import { Toggle } from './ui/toggle';

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
  const defaultState =
    filter === 'popular' &&
    isNew === false &&
    isFilteredLeaf === false &&
    categoryId === '' &&
    sortDirection === 'asc';

  const url = qs.stringifyUrl(
    {
      url: '/',
      query,
    },
    { skipNull: true, skipEmptyString: true },
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
    <div className="flex w-full flex-wrap  items-center  justify-center gap-2 overflow-x-auto border-y p-3 md:gap-3 lg:gap-6">
      <Select value={categoryId} onValueChange={setCategoryId}>
        <SelectTrigger className="max-w-[140px] rounded-full ">
          <SelectValue placeholder="Виберіть категорію" />
        </SelectTrigger>
        <SelectContent side="top">
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
          <Button className=" w-32 rounded-full font-normal" variant="outline">
            {filter === 'price' ? 'Ціна' : 'Популярні'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top">
          <DropdownMenuLabel>Фільтрувати</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
            <DropdownMenuRadioItem value="price">Ціна</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rating">
              Популярні
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className=" w-32 rounded-full font-normal" variant="outline">
            {sortDirection === 'asc' ? `за зростанням` : ` за спаданням`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top">
          <DropdownMenuLabel>Фільтрувати</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={sortDirection}
            onValueChange={setSortDirection}
          >
            <DropdownMenuRadioItem value="asc">
              за зростанням
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="desc">
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

      <div className="flex items-center gap-0">
        <Toggle
          pressed={isFilteredLeaf}
          onPressedChange={setIsFilteredLeaf}
          className="rounded-full "
          aria-label="Toggle italic"
        >
          <Leaf size={20} />
        </Toggle>

        <ActionTooltip label="Очистити фільтри">
          <Button
            disabled={defaultState}
            onClick={clearAllFilter}
            className="rounded-full"
            variant={'ghost'}
            size={'icon'}
          >
            <X />
          </Button>
        </ActionTooltip>
      </div>
    </div>
  );
};
