import { useAppStore } from "@/store/useAppStore"

export function PlanLimitNotice() {
    const planInfo = useAppStore((state) => state.planInfo)

    return (
        <div className="bg-primary/10 border border-primary/20 p-2 rounded text-xs">
            Plan: {planInfo.tier.toUpperCase()} | {planInfo.messagesRemaining}/{planInfo.limit} messages left
        </div>
    )
}
