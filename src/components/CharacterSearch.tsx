'use client';

import { SearchBar } from './SearchBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export function CharacterSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('name') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams || {});
    if (debouncedSearchTerm) {
      params.set('name', debouncedSearchTerm);
    } else {
      params.delete('name');
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  }, [debouncedSearchTerm, router, searchParams]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  return (
    <div className="mb-8">
      <SearchBar
        onSearch={handleSearch}
        initialValue={searchParams?.get('name') || ''}
      />
    </div>
  );
}
