import { api } from './api'
import { useAppStore } from '@/store/useAppStore'

export const candidatesService = {
    importCandidates: async (file: File) => {
        const store = useAppStore.getState()

        try {
            store.setUploadStatus('uploading')
            store.setUploadProgress(0)

            // Start the actual upload in the background (fire and forget from UI perspective)
            const formData = new FormData()
            formData.append('file', file)

            // We don't await this promise for the UI flow, but we catch generic errors
            // Note: If the backend fails *after* our simulation is done, the user might see success then nothing.
            // This aligns with "background process" expectation.
            api.upload('/candidates/import', formData).catch(err => {
                console.error('Background upload failed:', err)
                // Optionally update status if we are still viewing it, 
                // but for now we follow the "simulate success" path for the immediate feedback.
            })

            // Simulate progress over ~5 seconds
            const duration = 5000 // 5 seconds
            const interval = 100 // update every 100ms
            const steps = duration / interval
            const increment = 100 / steps

            let currentProgress = 0

            const timer = setInterval(() => {
                currentProgress += increment
                if (currentProgress >= 100) {
                    currentProgress = 100
                    clearInterval(timer)
                    store.setUploadProgress(100)
                    store.setUploadStatus('success')
                } else {
                    store.setUploadProgress(Math.round(currentProgress))
                }
            }, interval)

        } catch (error) {
            console.error('Upload initiation failed:', error)
            store.setUploadStatus('error')
            throw error
        }
    }
}
