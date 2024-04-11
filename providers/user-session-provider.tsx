"use client"

import { SessionProvider } from "next-auth/react"

export function UserSessionProvider ({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
