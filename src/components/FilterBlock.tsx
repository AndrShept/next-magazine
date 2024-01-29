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
import { Category } from '@prisma/client';
import {
  ArrowDownUpIcon,
  LayoutGridIcon,
  Leaf,
  StarHalfIcon,
  X,
} from 'lucide-react';
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
  const [filter, setFilter] = React.useState('rating');
  const [isNew, setIsNew] = React.useState(false);
  const [isFilteredLeaf, setIsFilteredLeaf] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState('');
  const [sortDirection, setSortDirection] = React.useState('desc');
  const query = { filter, isNew, categoryId, sortDirection, isFilteredLeaf };
  const defaultState =
    filter === 'rating' &&
    isNew === false &&
    isFilteredLeaf === false &&
    categoryId === '' &&
    sortDirection === 'desc';

  const url = qs.stringifyUrl(
    {
      url: '/',
      query,
    },
    { skipNull: true, skipEmptyString: true },
  );
  const clearAllFilter = () => {
    setFilter('rating');
    setIsNew(false);
    setIsFilteredLeaf(false);
    setCategoryId('');
    setSortDirection('desc');
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
        <section className="flex items-center">
          <LayoutGridIcon className="mr-2 h-6 w-6 text-muted-foreground" />
          <SelectTrigger className="min-w-[100px] max-w-[140px] rounded-full ">
            <SelectValue placeholder="Виберіть категорію" />
          </SelectTrigger>
        </section>

        <SelectContent className="w-32" side="top">
          <SelectGroup>
            <SelectLabel>Категорії</SelectLabel>
            <SelectItem value={''}>Всі категорії</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <DropdownMenu>
        <section className="flex items-center">
          <StarHalfIcon className="mr-2 h-5 w-5 text-muted-foreground" />
          <DropdownMenuTrigger asChild>
            <Button
              className=" w-32 rounded-full font-normal"
              variant="outline"
            >
              {filter === 'price' ? 'Ціна' : 'Популярні'}
            </Button>
          </DropdownMenuTrigger>
        </section>
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
        <section className="flex items-center text-muted-foreground">
          <ArrowDownUpIcon className="mr-2 h-5 w-5" />
          <DropdownMenuTrigger asChild>
            <Button
              className=" min-w-32 max-w-[300px] rounded-full font-normal"
              variant="outline"
            >
              {sortDirection === 'asc' ? `за зростанням` : ` за спаданням`}
            </Button>
          </DropdownMenuTrigger>
        </section>

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
