'use client';
import Converter from "./components/Converter";
import Navbar from "./components/navbar";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Disable scrolling on the body element
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main className="flex flex-col items-center justify-center p-24">
          <div className="container mx-auto p-4">
            <Converter />
          </div>
        </main>
      </div>
    </div>
  );
}
