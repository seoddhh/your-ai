import { create } from 'zustand';
import { CustomInstruction } from '@/data/customInstructions';

interface AppState {
    // Landing state
    hasSeenLanding: boolean;
    setHasSeenLanding: (value: boolean) => void;

    // Sidebar state
    isSidebarOpen: boolean;
    toggleSidebar: () => void;

    // User-registered custom instructions
    userInstructions: CustomInstruction[];
    addUserInstruction: (instruction: CustomInstruction) => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Landing state
    hasSeenLanding: false,
    setHasSeenLanding: (value) => set({ hasSeenLanding: value }),

    // Sidebar state - default open
    isSidebarOpen: true,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    // User-registered custom instructions
    userInstructions: [],
    addUserInstruction: (instruction) => set((state) => ({
        userInstructions: [instruction, ...state.userInstructions]
    })),
}));
