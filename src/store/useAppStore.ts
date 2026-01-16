import { create } from 'zustand'

interface PlanInfo {
    tier: 'free' | 'pro' | 'enterprise'
    messagesRemaining: number
    limit: number
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

    // Upload
    uploadStatus: 'idle' | 'uploading' | 'success' | 'error'
    uploadProgress: number
    setUploadStatus: (status: 'idle' | 'uploading' | 'success' | 'error') => void
    setUploadProgress: (progress: number) => void
}

export const useAppStore = create<AppState>((set) => ({
    // Plan info
    planInfo: {
        tier: 'pro',
        messagesRemaining: 10,
        limit: 10,
    },
    setPlanInfo: (info) => set({ planInfo: info }),

    // UI flags
    isSidebarOpen: true,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    // Search
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),

    // Upload
    uploadStatus: 'idle',
    uploadProgress: 0,
    setUploadStatus: (status) => set({ uploadStatus: status }),
    setUploadProgress: (progress) => set({ uploadProgress: progress }),
}))
