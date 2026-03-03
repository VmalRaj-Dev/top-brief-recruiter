import { Button } from "../atoms/Button";
import { useAppMode } from "@/hooks/useAppMode";
import chatIntroIcon from "@/assets/Group 8.svg";

import { useCredits } from "@/hooks/useCredits";

export function ChatIntro() {
    const appMode = useAppMode();
    const { data: creditsData } = useCredits()
    const displayCredits = creditsData?.credits_balance ?? 0;

    return (
        <div className="flex flex-col items-center text-center gap-4 py-10">

            {/* ICON */}
            {/* <div className="h-[180px] w-[180px] rounded-full bg-gradient-to-br from-primary-600 to-primary-200 flex items-center justify-center shadow-sm"> */}
            <div className="w-full max-w-[240px] aspect-square flex items-center justify-center">
                <img src={chatIntroIcon} alt="AI chat introduction animation" className="h-full w-full" />
            </div>
            {/* </div> */}

            {/* TEXT */}
            <div className="flex gap-4 items-center">
                {/* <h1 className="text-4xl text-foreground">
                    Hello {name}!
                </h1> */}
                <p className="text-3xl font-medium text-muted-foreground">
                    Hoe kan ik je vandaag van dienst zijn?
                </p>
                <div className="flex items-center gap-3">
                    {creditsData !== undefined && (
                        <div className="flex items-center px-3 py-1.5 rounded-lg border border-gray-100 bg-gray-50/50">
                            <span className="text-sm font-medium text-text-secondary">
                                {displayCredits} Credits
                            </span>
                        </div>
                    )}
                    {appMode === 'snapshot' && (
                        <Button
                            className="px-3 py-2 h-9 rounded-lg text-sm font-medium bg-primary-dark text-white"
                            onClick={() => window.location.href = "https://www.larton.nl/pro/"}
                        >
                            Upgrade
                        </Button>
                    )}
                </div>
            </div>

        </div>
    );
}
