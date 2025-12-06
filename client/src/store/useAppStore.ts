import { create } from 'zustand';

interface AppState {
    hasSeenLanding: boolean;
    setHasSeenLanding: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    hasSeenLanding: false,
    setHasSeenLanding: (value) => set({ hasSeenLanding: value }),
}));
