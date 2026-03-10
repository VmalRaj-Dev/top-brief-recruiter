import { PromptInput } from "@/components/molecules/PromptInput"
import { CandidateTable } from "@/components/organisms/CandidateTable"
import { useAppStore } from "@/store/useAppStore"
import { useSearch } from "@/hooks/useSearch"

export function ChatPanel() {
    const searchQuery = useAppStore((state) => state.searchQuery)
    const { data: candidates = [], isLoading } = useSearch(searchQuery)

    return (
        <div className="flex-1 flex flex-col items-center p-6 bg-transparent">
            <PromptInput isLoading={isLoading} />
            {searchQuery && !isLoading && (
                <CandidateTable candidates={candidates} />
            )}
        </div>
    )
}

