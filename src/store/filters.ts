import { create } from 'zustand';

interface FilterState {
  status: string;
  gender: string;
  page: number;
  setStatus: (status: string) => void;
  setGender: (gender: string) => void;
  setPage: (page: number) => void;
  setFilters: (filters: {
    status?: string;
    gender?: string;
    page?: number;
  }) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>(
  (set): FilterState => ({
    status: '',
    gender: '',
    page: 1,
    setStatus: (status): void => set({ status, page: 1 }),
    setGender: (gender): void => set({ gender, page: 1 }),
    setPage: (page): void => set({ page }),
    setFilters: (filters): void => set({ ...filters }),
    resetFilters: (): void => set({ status: '', gender: '', page: 1 }),
  })
);
