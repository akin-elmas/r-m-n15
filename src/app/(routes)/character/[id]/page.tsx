import { JSX } from 'react';
import { CharacterDetail } from '@/components/characters/character-detail';
import { getCharacterById } from '@/lib/api/rickmorty';

interface CharacterPageProps {
  params: {
    id: string;
  };
}

export default async function CharacterPage({
  params,
}: CharacterPageProps): Promise<JSX.Element> {
  if (!params.id) {
    throw new Error('Character ID is required');
  }

  const characterId = parseInt(params.id);
  if (isNaN(characterId)) {
    throw new Error('Invalid character ID');
  }

  const character = await getCharacterById(characterId);

  return (
    <div className="container mx-auto px-4 py-8">
      <CharacterDetail character={character} />
    </div>
  );
}
