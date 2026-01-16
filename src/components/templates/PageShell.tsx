import { type ReactNode } from "react"
import { Header } from "@/components/organisms/Header"
import { UploadProgressToast } from "@/components/molecules/UploadProgressToast"
// import { LeftSidePanel } from "@/components/organisms/LeftSidePanel"

interface PageShellProps {
    children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
    return (
        <div className="flex w-full h-screen bg-background overflow-hidden">
            <UploadProgressToast />
            {/* <LeftSidePanel /> */}
            <div className="flex-1 flex flex-col h-full min-w-0">
                <Header />
                <main className="flex-1 flex flex-col overflow-y-auto relative w-full">
                    {children}
                </main>
            </div>
        </div>
    )
}
