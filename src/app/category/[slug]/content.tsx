"use client";

import { QueryClient, useQuery } from "react-query"
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { fetchCategory } from "@/app/api/category";
import { useParams } from "next/navigation";
import Loading from "@/components/loading";

const queryClient = new QueryClient()

export default function Content() {
    // get slug from params
    const params = useParams<{ slug: string }>()

    const { status: queryStatus, data: category, error: queryErrors } = useQuery({
        queryKey: ['category', params?.slug],
        queryFn: ({ queryKey }) => fetchCategory(queryKey[1]) as unknown as CategorySingleInterface
    })

    if (queryStatus === 'loading') return <Loading />

    return (
        <section className="flex flex-col">
            <h1 className="text-2xl mb-5"><span className="font-bold text-3xl">Category |</span> {category?.category.name}</h1>

            {
                category?.top_articles?.length > 0 && (
                    <h3 className="text-2xl mb-2 font-bold capitalize">
                        Featured Posts
                    </h3>
                )
            }
            <div className="grid grid-cols-3 gap-5 mb-5">
                {
                    category?.top_articles.map(post => (
                        <div key={post.id} className="shadow bg-white p-5 rounded-xl border border-[#d7dac5]/40">
                            <div className="flex flex-col justify-start">
                                <div className="text-[10px] bg-[#d7dac5]/40 w-fit px-2 py-1 rounded-full uppercase font-semibold mb-2">Featured</div>
                                <Link href={`/post/${post.slug}`} className="w-fit">
                                    <div className="text-2xl capitalize font-bold">{post.title}</div>
                                </Link>
                                <p className="text-sm mb-5">{post.content.slice(0, 100)}{post.content.length > 100 && ('...')}</p>
                                <Link href={`/post/${post.slug}`} className="w-fit">
                                    <Button
                                        variant={"outline"}
                                        size={"sm"}
                                        className="w-fit"
                                    >
                                        Read Post
                                        <ChevronRight className="ml-2 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-col gap-5">
                {
                    category?.articles.map(post => (
                        <Link href={`/post/${post.slug}`} key={post.id} className="shadow bg-white p-5 rounded-xl border border-[#d7dac5]/40">
                            <div className="flex flex-col justify-start">
                                <div className="text-2xl capitalize font-bold">{post.title}</div>
                                <p className="text-sm">{post.content.slice(0, 100)}{post.content.length > 100 && ('...')}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}