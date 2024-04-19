"use client";

import Nav from "@/components/nav"
import { SessionProvider } from "next-auth/react"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <SessionProvider>
        <Nav />
      </SessionProvider>
      <main>{children}</main>
    </div>
  )
}