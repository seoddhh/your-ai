import { create } from 'zustand';

export type FilterCategory = 'domain' | 'usageStyle' | 'experience' | 'cognitiveStyle' | 'toolStack' | 'outputPreference';

interface FilterState {
    filters: Record<FilterCategory, string[]>;
    toggleFilter: (category: FilterCategory, value: string) => void;
    removeFilter: (category: FilterCategory, value: string) => void;
    clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    filters: {
        domain: [],
        usageStyle: [],
        experience: [],
        cognitiveStyle: [],
        toolStack: [],
        outputPreference: [],
    },
    toggleFilter: (category, value) =>
        set((state) => {
            const current = state.filters[category];
            const isSelected = current.includes(value);
            return {
                filters: {
                    ...state.filters,
                    [category]: isSelected
                        ? current.filter((item) => item !== value)
                        : [...current, value],
                },
            };
        }),
    removeFilter: (category, value) =>
        set((state) => ({
            filters: {
                ...state.filters,
                [category]: state.filters[category].filter((item) => item !== value),
            },
        })),
    clearFilters: () =>
        set({
            filters: {
                domain: [],
                usageStyle: [],
                experience: [],
                cognitiveStyle: [],
                toolStack: [],
                outputPreference: [],
            },
        }),
}));
