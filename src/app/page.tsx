import { Suspense } from 'react';
import CharactersClient from '@/components/characters/characters-client';
import { getCharacters } from '@/lib/api/rickmorty';

interface HomeProps {
  searchParams?: {
    page?: string;
    status?: string;
    gender?: string;
  };
}

export default async function Home({ searchParams = {} }: HomeProps) {
  // nextjs 15 searchParams is a promise
  const { page, status, gender } = await searchParams;

  const characters = await getCharacters({
    page: parseInt(page || '1'),
    status,
    gender,
  });

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Rick and Morty Characters</h1>
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <CharactersClient initialData={characters} />
      </Suspense>
    </main>
  );
}
