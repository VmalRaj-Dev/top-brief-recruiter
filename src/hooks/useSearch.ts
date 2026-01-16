import { useQuery } from '@tanstack/react-query'
import { searchService } from '@/services/search'
import { useAppStore } from '@/store/useAppStore'
import type { Candidate } from '@/types'

import { useSearchParams } from 'react-router-dom'

export function useSearch(query: string) {
    const [searchParams] = useSearchParams()
    const plan = searchParams.get('plan') || useAppStore((state) => state.planInfo.tier)
    const limit = useAppStore((state) => state.planInfo.limit)

    return useQuery<Candidate[]>({
        queryKey: ['search', query, plan, limit],
        queryFn: () => searchService.search(query, plan, limit),
        enabled: !!query,
        retry: false
    })
}
