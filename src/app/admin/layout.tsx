"use client";

import AdminNav from "@/components/adminNav";
import Nav from "@/components/nav"
import { SessionProvider } from 'next-auth/react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            <Nav />
            <AdminNav />
            <main>{children}</main>
        </SessionProvider>
    )
}