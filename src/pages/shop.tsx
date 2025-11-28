// shop.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { useState } from "react";
import Reveal from "@/components/animations/Reveal";
import { productsData } from "@/components/data/products";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Trending Collections", "Woodwork", "Ceramics", "Home Decor", "Sculptures"];

  const filteredProducts = activeCategory === "All" 
    ? productsData 
    : productsData.filter(product => product.category === activeCategory);

  return (
    <div className="bg-[#F5F1EA] text-[#2C2C2C] min-h-screen">
      <Navbar />

      <Reveal delay={0.2}>
        {/* Shop Header */}
        <section className="py-12 px-4 sm:px-6 lg:py-20 bg-gradient-to-br from-[#7D4F2C]/10 to-[#FDFBF7]">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[#2C2C2C] tracking-tight">
              Explore Our <span className="text-[#7D4F2C]">Gallery</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
              Discover handcrafted treasures that tell stories of tradition and passion. Each piece is a unique masterpiece waiting to find its home.
            </p>
            
            {/* Category Filters */}
           <div className="flex overflow-x-auto pb-4 sm:pb-0 sm:flex-wrap justify-start sm:justify-center gap-3 mb-8 sm:mb-12 px-2 sm:px-0 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border flex-shrink-0 transition-all duration-300 font-medium whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-[#7D4F2C] border-[#7D4F2C] text-white"
                    : "border-[#7D4F2C] text-[#7D4F2C] hover:bg-[#7D4F2C] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 mb-4">
              Showing {filteredProducts.length} products
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <Footer />
      </Reveal>
       <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
}