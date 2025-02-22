'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useFilterStore } from '@/store/filters';
import type { ReactNode } from 'react';

interface FilterProviderProps {
  children: ReactNode;
}

type FilterState = {
  status: string;
  gender: string;
  page: number;
};

export default function FilterProvider({ children }: FilterProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setFilters } = useFilterStore();
  const isInitialMount = useRef(true);

  useEffect(() => {
    const currentFilters: FilterState = {
      status: searchParams?.get('status') ?? '',
      gender: searchParams?.get('gender') ?? '',
      page: parseInt(searchParams?.get('page') ?? '1', 10),
    };

    setFilters(currentFilters);
  }, [searchParams, setFilters]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const unsubscribe = useFilterStore.subscribe((state: FilterState) => {
      const newParams = new URLSearchParams();

      if (state.status) newParams.set('status', state.status);
      if (state.gender) newParams.set('gender', state.gender);
      if (state.page > 1) newParams.set('page', state.page.toString());

      const query = newParams.toString();
      const newUrl = query ? `${pathname}?${query}` : pathname;

      if (newUrl) {
        router.push(newUrl);
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return children;
}
