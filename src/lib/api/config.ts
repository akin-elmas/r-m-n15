export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export const API_ENDPOINTS = {
  characters: `${API_BASE_URL}/character`,
  locations: `${API_BASE_URL}/location`,
  episodes: `${API_BASE_URL}/episode`,
} as const;
