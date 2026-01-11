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

export interface Candidate {
    id: string
    name: string
    avatar: string
    position: string
    experience: string
    email: string
}
