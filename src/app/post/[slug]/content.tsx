"use client";

import { QueryClient, useQuery } from "react-query"
import { Button } from "@/components/ui/button";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { fetchCategory } from "@/app/api/category";
import { useParams } from "next/navigation";
import { fetchPost } from "@/app/api/post/index copy";

const queryClient = new QueryClient()

export default function Content() {
    // get slug from params
    const params = useParams<{ slug: string }>()

    const { status: queryStatus, data: post, error: queryErrors } = useQuery({
        queryKey: ['post', params?.slug],
        queryFn: ({ queryKey }) => fetchPost(queryKey[1]) as unknown as PostInterface
    })

    return (
        <section className="flex flex-col">
            <h1 className="text-2xl flex items-center mb-2"><span className="mr-2 font-bold text-3xl">Post |</span> {post?.title}</h1>
            <div className="mb-5 flex items-center justify-start gap-2">
                {
                    post?.category_default && (
                        <div className="text-xs bg-[#d7dac5]/40 px-2 py-1 rounded-full font-semibold flex items-center">
                            <Star size={12} className="mr-1" />
                            Featured
                        </div>
                    )
                }
                <Link href={`/category/${post?.category?.slug}`} className="text-xs bg-[#d7dac5]/40 px-2 py-1 rounded-full uppercase font-semibold"><span className="font-light capitalize">Category:</span> {post?.category?.name}
                </Link>
                <div className="text-xs bg-[#d7dac5]/40 px-2 py-1 rounded-full uppercase font-bold"><span className="font-light capitalize">Author:</span> {post?.author?.name}</div>
                {
                    post?.tags && post?.tags?.length > 0 && post.tags.map((tag, index) => (
                        <div key={index} className="text-xs bg-[#d7dac5]/40 px-2 py-1 rounded-full uppercase font-semibold"><span className="font-light capitalize">#</span> {tag.name}</div>
                    ))
                }
            </div>

            <div className="shadow bg-white p-5 rounded-xl border border-[#d7dac5]/40 mb-5">
                {post?.content}
            </div>

            {
        post?.external_urls && post?.external_urls?.length > 0 && (
            <div className="shadow bg-white p-5 rounded-xl border border-[#d7dac5]/40">
                <div className="flex flex-col gap-3">
                    {
                        post.external_urls.map((url, index) => (
                            <Link href={url} key={index} target="_blank">
                                <Button variant={"link"}>
                                    <ChevronRight size={16} className="mr-2" />
                                    {url}
                                </Button>
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    }
        </section >
    )
}