export function maskEmail(email: string | undefined | null): string {
    if (!email) return 'Niet beschikbaar'

    // Show first 3 chars, mask the rest with ***
    // Ensure we don't mask if it's too short, but requirement says "Show only the first 3 characters... Replace the rest with asterisks"
    // Example: vmalRaj... -> vim***@gmail.com is NOT what was asked. 
    // Requirement: "Show only the first 3 characters of: email... Replace the rest with asterisks (***). Examples: vimal***@gmail.com"
    // Wait, "vimal***@gmail.com" shows 5 characters "vimal". 
    // Let's look closely at the requirement:
    // "Show only the first 3 characters of: email ... Replace the rest with asterisks (***). Examples: vimal***@gmail.com"
    // The example "vimal***@gmail.com" contradicts "first 3 characters". 
    // "vimal" is 5 chars. 
    // Let's assume the example is illustrative of the format (text***domain) or maybe the requirement meant "Show first few chars".
    // But then it says "Examples: vimal***@gmail.com".
    // And " +91 987***".

    // Let's re-read carefully: "Show only the first 3 characters of: email ... Examples: vimal***@gmail.com"
    // Maybe it means "Show first 3 characters of the *local part*"? 
    // Or maybe "vimal" was just a name and they masked the rest? 
    // Let's stick to the text "Show only the first 3 characters". 
    // However, usually masking keeps the domain visible for context. 
    // "vimal***@gmail.com" - this looks like: show first N chars of local part, verify domain? 
    // But the text says "Replace the rest with asterisks". 
    // If I strictly follow "Show only first 3 chars", it would be "vim***". 
    // If I follow the example "vimal***@gmail.com", it seems to be keeping the domain.

    // I will implement a standard partial masking: Keep first 3 chars of local part, mask rest of local part, keep domain.
    // If local part is short (< 3), show what we have.

    const parts = email.split('@')
    if (parts.length !== 2) return '***' // Invalid email fallback

    const [local, domain] = parts
    const visibleLength = 3

    const visiblePart = local.slice(0, visibleLength)

    return `${visiblePart}***@${domain}`
}

export function maskPhone(phone: string | undefined | null): string {
    if (!phone) return 'Niet beschikbaar'

    // Requirement: "Show only the first 3 characters... Replace the rest with asterisks (***). Example: +91 987***"
    // +91 987 is 7 characters (including space). 
    // The example "+91 987***" shows significantly more than 3 characters.
    // It seems the user means "Show the first part, mask the detailed part". 
    // Or maybe "Show first 3 characters" was a loose description and the example is the truth.
    // "Example: +91 987***" -> This looks like Country Code + Area Code key + ***.

    // Let's try to be smart. If it starts with +, keep the first few distinct parts? 
    // Or just simplistic: Keep first 8 chars? 
    // Let's stick to the text constraint if the example is ambiguous, OR try to match the example logic.
    // Logic for "+91 987***": 
    // Length is probably around 12-14. Masking the last 3-4 digits is common.
    // But request says "Replace the rest with asterisks".

    // Let's implement: Show first 3 characters generally. 
    // BUT the example clearly shows more. 
    // "vimal***@gmail.com" (5 chars shown)
    // "+91 987***" (7 chars shown) 

    // I will go with a safe default: Show roughly half or first 4-5 chars. 
    // Actually, "Show only the first 3 characters" might be a typo for "Show first 3 *groups*" or similar.
    // But "vimal" (5 chars). 

    // Decision: I will implement a "Keep first 3 characters" logic strictly for "User Requirement text", but then add the domain for email because usage of @ in example. 
    // For phone: The example "+91 987***" suggests showing about 6-7 chars. 
    // I'll stick to a generic: Show first 6 chars for phone? 
    // Or better: Show first 3 characters *of the string*.
    // If I do `phone.slice(0, 3) + '***'`, for "+31 6 12345678", it would be "+31***". That seems too aggressive masking compared to example.
    // The example "+91 987***" implies `+91 987` is visible.

    // Let's use a "visible count" of 6 for phone and 3 for email local part.

    // Email: 
    // vimal***@gmail.com -> vimal is 5 chars. 
    // Maybe the user meant "leaves 3 characters masked"? No, "Replace the rest with asterisks".

    // I will try to satisfy "Show only the first 3 characters" BUT interpreting "first 3 characters" as "first 3 meaningful chunks" or just "first 3 chars" if I have to be literal.
    // However, literal "first 3" for "vimal@gmail.com" -> "vim***". Use this.
    // For phone "+31 6...", literal "first 3" -> "+31***". 

    // I will implement "Show first 3 chars" as requested in text. The examples might be loosely typed.
    // Wait, the example "vimal***@gmail.com" is extremely specific.
    // The prompt says: "Show only the first 3 characters of: email, phone number. Replace the rest with asterisks (***). Examples: vimal***@gmail.com, +91 987***"

    // Contradiction: 
    // Text: "first 3 characters"
    // Ex 1: "vimal" (5 chars)
    // Ex 2: "+91 987" (7 chars)

    // I will simply perform this:
    // Email: show first 3 chars of local part + '***' + domain. (e.g. vim***@gmail.com)
    // Phone: show first 3 chars + '***'. (e.g. +31***)
    // This is the safest interpretation of the *text* instruction. The examples might be from a previous iteration or mock.

    // Re-reading: "Show only the first 3 characters of: email"
    // Okay, I will do exactly that. 
    // Email: `email.slice(0, 3) + '***'`? No, usually you want to see domain. 
    // I will preserve domain.

    const visibleLen = 3
    // Phone
    // Clean spaces? No, keep format.
    const visiblePhone = phone.slice(0, visibleLen)
    return `${visiblePhone}***`
}
