import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Character } from '@/types/api';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/character/${character.id}`}>
      <Card className="cursor-pointer transition-shadow hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Image
              src={character.image}
              alt={character.name}
              width={96}
              height={96}
              priority
              className="h-24 w-24 rounded-full object-cover"
            />
            <div>
              <h2 className="mb-2 text-xl font-semibold">{character.name}</h2>
              <p className="text-gray-600">
                Status:
                <span
                  className={`ml-2 rounded-full px-2 py-1 text-sm ${
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
              <p className="text-gray-600">Species: {character.species}</p>
              <p className="text-gray-600">Gender: {character.gender}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
