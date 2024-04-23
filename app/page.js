'use client';
import Converter from "./components/Converter";
import Navbar from "./components/navbar";
import { useEffect } from "react";
import Image from "next/image";
import bg from "../public/BG.jpg"

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
    <div className="relative">
      <div className="absolute inset-0 bg-black opacity-35">
        {/* Background image with opacity */}
        <Image src={bg} alt="Background" layout="fill" objectFit="cover" style={{ opacity: 0.75, zIndex: -1 }}/>
      </div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        <main className="flex flex-col items-center justify-center p-24 z-10 relative">
          <div className="container mx-auto p-4">
            <Converter />
          </div>  
        </main>
      </div>
    </div>
  );
}
