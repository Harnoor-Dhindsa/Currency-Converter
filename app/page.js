import Converter from "./components/Converter";
import Link from "next/link";
import Trending from "./pages/trending";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Currency Converter</h1>
      <Converter />
      <div className="mt-8">
        <Trending/>
      </div>
    </div>
    </main>
  );
}
