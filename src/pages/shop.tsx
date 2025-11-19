import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { useState } from "react";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  const products = [
    {
      id: 1,
      image: "/images/jewellery-box.jpg",
      title: "Handmade Wooden Jewellery Box",
      price: "₹400",
      category: "Woodwork"
    },
    {
      id: 2,
      image: "/images/vase.jpg",
      title: "Hand Painted Ceramic Vase",
      price: "₹1250",
      category: "Ceramics"
    },
    {
      id: 3,
      image: "/images/keepsake-box.jpg",
      title: "Handcrafted Wooden Keepsake Box",
      price: "₹980",
      category: "Woodwork"
    },
    {
      id: 4,
      image: "/images/plant-wall-decor.jpg",
      title: "Plant Wall Decor",
      price: "₹750",
      category: "Home Decor"
    },
    {
      id: 5,
      image: "/images/clay-sculpture.jpg",
      title: "Clay Sculpture",
      price: "₹2000",
      category: "Sculptures"
    },
    {
      id: 6,
      image: "/images/decorative-teapot.jpg",
      title: "Traditional Decorative Teapot",
      price: "₹1500",
      category: "Ceramics"
    },
    {
      id: 7,
      image: "/images/floral-wreath.jpg",
      title: "Floral Wreath",
      price: "₹1000",
      category: "Home Decor"
    },
    {
      id: 8,
      image: "/images/wall-hanging.jpg",
      title: "Beautiful Wall Hanging",
      price: "₹2000",
      category: "Home Decor"
    },
    {
      id: 9,
      image: "/images/wooden-art.jpg",
      title: "Wooden Carving Art",
      price: "₹1800",
      category: "Woodwork"
    }
  ];

  const categories = ["All", "Woodwork", "Ceramics",  "Home Decor", "Sculptures"];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="bg-[#FDFBF7] text-[#2C2C2C] min-h-screen">
      <Navbar />

      {/* Shop Header - Mobile Optimized */}
      <section className="py-12 px-4 sm:px-6 lg:py-20 bg-gradient-to-br from-[#7D4F2C]/10 to-[#FDFBF7]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[#2C2C2C] tracking-tight">
            Our <span className="text-[#7D4F2C]">Collection</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            Explore our curated selection of handmade treasures. Each piece is crafted with love and tells a unique story of traditional craftsmanship.
          </p>
          
          {/* Category Filters - Mobile Scrollable */}
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

      {/* Products Grid - Mobile Optimized */}
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
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}