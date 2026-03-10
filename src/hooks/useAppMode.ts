import { useLocation, useSearchParams } from 'react-router-dom'

export type AppMode = 'pro' | 'snapshot' | 'trial' | 'starter'

export function useAppMode(): AppMode {
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const plan = searchParams.get('plan')
    if (location.pathname.startsWith('/snapshot')) {
        return 'snapshot'
    }
    if (plan === 'trial') {
        return 'trial'
    }
    if (plan === 'starter') {
        return 'starter'
    }
    return 'pro'
}
