export interface Message {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
}

export interface User {
    id: string
    email: string
    name: string
}
