"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import Content from "./content";

const queryClient = new QueryClient()

export default function Container() {

    return (
        <section>
            <QueryClientProvider client={queryClient}>
                <Content />
            </QueryClientProvider>
        </section>
    )
}