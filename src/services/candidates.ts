import { api } from './api'

export const candidatesService = {
    importCandidates: async () => {
        await api.download('/candidates/import', 'candidates.csv')
    }
}
