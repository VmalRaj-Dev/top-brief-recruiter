import React, { useState, useCallback, useRef } from 'react'
import { Upload, File, X, CloudUpload } from 'lucide-react'
import { Modal } from '@/components/molecules/Modal'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'
import { candidatesService } from '@/services/candidates'


interface UploadModalProps {
    isOpen: boolean
    onClose: () => void
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    // const [uploading, setUploading] = useState(false) // Removed as we close modal immediately
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string | null>(null)

    const validateFile = (file: File): boolean => {
        // limit to 10MB
        if (file.size > 10 * 1024 * 1024) {
            setError(`File ${file.name} is too large. Max size is 10MB.`)
            return false
        }
        // check extension or mime type for CSV
        if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
            setError(`File ${file.name} is not a CSV. Only CSV files are allowed.`)
            return false
        }
        return true
    }

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.currentTarget.contains(e.relatedTarget as Node)) return
        setIsDragging(false)
    }, [])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        setError(null)

        const droppedFiles = Array.from(e.dataTransfer.files)
        const validFiles = droppedFiles.filter(validateFile)

        if (validFiles.length > 0) {
            setFiles(prev => [...prev, ...validFiles])
        }
    }, [])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files)
            const validFiles = selectedFiles.filter(validateFile)
            setFiles(prev => [...prev, ...validFiles])
        }
        // Reset input value to allow selecting the same file again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const removeFile = (indexToRemove: number) => {
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove))
    }

    const handleUpload = async () => {
        if (files.length === 0) return

        // Close modal immediately and let the global toast handle feedback
        onClose()
        setFiles([]) // Clear files

        // Process uploads
        for (const file of files) {
            // Fire and forget (toast handles error/success)
            candidatesService.importCandidates(file).catch(err => console.error(err))
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Upload Candidates"
            className="sm:max-w-xl"
        >
            <div className="space-y-6">
                <div
                    className={cn(
                        "relative border-2 border-dashed rounded-lg p-10 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[200px]",
                        isDragging
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    )}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        multiple
                        accept=".csv"
                        onChange={handleFileSelect}
                    />

                    {error && (
                        <div className="absolute top-2 left-0 right-0 mx-auto w-11/12 bg-red-50 text-red-600 text-sm py-1 px-3 rounded-md border border-red-200">
                            {error}
                        </div>
                    )}

                    <div className="p-4 rounded-full bg-primary-100 mb-4">
                        <Upload className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Click to upload or drag and drop
                    </h3>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                        CSV only accepted (max. 10MB)
                    </p>
                </div>

                {files.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-700">Selected files</h4>
                        <div className="max-h-[200px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {files.map((file, index) => (
                                <div
                                    key={`${file.name}-${index}`}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-100"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="p-2 bg-white rounded border border-gray-100 shrink-0">
                                            <File className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-medium text-gray-900 truncate">
                                                {file.name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {(file.size / 1024).toFixed(1)} KB
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFile(index)}
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpload}
                        disabled={files.length === 0}
                        className="bg-primary text-white hover:bg-primary-dark min-w-[100px]"
                    >
                        <span className="flex items-center gap-2">
                            <CloudUpload className="w-4 h-4" />
                            Upload Files
                        </span>
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
