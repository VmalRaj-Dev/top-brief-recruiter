import { queryClient } from '../app/providers'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const getBearerToken = () => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    return `Bearer ${token || 'jdf74j3498t49sbs945nb84'}`
}

const triggerBalanceRefetch = (endpoint: string) => {
    if (!endpoint.includes('/credits/balance')) {
        queryClient.invalidateQueries({ queryKey: ['credits_balance'] })
    }
}

export const api = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': getBearerToken()
            }
        })
        if (!response.ok) throw new Error('API request failed')
        triggerBalanceRefetch(endpoint)
        return response.json()
    },

    upload: async <T>(endpoint: string, formData: FormData, onProgress?: (progress: number) => void): Promise<T> => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', `${API_BASE_URL}${endpoint}`)
            xhr.setRequestHeader('Authorization', getBearerToken())

            if (onProgress) {
                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = Math.round((event.loaded / event.total) * 100)
                        onProgress(percentComplete)
                    }
                }
            }

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText)
                        triggerBalanceRefetch(endpoint)
                        resolve(response)
                    } catch (error) {
                        // Fallback for non-JSON responses if necessary, or just resolve null
                        triggerBalanceRefetch(endpoint)
                        resolve({} as T)
                    }
                } else {
                    reject(new Error('File upload failed'))
                }
            }

            xhr.onerror = () => {
                reject(new Error('Network error during upload'))
            }

            xhr.send(formData)
        })
    },

    post: async <T>(endpoint: string, data: unknown): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getBearerToken()
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('API request failed')
        triggerBalanceRefetch(endpoint)
        return response.json()
    },

    download: async (endpoint: string, filename: string) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': getBearerToken()
            }
        })
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
        triggerBalanceRefetch(endpoint)
    },
}
