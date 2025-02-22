'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '@/lib/api/rickmorty';
import { useFilterStore } from '@/store/filters';
import { CharacterFilters } from './character-filters';
import { CharacterCard } from './character-card';
import type { GetCharactersResponse, Character } from '@/types/api';

interface CharactersClientProps {
  initialData: GetCharactersResponse;
}

export default function CharactersClient({
  initialData,
}: CharactersClientProps) {
  const { status, gender, page } = useFilterStore();

  useEffect(() => {
    console.log('Current filters:', { status, gender, page });
  }, [status, gender, page]);

  const filters = {
    ...(status ? { status } : {}),
    ...(gender ? { gender } : {}),
    page,
  };

  const { data = initialData } = useQuery({
    queryKey: ['characters', filters],
    queryFn: () => {
      // Debug için API çağrısını izleyelim
      console.log('Making API call with filters:', filters);
      return getCharacters(filters);
    },
    initialData,
  });

  return (
    <>
      <CharacterFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.results.map((character: Character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </>
  );
}
