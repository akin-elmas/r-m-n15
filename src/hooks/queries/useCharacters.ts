import { useQuery } from '@tanstack/react-query';
import { getCharacterById, getCharacters } from '@/lib/api/rickmorty';
import type { CharacterFilters, GetCharactersResponse } from '@/types/api';

export function useCharacters(
  filters: CharacterFilters,
  options: { initialData?: GetCharactersResponse } = {}
) {
  return useQuery({
    queryKey: ['characters', filters],
    queryFn: () => getCharacters(filters),
    ...options,
  });
}
export function useCharacter(id: number) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(id),
  });
}
