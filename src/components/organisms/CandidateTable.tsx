import { useState } from "react"
import { Check, Download, Lock } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { useAppStore } from "@/store/useAppStore"
import { useSearch } from "@/hooks/useSearch"
import type { Candidate } from "@/types"
import { CandidateDetailsModal } from "./CandidateDetailsModal"
import { cn, getScoreBadgeStyles, getRoundedScore } from "@/lib/utils"
import { useAppMode } from "@/hooks/useAppMode"
import { useSearchParams } from "react-router-dom"
import { UnlockContactModal } from "../molecules/UnlockContactModal"

export function CandidateTable() {
    const searchQuery = useAppStore((state) => state.searchQuery)
    const { data: candidates = [], isLoading } = useSearch(searchQuery)
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

    // Snapshot mode logic
    const appMode = useAppMode()
    const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false)
    const [searchParams] = useSearchParams()
    // Default to 'pro' if not specified, matching useSearch logic roughly, 
    // but here we need to know what the search WAS. 
    // The search result comes from `useSearch`. 
    // Let's assume the search parameters currently in URL/store dictated the result.
    const currentSearchPlan = searchParams.get('plan') || useAppStore((state) => state.planInfo.tier)

    const handleContactClick = (e: React.MouseEvent, candidate: Candidate) => {
        e.stopPropagation()

        if (appMode === 'snapshot') {
            if (currentSearchPlan === 'starter' || currentSearchPlan === 'free') {
                // Direct redirect for starter searches
                window.location.href = "https://www.larton.nl/snapshot-contactgegevens/"
            } else {
                // Show modal for 'pro' searches
                setIsUnlockModalOpen(true)
            }
        } else {
            // Check for starter plan doing a professional search
            if (currentSearchPlan === 'starter' && candidate.category === 'professional') {
                setIsUnlockModalOpen(true)
                return
            }

            // Default Pro behavior or General category in starter
            window.location.href = `mailto:${candidate.email}`
        }
    }

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

        // 'Full Name',
        //     'Email',
        //     'Phone',
        //     'Job Title',
        //     'Current Function',
        //     'Company',
        //     'City',
        //     'Match Score',
        //     'Semantic Similarity',
        //     'Category',
        //     'Open To Offers',
        //     'Feedback',
        //     'Responsibilities',
        //     'Years Experience',
        //     'Experience Details',
        //     'Education',
        //     'Self Description'

        const headers = [
            'Volledige naam',
            'E-mail',
            'Telefoon',
            'Functie',
            'Huidige functie',
            'Bedrijf',
            'Stad',
            'Wedstrijdscore',
            'Categorie',
            'Open voor aanbiedingen',
            'Feedback',
            'Verantwoordelijkheden',
            'Jaren ervaring',
            'Ervaringsdetails',
            'Opleiding',
            'Zelfomschrijving'
        ]

        const csvContent = [
            headers.join(','),
            ...selectedCandidates.map(c => [
                `"${c.full_name || ''}"`,
                `"${c.email || ''}"`,
                `"${c.contact_info?.phone || ''}"`,
                `"${c.job_title || ''}"`,
                `"${c.current_function || ''}"`,
                `"${c.company || ''}"`,
                `"${c.city || ''}"`,
                `"${getRoundedScore(c.match_score)}"`,
                `"${c.category || ''}"`,
                `"${c.open_to_offers || ''}"`,
                `"${(c.feedback || '').replace(/"/g, '""')}"`, // Escape quotes
                `"${(c.details?.responsibilities || '').replace(/"/g, '""')}"`,
                `"${c.details?.years_experience || ''}"`,
                `"${(c.details?.experience || '').replace(/"/g, '""')}"`,
                `"${(c.details?.education || '').replace(/"/g, '""')}"`,
                `"${(c.details?.self_description || '').replace(/"/g, '""')}"`
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', 'kandidaten.csv')
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const handleRowClick = (candidate: Candidate) => {
        // Check for starter plan doing a professional search
        if (currentSearchPlan === 'starter' && candidate.category === 'professional') {
            setIsUnlockModalOpen(true)
            return
        }

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
                            {appMode !== 'snapshot' && (
                                <Button
                                    onClick={handleDownloadCSV}
                                    variant="outline"
                                    className="h-8 gap-2 border-primary-200 text-primary-600 cursor-pointer hover:bg-primary-100"
                                >
                                    <Download className="w-4 h-4" />
                                    CSV downloaden
                                </Button>
                            )}
                        </div>
                    )}
                    {/* Header */}
                    <div className="grid grid-cols-[48px_250px_160px_180px_120px_80px_80px_140px_120px_1fr] gap-4 items-center bg-primary-dark px-6 py-3">
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
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Huidige positie</span>
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Geinteresseerd in</span>
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Stad</span>
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Ervaring</span>
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Score</span>
                        </div>

                        <div className="flex items-center text-white text-base font-medium">
                            <span>Actie</span>
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Open voor een bod</span>
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Feedback</span>
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col">
                        {isLoading ? (
                            <div className="p-8 text-center text-text-muted">De database wordt doorzocht naar talent...</div>
                        ) : candidates.length === 0 ? (
                            <div className="p-8 text-center text-text-muted">Geen kandidaten gevonden</div>
                        ) : (
                            candidates.map((candidate, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleRowClick(candidate)}
                                    className="grid grid-cols-[48px_250px_160px_180px_120px_80px_80px_140px_120px_1fr] gap-4 items-center px-6 py-4 border-b border-stroke last:border-none hover:bg-gray-50 transition-colors cursor-pointer"
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

                                    <span className="text-text-primary text-sm truncate" >{candidate.current_function}</span>

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
                                            {getRoundedScore(candidate.match_score)}
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <Button
                                            className={cn(
                                                "px-4 py-2 h-8 rounded-md text-xs font-medium text-white transition-colors",
                                                appMode === 'snapshot' ? "bg-amber-500 hover:bg-amber-600" : "bg-primary-dark"
                                            )}
                                            onClick={(e) => handleContactClick(e, candidate)}
                                        >
                                            {appMode === 'snapshot' ? (
                                                <span className="flex items-center gap-1.5">
                                                    <Lock className="w-3 h-3" />
                                                    Ontgrendel
                                                </span>
                                            ) : (
                                                "Contact"
                                            )}
                                        </Button>
                                    </div>

                                    <span className="text-text-primary text-sm capitalize">{candidate.open_to_offers}</span>

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

            <UnlockContactModal
                isOpen={isUnlockModalOpen}
                onClose={() => setIsUnlockModalOpen(false)}
            />
        </div>
    )
}
