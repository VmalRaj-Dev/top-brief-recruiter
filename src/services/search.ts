import { api } from './api'
import type { Candidate } from '@/types'

export const searchService = {
    search: async (query: string, plan: string): Promise<Candidate[]> => {
        // Assuming POST request for search with a query payload
        // Adjust payload structure as per actual API requirement
        const response = await api.post<Candidate[]>('/search', { query, plan })
        return response
    }
}
