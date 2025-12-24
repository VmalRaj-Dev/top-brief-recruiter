import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/app/layout'
import { ChatPage } from '@/pages/ChatPage'
import { AdminPage } from '@/pages/AdminPage'

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<ChatPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
