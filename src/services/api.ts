const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const api = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`)
        if (!response.ok) throw new Error('API request failed')
        return response.json()
    },

    post: async <T>(endpoint: string, data: unknown): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('API request failed')
        return response.json()
    },

    download: async (endpoint: string, filename: string) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`)
        if (!response.ok) throw new Error('Download failed')
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    },
}
