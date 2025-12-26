import chatIntroIcon from "@/assets/Group 8.svg"

export function ChatIntro({ name = "Jackson" }) {
    return (
        <div className="flex flex-col items-center text-center gap-4 py-10">

            {/* ICON */}
            {/* <div className="h-[180px] w-[180px] rounded-full bg-gradient-to-br from-primary-600 to-primary-200 flex items-center justify-center shadow-sm"> */}
            <div className="h-[140px] w-[140px] rounded-full bg-white/40 flex items-center justify-center">
                <img src={chatIntroIcon} alt="chat-intro-icon" />
            </div>
            {/* </div> */}

            {/* TEXT */}
            <div className="space-y-1">
                <h1 className="text-4xl text-foreground">
                    Hello {name}!
                </h1>
                <p className="text-3xl font-medium text-muted-foreground">
                    How can I assist you today?
                </p>
            </div>

        </div>
    );
}
