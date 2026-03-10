import { useQuery } from '@tanstack/react-query'
import { searchService } from '@/services/search'
import type { Candidate } from '@/types'

import { useSearchParams } from 'react-router-dom'

import { useAppMode } from '@/hooks/useAppMode'

export function useSearch(query: string) {
    const [searchParams] = useSearchParams()
    const mode = useAppMode()

    // Derive plan from URL param; fall back to mode so we never depend on
    // the Zustand store (which always returns 'pro' and causes re-render loops)
    const plan = searchParams.get('plan') || mode
    const limit = searchParams.get('limit') || 20

    return useQuery<Candidate[]>({
        queryKey: ['search', query, plan, limit, mode],
        queryFn: () => searchService.search(query, plan as string, Number(limit), mode),
        enabled: !!query,
        retry: false,
        // Without staleTime, every balance invalidation (triggered after each search)
        // causes a re-render which marks this query stale → re-fetches → infinite loop.
        staleTime: 1000 * 30, // 30 seconds
    })
}
