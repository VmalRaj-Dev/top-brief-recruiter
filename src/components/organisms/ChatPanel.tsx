import { PromptInput } from "@/components/molecules/PromptInput"
import { CandidateTable } from "@/components/organisms/CandidateTable"

export function ChatPanel() {
    return (
        <div className="flex-1 flex flex-col items-center p-6 bg-transparent">
            <PromptInput />
            <CandidateTable />
        </div>
    )
}
