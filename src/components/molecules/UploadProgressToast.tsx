import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { Check, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function UploadProgressToast() {
    const { uploadStatus, uploadProgress, setUploadStatus } = useAppStore()

    // Auto-dismiss success message after 3 seconds
    useEffect(() => {
        if (uploadStatus === 'success') {
            const timer = setTimeout(() => {
                setUploadStatus('idle')
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [uploadStatus, setUploadStatus])

    // Early return removed to allow exit animation
    // if (uploadStatus === 'idle') return null

    return (
        <div className={cn(
            "fixed top-4 right-4 z-[60] w-80 bg-white rounded-lg shadow-lg border border-gray-100 p-4 transition-all duration-300 transform",
            uploadStatus === 'idle' ? "translate-y-[-100px] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        )}>
            <div className="flex items-start gap-3">
                <div className={cn(
                    "p-2 rounded-full",
                    uploadStatus === 'uploading' && "bg-blue-50 text-blue-600",
                    uploadStatus === 'success' && "bg-green-50 text-green-600",
                    uploadStatus === 'error' && "bg-red-50 text-red-600"
                )}>
                    {uploadStatus === 'uploading' && <Loader2 className="w-5 h-5 animate-spin" />}
                    {uploadStatus === 'success' && <Check className="w-5 h-5" />}
                    {uploadStatus === 'error' && <X className="w-5 h-5" />}
                </div>

                <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-900">
                            {uploadStatus === 'uploading' && "Uploading files..."}
                            {uploadStatus === 'success' && "Upload Complete"}
                            {uploadStatus === 'error' && "Upload Failed"}
                        </h4>
                        {uploadStatus === 'uploading' && (
                            <span className="text-xs text-gray-500 font-medium">{uploadProgress}%</span>
                        )}
                    </div>

                    <p className="text-xs text-gray-500">
                        {uploadStatus === 'uploading' && "Please wait while we process your candidates."}
                        {uploadStatus === 'success' && "Your candidates have been successfully added."}
                        {uploadStatus === 'error' && "Something went wrong. Please try again."}
                    </p>

                    {uploadStatus === 'uploading' && (
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setUploadStatus('idle')}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
