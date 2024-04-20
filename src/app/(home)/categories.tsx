"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import Table from "./table";

const queryClient = new QueryClient()

export default function Categories() {

    return (
        <section>
            <QueryClientProvider client={queryClient}>
                <Table />
            </QueryClientProvider>
        </section>
    )
}