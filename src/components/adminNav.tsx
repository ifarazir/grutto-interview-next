"use client";

import { Button } from "@/components/ui/button";
import { GalleryHorizontalEnd, Hash, LayoutPanelLeft, LogOut, Newspaper, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminNav() {
    const { data: session, status } = useSession()

    return (
        <header className="bg-[#d7dac5]/40 border-b text-white py-1">
            <div className="container mx-auto flex items-center justify-start gap-10">
                <Link href="/admin/posts">
                    <Button variant={"link"} className="p-0">
                        <Newspaper className="w-4 h-4 mr-2" />
                        Posts
                    </Button>
                </Link>

                <Link href="/admin/categories">
                    <Button variant={"link"} className="p-0">
                        <GalleryHorizontalEnd className="w-4 h-4 mr-2" />
                        Categories
                    </Button>
                </Link>
                
                <Link href="/admin/tags">
                    <Button variant={"link"} className="p-0">
                        <Hash className="w-4 h-4 mr-2" />
                        Tags
                    </Button>
                </Link>
            </div>
        </header>
    )
}