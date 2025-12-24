import { Button } from "@/components/atoms/Button"
import { AudioLines } from "lucide-react"

export function PromptInput() {
    return (
        <div
            className="relative w-full max-w-4xl min-h-[320px] p-6 bg-white border-[3px] border-primary rounded-[2.5rem] shadow-md flex flex-col gap-6"
        // style={{ padding: '3rem' }}
        >
            <textarea
                className="flex-1 w-full bg-transparent border-none outline-none resize-none text-gray-600 font-light placeholder:text-gray-300 leading-tight"
                style={{ fontSize: '1.875rem' }}
                placeholder="Geef aan waar je naar op zoek bent"
            />
            <div className="flex justify-end pt-4">
                <Button className="size-14 rounded-2xl p-0 bg-primary text-white hover:bg-primary/90 flex items-center justify-center shrink-0 shadow-lg">
                    <AudioLines className="size-8 rotate-90" />
                </Button>
            </div>
        </div>
    )
}
