import { Link, Settings, LayoutGrid, Mic, ArrowUp } from "lucide-react"

export function ChatInputCard() {
  return (
    <div className="w-full max-w-[920px] p-2 rounded-[14px] border-[3px] bg-primary-100" style={{ borderColor: 'var(--border-primary)' }}>
      <div className="flex flex-col">
        <div className="flex flex-col gap-[82px] p-4 px-6 rounded-lg bg-white">
          {/* Prompt Input */}
          <textarea
            className="text-text-primary font-normal text-sm leading-normal min-h-[20px] resize-none outline-none border-none bg-transparent"
            placeholder="An AI chatbot that automates candidate screening and hiring."
          />

          {/* Action Bar */}
          <div className="flex items-center justify-between">
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Attach Button */}
              <button className="flex items-center gap-3 py-2 pr-6 border-r border-stroke hover:opacity-80 transition-opacity">
                <Link className="size-6" style={{ stroke: 'var(--icon-muted)' }} strokeWidth={1.5} />
                <span className="text-text-primary text-sm font-medium">Attach</span>
              </button>

              {/* Settings Button */}
              <button className="flex items-center gap-3 py-2 px-3 pr-6 border-r border-stroke hover:opacity-80 transition-opacity">
                <Settings className="size-6" style={{ stroke: 'var(--icon-muted)' }} strokeWidth={1.5} />
                <span className="text-text-primary text-sm font-medium">Settings</span>
              </button>

              {/* Options Button */}
              <button className="flex items-center gap-3 py-2 px-3 pr-6 hover:opacity-80 transition-opacity">
                <LayoutGrid className="size-6" style={{ stroke: 'var(--icon-muted)' }} strokeWidth={1.5} />
                <span className="text-text-primary text-sm font-medium">Options</span>
              </button>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-4">
              {/* Microphone Button */}
              <button className="size-9 rounded-full bg-primary-100 flex items-center justify-center hover:opacity-80 transition-opacity">
                <Mic className="size-6" style={{ stroke: 'var(--text-primary)' }} strokeWidth={1.5} />
              </button>

              {/* Send Button */}
              <button
                className="size-9 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                style={{
                  background: 'linear-gradient(180deg, #98C3FF 0%, #257EF9 100%)'
                }}
              >
                <ArrowUp className="size-6 stroke-white" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
