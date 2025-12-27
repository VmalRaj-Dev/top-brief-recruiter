import { ArrowDown, Check } from "lucide-react"
import { Button } from "@/components/atoms/Button"

interface Candidate {
    id: string
    name: string
    avatar: string
    position: string
    experience: string
}

const candidates: Candidate[] = [
    {
        id: "236",
        name: "Happy Kathoria",
        avatar: "https://i.pravatar.cc/150?u=happy",
        position: "Software Engineer",
        experience: "3 yrs 1 mon",
    },
    {
        id: "236",
        name: "Happy Kathoria",
        avatar: "https://i.pravatar.cc/150?u=happy2",
        position: "Software Engineer",
        experience: "3 yrs 1 mon",
    },
    {
        id: "236",
        name: "Happy Kathoria",
        avatar: "https://i.pravatar.cc/150?u=happy3",
        position: "Software Engineer",
        experience: "3 yrs 1 mon",
    },
    {
        id: "236",
        name: "Happy Kathoria",
        avatar: "https://i.pravatar.cc/150?u=happy4",
        position: "Software Engineer",
        experience: "3 yrs 1 mon",
    },
]

export function CandidateTable() {
    return (
        <div className="w-full max-w-[920px] rounded-md overflow-hidden border border-stroke bg-white shadow-sm mt-6">
            <div className="overflow-x-auto">
                <div className="min-w-[900px]">
                    {/* Header */}
                    <div className="grid grid-cols-[auto_0.8fr_2fr_1.5fr_1.2fr_0.8fr] gap-4 items-center bg-primary-600/50 px-6 py-3">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center w-5 h-5 rounded border border-white bg-transparent">
                                <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-white text-lg font-medium">
                            <span>ID</span>
                            <ArrowDown className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-lg font-medium">
                            <span>Name</span>
                            <ArrowDown className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-lg font-medium">
                            <span>Position</span>
                            <ArrowDown className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-white text-lg font-medium">
                            <span>Experience</span>
                            <ArrowDown className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex items-center justify-end text-white text-lg font-medium">
                            <span>Action</span>
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col">
                        {candidates.map((candidate, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[auto_0.8fr_2fr_1.5fr_1.2fr_0.8fr] gap-4 items-center px-6 py-4 border-b border-stroke last:border-none hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 rounded border border-gray-400 bg-white"></div>
                                </div>

                                <span className="text-text-primary text-sm">{candidate.id}</span>

                                <div className="flex items-center gap-3">
                                    <img
                                        src={candidate.avatar}
                                        alt={candidate.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-text-primary text-sm">{candidate.name}</span>
                                </div>

                                <span className="text-text-primary text-sm">{candidate.position}</span>

                                <span className="text-text-primary text-sm">{candidate.experience}</span>

                                <div className="flex items-center justify-end">
                                    <Button
                                        className="px-8 py-4 h-9 rounded-md text-sm font-medium bg-primary-dark text-white"
                                    >
                                        Contact
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
