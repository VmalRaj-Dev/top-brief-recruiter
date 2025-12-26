import { PageShell } from "@/components/templates/PageShell"
import { ChatPanel } from "@/components/organisms/ChatPanel"
import { ChatIntro } from "@/components/organisms/ChatIntro"

export function ChatPage() {
    return (
        <PageShell>
            <ChatIntro />
            <ChatPanel />
        </PageShell>
    )
}
