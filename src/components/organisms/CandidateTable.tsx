import { useState } from "react"
import { ArrowDown, Check, Download } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { useAppStore } from "@/store/useAppStore"
import { useSearch } from "@/hooks/useSearch"
import type { Candidate } from "@/types"
import { CandidateDetailsModal } from "./CandidateDetailsModal"
import { cn, getScoreBadgeStyles } from "@/lib/utils"

export function CandidateTable() {
    const searchQuery = useAppStore((state) => state.searchQuery)
    const { data: candidates = [], isLoading } = useSearch(searchQuery)
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

    const toggleSelectAll = () => {
        if (selectedIds.size === candidates.length) {
            setSelectedIds(new Set())
        } else {
            // Assuming email is a unique identifier if id isn't available, but usually index or email. 
            // Looking at the data, let's use email as ID since the type doesn't strictly show an ID but 'Candidate' interface had ID in previous context? 
            // Wait, looking at types/index.ts, `Candidate` doesn't have `id`.
            // I'll use `email` as the unique key for selection.
            setSelectedIds(new Set(candidates.map(c => c.email)))
        }
    }

    const toggleSelectRow = (email: string) => {
        const newSelected = new Set(selectedIds)
        if (newSelected.has(email)) {
            newSelected.delete(email)
        } else {
            newSelected.add(email)
        }
        setSelectedIds(newSelected)
    }

    const handleDownloadCSV = () => {
        const selectedCandidates = candidates.filter(c => selectedIds.has(c.email))
        if (selectedCandidates.length === 0) return

        const headers = ['Name', 'Job Title', 'City', 'Experience', 'Score', 'Open To', 'Email', 'Phone', 'Verified']
        const csvContent = [
            headers.join(','),
            ...selectedCandidates.map(c => [
                `"${c.full_name || ''}"`,
                `"${c.job_title || ''}"`,
                `"${c.city || ''}"`,
                `"${c.details?.years_experience || ''}"`,
                `"${c.match_score || ''}"`,
                `"${c.open_to_offers || ''}"`,
                `"${c.email || ''}"`,
                `"${c.contact_info?.phone || ''}"`,
                `"${c.verified ? 'Yes' : 'No'}"`
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', 'candidates.csv')
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const handleRowClick = (candidate: Candidate) => {
        setSelectedCandidate(candidate)
        setIsModalOpen(true)
    }

    return (
        <div className="w-full max-w-[1120px] rounded-md overflow-hidden border border-stroke bg-white shadow-sm mt-6">
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    {/* Actions Bar */}
                    {selectedIds.size > 0 && (
                        <div className="flex items-center gap-6 px-6 py-2 bg-primary-50 border-b border-primary-100">
                            <span className="text-sm text-primary-600 font-medium">
                                {selectedIds.size} kandidaten geselecteerd
                            </span>
                            <Button
                                onClick={handleDownloadCSV}
                                variant="outline"
                                className="h-8 gap-2 border-primary-200 text-primary-600 cursor-pointer hover:bg-primary-100"
                            >
                                <Download className="w-4 h-4" />
                                CSV downloaden
                            </Button>
                        </div>
                    )}
                    {/* Header */}
                    <div className="grid grid-cols-[48px_250px_180px_120px_80px_80px_100px_120px_1fr] gap-4 items-center bg-primary-dark px-6 py-3">
                        <div className="flex items-center justify-center">
                            <div
                                onClick={toggleSelectAll}
                                className="flex items-center justify-center w-5 h-5 rounded border border-white bg-transparent cursor-pointer hover:bg-white/10"
                            >
                                {selectedIds.size > 0 && selectedIds.size === candidates.length && (
                                    <Check className="w-3.5 h-3.5 text-white" />
                                )}
                                {selectedIds.size > 0 && selectedIds.size < candidates.length && (
                                    <div className="w-2.5 h-0.5 bg-white rounded-full" />
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Naam</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Functietitel</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Stad</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Erv.</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Score</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Open voor</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center text-white text-base font-medium">
                            <span>Actie</span>
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Feedback</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col">
                        {isLoading ? (
                            <div className="p-8 text-center text-text-muted">Loading candidates...</div>
                        ) : candidates.length === 0 ? (
                            <div className="p-8 text-center text-text-muted">No candidates found</div>
                        ) : (
                            candidates.map((candidate, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleRowClick(candidate)}
                                    className="grid grid-cols-[48px_250px_180px_120px_80px_80px_100px_120px_1fr] gap-4 items-center px-6 py-4 border-b border-stroke last:border-none hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center justify-center">
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                toggleSelectRow(candidate.email)
                                            }}
                                            className={cn(
                                                "w-5 h-5 rounded border cursor-pointer flex items-center justify-center transition-colors",
                                                selectedIds.has(candidate.email)
                                                    ? "bg-primary-dark border-primary-dark"
                                                    : "border-gray-400 bg-white hover:border-primary-dark"
                                            )}
                                        >
                                            {selectedIds.has(candidate.email) && (
                                                <Check className="w-3.5 h-3.5 text-white" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium text-xs shrink-0">
                                            {candidate.full_name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="text-text-primary text-sm font-medium truncate" title={candidate.full_name}>{candidate.full_name}</span>
                                        </div>
                                    </div>

                                    <span className="text-text-primary text-sm truncate" title={candidate.job_title}>{candidate.job_title}</span>

                                    <span className="text-text-primary text-sm truncate">{candidate.city}</span>

                                    <span className="text-text-primary text-sm">{candidate.details?.years_experience || '-'}</span>

                                    <div className="flex items-center">
                                        <div className={cn(
                                            "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                            getScoreBadgeStyles(candidate.match_score).bg,
                                            getScoreBadgeStyles(candidate.match_score).border,
                                            getScoreBadgeStyles(candidate.match_score).text
                                        )}>
                                            {candidate.match_score}
                                        </div>
                                    </div>

                                    <span className="text-text-primary text-sm capitalize">{candidate.open_to_offers}</span>

                                    <div className="flex items-center">
                                        <Button
                                            className="px-4 py-2 h-8 rounded-md text-xs font-medium bg-primary-dark text-white"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                window.location.href = `mailto:${candidate.email}`
                                            }}
                                        >
                                            Contact
                                        </Button>
                                    </div>

                                    <div className="w-full">
                                        <p className="text-text-muted text-xs line-clamp-2" title={candidate.feedback}>
                                            {candidate.feedback}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <CandidateDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                candidate={selectedCandidate}
            />
        </div>
    )
}
