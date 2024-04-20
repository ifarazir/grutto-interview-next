import Container from "./container";

export default async function Page({ params }: { params: { slug: string } }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="container mx-auto mt-10">
                <Container />
            </div>
        </main>
    )
}