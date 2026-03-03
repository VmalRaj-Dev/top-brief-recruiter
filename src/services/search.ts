import { api } from './api'
import type { Candidate } from '@/types'
import type { AppMode } from '@/hooks/useAppMode'

export const searchService = {
    search: async (query: string, plan: string, limit: number, mode: AppMode = 'pro'): Promise<Candidate[]> => {
        // Assuming POST request for search with a query payload
        // Adjust payload structure as per actual API requirement
        const endpoint = mode === 'snapshot' ? '/search/masked' : (plan === 'starter' ? '/professional/search' : '/search')
        const effectivePlan = mode === 'snapshot' ? 'pro' : plan
        const response = await api.post<any>(endpoint, { query, plan: effectivePlan, limit })

        // Handle case where API returns a message object instead of an array
        if (!Array.isArray(response)) {
            return []
        }

        return response
    }
}
