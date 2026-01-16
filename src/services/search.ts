import { api } from './api'
import type { Candidate } from '@/types'

export const searchService = {
    search: async (query: string, plan: string, limit: number): Promise<Candidate[]> => {
        // Assuming POST request for search with a query payload
        // Adjust payload structure as per actual API requirement
        const response = await api.post<any>('/search', { query, plan, limit })

        // Handle case where API returns a message object instead of an array
        if (!Array.isArray(response)) {
            return []
        }

        return response
    }
}
