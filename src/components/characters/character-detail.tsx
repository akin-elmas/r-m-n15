import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Character } from '@/types/api';

interface CharacterDetailProps {
  character: Character;
}

export function CharacterDetail({ character }: CharacterDetailProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline">← Back to Characters</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={character.image}
              alt={character.name}
              className="w-full md:w-64 h-64 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
              <div className="space-y-2">
                <p>
                  <strong>Status:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-sm ${
                      character.status === 'Alive'
                        ? 'bg-green-100 text-green-800'
                        : character.status === 'Dead'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {character.status}
                  </span>
                </p>
                <p>
                  <strong>Species:</strong> {character.species}
                </p>
                <p>
                  <strong>Gender:</strong> {character.gender}
                </p>
                <p>
                  <strong>Origin:</strong> {character.origin.name}
                </p>
                <p>
                  <strong>Location:</strong> {character.location.name}
                </p>
                <p>
                  <strong>Created:</strong>{' '}
                  {new Date(character.created).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
