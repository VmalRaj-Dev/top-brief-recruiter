import { useState } from "react"
import { Button } from "@/components/atoms/Button"
import logo from "@/assets/logo.svg"

import { Upload } from "lucide-react"
import { UploadModal } from "./UploadModal"

export function Header() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    return (
        <header className="sticky top-0 left-0 right-0 px-6 py-3 pt-6 flex justify-center items-center z-50 bg-background border-b border-gray-100">
            <div className="w-full max-w-[920px] flex justify-between items-center h-9">
                {/* Left: Topbrief Logo */}
                {/* <div className="flex items-center gap-2 px-3 py-2 border border-stroke rounded-lg bg-primary-100"> */}
                <img src={logo} alt="Topbrief" className="w-32 h-32 shrink-0" />
                {/* </div> */}

                {/* Right: Upgrade Button + User Profile */}
                <div className="flex items-center gap-7">
                    {/* Upgrade Button */}
                    <Button
                        className="px-3 py-2 h-9 rounded-lg text-sm font-medium bg-primary-dark text-white"
                    >
                        Upgrade
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full hover:bg-gray-100"
                        onClick={() => setIsUploadModalOpen(true)}
                        title="Import Candidates"
                    >
                        <Upload className="w-5 h-5 text-text-primary" />
                    </Button>

                    {/* User Profile */}
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                            J
                        </div>
                        <span className="text-text-primary text-base font-medium">Jackson</span>
                    </div>
                </div>
            </div>

            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            />
        </header>
    )
}
