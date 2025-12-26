import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatHistoryItem {
    id: string
    title: string
    date: string
}

const mockHistory: ChatHistoryItem[] = [
    { id: "1", title: "Job Description for PM", date: "Today" },
    { id: "2", title: "Candidate Outreach", date: "Yesterday" },
    { id: "3", title: "Interview Questions", date: "Dec 20" },
]

export function LeftSidePanel() {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <aside
            className={cn(
                "relative bg-primary-dark/50 border-r border-gray-200 h-full transition-all duration-300 ease-in-out flex flex-col",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            {/* Collapse Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50 z-10"
            >
                {isCollapsed ? (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                ) : (
                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                )}
            </button>

            {/* Content Container */}
            <div className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
                {/* Search */}
                <div className={cn("relative transition-opacity duration-300", isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100")}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-500/20 transition-all"
                    />
                </div>

                {/* Chat History List */}
                <div className="flex-1 overflow-y-auto">
                    {/* Collapsed View - Icons Only */}
                    {isCollapsed && (
                        <div className="flex flex-col items-center gap-4 mt-2">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                <Search className="w-5 h-5 text-blue-600" />
                            </div>
                            {mockHistory.map((item) => (
                                <div key={item.id} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer" title={item.title}>
                                    <MessageSquare className="w-5 h-5 text-gray-500" />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Expanded View - Full List */}
                    <div className={cn("flex flex-col gap-2 transition-opacity duration-300", isCollapsed ? "hidden opacity-0" : "flex opacity-100")}>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Recent</div>
                        {mockHistory.map((item) => (
                            <button
                                key={item.id}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left group transition-colors"
                            >
                                <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white truncate">
                                        {item.title}
                                    </div>
                                    <div className="text-xs text-gray-500">{item.date}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )
}
