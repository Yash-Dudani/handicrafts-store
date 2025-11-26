import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/animations/Reveal";

export default function Profile() {
  const router = useRouter();
  const name = typeof window !== "undefined"
  ? localStorage.getItem("username") || "User"
  : "User";


  return (
    <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
      <Navbar />

      <Reveal delay={0.2}>
      <div className="max-w-4xl mx-auto w-full px-6 py-16">
        <h1 className="text-3xl font-semibold text-[#2C2C2C]">
          Hi, <span className="text-[#7D4F2C]">{name}</span> 👋
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          You don’t have any orders at the moment.
        </p>

        <div className="mt-8">
          <Link href="/shop">
            <button className="bg-[#7D4F2C] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#6b4125] transition-all shadow-lg hover:shadow-xl">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
      </Reveal>

      <Reveal delay={0.1}>
      <Footer />
      </Reveal>
    </div>
  );
}
