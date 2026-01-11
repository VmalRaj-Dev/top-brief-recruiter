import React from 'react'
import { ArrowUp } from "lucide-react"
import micBlack from "../../assets/mic-black.svg"
import { Button } from "@/components/atoms/Button"

// interface PromptActionButtonProps {
//     icon: React.ReactNode;
//     label: string;
//     showBorder?: boolean;
//     onClick?: () => void;
// }

// function PromptActionButton({ icon, label, showBorder, onClick }: PromptActionButtonProps) {
//     return (
//         <Button
//             variant="ghost"
//             className={`h-auto p-0 py-2 cursor-pointer pr-6 rounded-none hover:bg-transparent hover:opacity-80 gap-3 font-normal ${showBorder ? 'border-r border-stroke' : ''}`}
//             onClick={onClick}
//         >
//             {icon}
//             <span className="text-text-primary text-sm font-medium">{label}</span>
//         </Button>
//     )
// }

import { useAppStore } from "@/store/useAppStore"

export interface PromptInputProps {
    isLoading?: boolean
}

export function PromptInput({ isLoading }: PromptInputProps) {
    const [input, setInput] = React.useState("")
    const setSearchQuery = useAppStore((state) => state.setSearchQuery)

    const handleSearch = () => {
        if (input.trim()) {
            setSearchQuery(input)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSearch()
        }
    }

    return (
        <div className="w-full max-w-[920px] rounded-[14px] p-[3px] bg-gradient-to-b from-primary-600 to-primary-200">
            <div className="w-full h-full bg-primary-700 rounded-[11px] p-2">
                <div className="flex flex-col">
                    <div className="flex flex-col gap-[32px] p-4 px-6 rounded-[11px] bg-white">
                        {/* Prompt Input Text */}
                        <textarea
                            className="text-text-primary font-normal text-sm leading-normal min-h-[15px] resize-none outline-none border-none bg-transparent"
                            placeholder="An AI chatbot that automates candidate screening and hiring."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        {/* Action Bar */}
                        <div className="flex items-center justify-end">
                            {/* Action Buttons */}
                            {/* <div className="flex items-center gap-2">
                                Attach Button
                                <PromptActionButton
                                    icon={<Link className="size-6 stroke-icon-muted" strokeWidth={1.5} />}
                                    label="Attach"
                                    showBorder
                                />

                                Settings Button
                                <PromptActionButton
                                    icon={<Settings className="size-6 stroke-icon-muted" strokeWidth={1.5} />}
                                    label="Settings"
                                    showBorder
                                />

                                Options Button
                                <PromptActionButton
                                    icon={<LayoutGrid className="size-6 stroke-icon-muted" strokeWidth={1.5} />}
                                    label="Options"
                                />
                            </div> */}

                            {/* Control Buttons */}
                            <div className="flex items-center gap-4">
                                {/* Microphone Button */}
                                <Button
                                    size="icon"
                                    className="size-9 rounded-full cursor-pointer bg-transparent hover:bg-primary-700 hover:opacity-80 transition-opacity border-none"
                                >
                                    <img src={micBlack} alt="Mic" className="size-6" />
                                </Button>

                                {/* Send Button */}
                                <Button
                                    size="icon"
                                    className="size-9 cursor-pointer rounded-full hover:opacity-90 transition-opacity border-none bg-primary-dark"
                                    onClick={handleSearch}
                                    disabled={isLoading || !input.trim()}
                                >
                                    <ArrowUp className="size-6 stroke-white" strokeWidth={1.5} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
