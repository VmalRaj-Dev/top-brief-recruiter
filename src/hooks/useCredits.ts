import { useQuery } from '@tanstack/react-query'
import { creditsService } from '@/services/credits'

export function useCredits() {
    return useQuery({
        queryKey: ['credits_balance'],
        queryFn: creditsService.getBalance,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
