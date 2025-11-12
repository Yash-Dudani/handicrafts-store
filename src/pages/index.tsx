
import Navbar  from "../components/layout/Navbar";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
export default function Home() {
  return (
   <>
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* ...rest of your content (Images, headings, links) ... */}
      </main>
    
    </>
  );
}
