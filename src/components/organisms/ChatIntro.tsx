// import chatIntroIcon from "@/assets/ai animation Flow 1.gif"
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function ChatIntro() {
    return (
        <div className="flex flex-col items-center text-center gap-4 py-10">

            {/* ICON */}
            {/* <div className="h-[180px] w-[180px] rounded-full bg-gradient-to-br from-primary-600 to-primary-200 flex items-center justify-center shadow-sm"> */}
            <div className="w-full max-w-[240px] aspect-square flex items-center justify-center">
                {/* <img src={chatIntroIcon} alt="AI chat introduction animation" className="h-full w-full" /> */}
                <DotLottieReact
                    src="https://lottie.host/5e479e07-ee6f-40b4-b718-1a9ff8e978ce/jiHAnMMOx8.lottie"
                    loop
                    autoplay
                    className="w-full h-full"
                    speed={0.3}
                />
            </div>
            {/* </div> */}

            {/* TEXT */}
            <div className="space-y-1">
                {/* <h1 className="text-4xl text-foreground">
                    Hello {name}!
                </h1> */}
                <p className="text-3xl font-medium text-muted-foreground">
                    Hoe kan ik je vandaag van dienst zijn?
                </p>
            </div>

        </div>
    );
}
