import { create } from 'zustand'

interface PlanInfo {
    tier: 'free' | 'pro' | 'enterprise'
    messagesRemaining: number
    maxMessages: number
}

interface AppState {
    // Plan info
    planInfo: PlanInfo
    setPlanInfo: (info: PlanInfo) => void

    // UI flags
    isSidebarOpen: boolean
    toggleSidebar: () => void

    // Search
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export const useAppStore = create<AppState>((set) => ({
    // Plan info
    planInfo: {
        tier: 'pro',
        messagesRemaining: 10,
        maxMessages: 10,
    },
    setPlanInfo: (info) => set({ planInfo: info }),

    // UI flags
    isSidebarOpen: true,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    // Search
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
}))
