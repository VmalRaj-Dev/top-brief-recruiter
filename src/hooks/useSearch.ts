import { useQuery } from '@tanstack/react-query'
import { searchService } from '@/services/search'
import { useAppStore } from '@/store/useAppStore'
import type { Candidate } from '@/types'

export function useSearch(query: string) {
    const plan = useAppStore((state) => state.planInfo.tier)

    return useQuery<Candidate[]>({
        queryKey: ['search', query, plan],
        queryFn: () => searchService.search(query, plan),
        enabled: !!query,
        retry: false
    })
}
