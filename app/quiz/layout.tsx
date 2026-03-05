'use client'
import { QuizProvider } from "@/context/quizContext"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <QuizProvider>
            {children}
        </QuizProvider>
    )
}