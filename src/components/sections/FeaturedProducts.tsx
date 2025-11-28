// FeaturedProducts.tsx
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import { getFeaturedProducts } from "../data/products";

export default function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section id="featured-products" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-[#F5F1EA]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-[#2C2C2C] tracking-tight">
            Featured <span className="text-[#7D4F2C]">Creations</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Handpicked pieces that showcase the finest craftsmanship and attention to detail
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-10 sm:mb-16">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop">
            <button className="bg-[#7D4F2C] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl hover:bg-[#6b4125] transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-1">
              Explore All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}