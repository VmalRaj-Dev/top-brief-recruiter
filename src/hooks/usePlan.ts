import { useAppStore } from '@/store/useAppStore'

export function usePlan() {
    const planInfo = useAppStore((state) => state.planInfo)
    const setPlanInfo = useAppStore((state) => state.setPlanInfo)

    return { planInfo, setPlanInfo }
}
