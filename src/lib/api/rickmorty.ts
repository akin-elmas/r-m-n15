import axios from 'axios';
import { API_ENDPOINTS } from './config';
import type {
  Character,
  CharacterFilters,
  GetCharactersResponse,
} from '@/types/api';

export async function getCharacters(
  filters: CharacterFilters
): Promise<GetCharactersResponse> {
  const params = new URLSearchParams();

  if (filters.status) params.append('status', filters.status);
  if (filters.gender) params.append('gender', filters.gender);
  if (filters.page) params.append('page', filters.page.toString());

  const { data } = await axios.get(`${API_ENDPOINTS.characters}?${params}`);
  return data;
}

export async function getCharacterById(id: number): Promise<Character> {
  const { data } = await axios.get(`${API_ENDPOINTS.characters}/${id}`);
  return data;
}
