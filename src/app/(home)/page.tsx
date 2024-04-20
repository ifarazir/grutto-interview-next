import Categories from "./categories";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mx-auto mt-10">
        <Categories />
      </div>
    </main>
  );
}
