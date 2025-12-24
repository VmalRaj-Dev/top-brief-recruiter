import { type ReactNode } from "react"
import { Button } from "@/components/atoms/Button"
import { Settings, ChevronDown } from "lucide-react"

interface PageShellProps {
    children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="fixed top-0 left-0 right-0 p-6 flex justify-end items-center gap-3 z-50">
                <Button className="rounded-xl flex items-center gap-2 px-4 h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-none border-none">
                    <Settings className="size-4" />
                    <span className="font-medium">Instellingen</span>
                    <ChevronDown className="size-4" />
                </Button>
                <Button className="rounded-xl px-6 h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-none border-none">
                    <span className="font-medium">Contact</span>
                </Button>
            </header>
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    )
}
