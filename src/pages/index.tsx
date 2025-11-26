import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Testimonials from "@/components/ui/TestimonialCard";
import BlogPreview from "@/components/sections/BlogPreview";
import Link from "next/link";
import Reveal from "@/components/animations/Reveal";

export default function Home() {
  return (
    <div className="bg-[#FDFBF7] text-[#2C2C2C]">
      <Navbar />

      {/* Hero Section - Fully Responsive */}
      <Reveal>
      <section className="relative min-h-[90vh] flex flex-col justify-center items-start px-4 sm:px-6 lg:px-20 text-left bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 lg:to-transparent"></div>
        
        <div className="relative z-10 max-w-2xl w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight tracking-tight">
            Crafted with <span className="text-[#7D4F2C]">Passion</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-10 leading-relaxed font-light max-w-xl">
            Discover unique handmade treasures from local artisans around the world. 
            Each piece tells a story of tradition and craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/shop" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#7D4F2C] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg hover:bg-[#6b4125] transition-all duration-300 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-1">
                Shop Collection
              </button>
            </Link>
            <Link href="/artisans" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-[#2C2C2C] transition-all duration-300 text-base sm:text-lg font-medium">
                Our Story
              </button>
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>
      </Reveal>

      {/* Featured Products */}
          <Reveal delay={0.1}>
        <FeaturedProducts />
      </Reveal>
      <Reveal delay={0.2}>
         <Testimonials />
      </Reveal>
      <Reveal delay={0.3}>
         <BlogPreview />
      </Reveal>
      <Reveal delay={0.3}>
      <Footer />
      </Reveal>
    </div>
  );
}