import { useQuery } from '@tanstack/react-query'
import { searchService } from '@/services/search'
import { useAppStore } from '@/store/useAppStore'
import type { Candidate } from '@/types'

import { useSearchParams } from 'react-router-dom'

import { useAppMode } from '@/hooks/useAppMode'

export function useSearch(query: string) {
    const [searchParams] = useSearchParams()

    const storePlan = useAppStore((state) => state.planInfo.tier)
    const storeLimit = useAppStore((state) => state.planInfo.limit)

    const plan = searchParams.get('plan') || storePlan
    const limit = searchParams.get('limit') || storeLimit
    const mode = useAppMode()

    return useQuery<Candidate[]>({
        queryKey: ['search', query, plan, limit, mode],
        queryFn: () => searchService.search(query, plan as string, Number(limit), mode),
        enabled: !!query,
        retry: false
    })
}
