import { useLocation } from 'react-router-dom'

export type AppMode = 'pro' | 'snapshot' | 'snapshot_paid'

export function useAppMode(): AppMode {
    const location = useLocation()
    if (location.pathname.startsWith('/snapshot_paid')) {
        return 'snapshot_paid'
    }
    if (location.pathname.startsWith('/snapshot')) {
        return 'snapshot'
    }
    return 'pro'
}
