"use client";

import { useQuery } from "react-query"
import { fetchCategories } from "../api/category"
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Table() {

    const { status: queryStatus, data: categories, error: queryErrors } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => await fetchCategories() as CategoryInterface[]
    })

    if (queryStatus === 'loading') return (
        <section className="grid grid-cols-3 gap-5">
            {
                [...Array(3)].map((_, index) => (
                    <div className="shadow bg-white p-5 rounded-xl border">
                        <div className="flex flex-col justify-start gap-3">
                            <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
                            <div className="w-2/3 h-6 bg-gray-200 rounded"></div>
                            <div className="mt-3 w-1/3 h-8 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))
            }
        </section>
    )

    return (
        <section className="grid grid-cols-3 gap-5">
            {
                categories && categories?.map((category, index) => (
                    <div key={index} className="shadow bg-white p-5 rounded-xl border border-[#d7dac5]/40">
                        <div className="flex flex-col justify-start gap-3">
                            <div className="text-[10px] bg-[#d7dac5]/40 w-fit px-2 py-1 rounded-full uppercase font-semibold">Category</div>
                            <div className="text-2xl capitalize font-bold">{category.name}</div>
                            <Link href={`/category/${category.slug}`} className="w-fit">
                                <Button
                                    variant={"outline"}
                                    size={"sm"}
                                    className="w-fit"
                                >
                                    Read Posts
                                    <ChevronRight className="ml-2 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}