import { useState } from "react"
import { ArrowDown, Check } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { useAppStore } from "@/store/useAppStore"
import { useSearch } from "@/hooks/useSearch"
import type { Candidate } from "@/types"
import { CandidateDetailsModal } from "./CandidateDetailsModal"

export function CandidateTable() {
    const searchQuery = useAppStore((state) => state.searchQuery)
    const { data: candidates = [], isLoading } = useSearch(searchQuery)
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleRowClick = (candidate: Candidate) => {
        setSelectedCandidate(candidate)
        setIsModalOpen(true)
    }

    return (
        <div className="w-full max-w-[920px] rounded-md overflow-hidden border border-stroke bg-white shadow-sm mt-6">
            <div className="overflow-x-auto">
                <div className="min-w-[1200px]">
                    {/* Header */}
                    <div className="grid grid-cols-[auto_2fr_1.5fr_1fr_1fr_1fr_1fr_2fr_0.8fr] gap-4 items-center bg-primary-600/50 px-6 py-3">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center w-5 h-5 rounded border border-white bg-transparent">
                                <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Name</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Job Title</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>City</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Exp</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Score</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Open To</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-base font-medium">
                            <span>Feedback</span>
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex items-center justify-end text-white text-base font-medium">
                            <span>Action</span>
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
                                    className="grid grid-cols-[auto_2fr_1.5fr_1fr_1fr_1fr_1fr_2fr_0.8fr] gap-4 items-center px-6 py-4 border-b border-stroke last:border-none hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 rounded border border-gray-400 bg-white"></div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium text-xs shrink-0">
                                            {candidate.full_name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-text-primary text-sm font-medium">{candidate.full_name}</span>
                                            <span className="text-text-muted text-xs truncate max-w-[150px]" title={candidate.email}>{candidate.email}</span>
                                        </div>
                                    </div>

                                    <span className="text-text-primary text-sm truncate" title={candidate.job_title}>{candidate.job_title}</span>

                                    <span className="text-text-primary text-sm truncate">{candidate.city}</span>

                                    <span className="text-text-primary text-sm">{candidate.details?.years_experience || '-'}</span>

                                    <span className="text-text-primary text-sm font-medium">{candidate.match_score}</span>

                                    <span className="text-text-primary text-sm capitalize">{candidate.open_to_offers}</span>

                                    <div className="w-full">
                                        <p className="text-text-muted text-xs line-clamp-2" title={candidate.feedback}>
                                            {candidate.feedback}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-end">
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
