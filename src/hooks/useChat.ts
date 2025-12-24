import { useState } from 'react'

export function useChat() {
    const [messages, setMessages] = useState<string[]>([])

    const sendMessage = (message: string) => {
        setMessages((prev) => [...prev, message])
    }

    return { messages, sendMessage }
}
