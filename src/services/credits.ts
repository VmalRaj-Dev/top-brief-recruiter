import { api } from './api'

export interface CreditBalanceResponse {
    balance?: number;
    credits?: number;
    [key: string]: any;
}

export const creditsService = {
    getBalance: async () => {
        return api.get<CreditBalanceResponse>('/credits/balance')
    }
}
