import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CustomInstruction } from '@/data/customInstructions';

interface AppState {
    // Landing state
    hasSeenLanding: boolean;
    setHasSeenLanding: (value: boolean) => void;

    // Sidebar state
    isSidebarOpen: boolean;
    toggleSidebar: () => void;

    // Hydration state
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;

    // User-registered custom instructions
    userInstructions: CustomInstruction[];
    addUserInstruction: (instruction: CustomInstruction) => void;
    deleteUserInstruction: (id: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            // Landing state
            hasSeenLanding: false,
            setHasSeenLanding: (value) => set({ hasSeenLanding: value }),

            // Sidebar state - default open
            isSidebarOpen: true,
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

            // Hydration state
            _hasHydrated: false,
            setHasHydrated: (state) => set({ _hasHydrated: state }),

            // User-registered custom instructions
            userInstructions: [],
            addUserInstruction: (instruction) => set((state) => ({
                userInstructions: [instruction, ...state.userInstructions]
            })),
            deleteUserInstruction: (id) => set((state) => ({
                userInstructions: state.userInstructions.filter((i) => i.id !== id)
            })),
        }),
        {
            name: 'your-ai-app-storage',
            partialize: (state) => ({
                hasSeenLanding: state.hasSeenLanding,
                isSidebarOpen: state.isSidebarOpen,
                userInstructions: state.userInstructions,
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
