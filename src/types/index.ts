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
    email: string
    full_name: string
    first_name: string
    last_name: string
    city: string
    job_title: string
    current_function: string
    company: string
    contact_info: {
        email: string
        phone: string
    }
    match_score: string
    semantic_similarity: number
    verified: boolean
    category: string
    open_to_offers: string
    feedback: string
    details: {
        responsibilities: string
        years_experience: string
        experience: string
        education: string
        self_description: string
    }
}
