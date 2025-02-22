'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFilterStore } from '@/store/filters';
import { useRouter, useSearchParams } from 'next/navigation';

export function CharacterFilters() {
  const { status, gender, setStatus, setGender } = useFilterStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('status');
    } else {
      params.set('status', value);
    }
    params.set('page', '1'); // Filtreleme değiştiğinde sayfa 1'e dön
    router.push(`/?${params.toString()}`);
    setStatus(value === 'all' ? '' : value);
  };

  const handleGenderChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('gender');
    } else {
      params.set('gender', value);
    }
    params.set('page', '1'); // Filtreleme değiştiğinde sayfa 1'e dön
    router.push(`/?${params.toString()}`);
    setGender(value === 'all' ? '' : value);
  };

  return (
    <div className="flex gap-4 mb-8">
      <Select value={status || 'all'} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="alive">Alive</SelectItem>
          <SelectItem value="dead">Dead</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>

      <Select value={gender || 'all'} onValueChange={handleGenderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="genderless">Genderless</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
