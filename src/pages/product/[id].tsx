// pages/product/[id].tsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AddToCartButton from "@/components/ui/AddToCartButton";
import Reveal from "@/components/animations/Reveal";
import { productsData } from "@/components/data/products";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (id) {
      const foundProduct = productsData.find(p => p.id === parseInt(id as string));
      setProduct(foundProduct);
      if (foundProduct) {
        setSelectedImage(foundProduct.image);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D4F2C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] text-[#2C2C2C] min-h-screen">
      <Navbar />

      <Reveal delay={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-[#7D4F2C] hover:text-[#6b4125] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Shop
            </button>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden aspect-square">
                <img 
                  src={selectedImage} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-[#EDE7E1] text-[#7D4F2C] rounded-full text-sm font-medium mb-3">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C2C2C] mb-4">
                  {product.title}
                </h1>
                <p className="text-2xl sm:text-3xl font-bold text-[#7D4F2C] mb-6">
                  {product.price}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Features:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-[#7D4F2C] mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Dimensions</h4>
                    <p>{product.dimensions}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Material</h4>
                    <p>{product.material}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <h4 className="font-semibold text-gray-700">Crafted by</h4>
                    <p className="text-[#7D4F2C]">{product.artisan}</p>
                  </div>
                </div>
              </div>

              {/* 🔥 CHANGED SECTION - Buy Now Button Fixed */}
              <div className="space-y-4 pt-6">
                <AddToCartButton
                  productId={product.id}
                  productTitle={product.title}
                  productPrice={product.price}
                  productImage={product.image}
                  variant="addToCart"
                />
                
                <AddToCartButton
                  productId={product.id}
                  productTitle={product.title}
                  productPrice={product.price}
                  productImage={product.image}
                  variant="buyNow"
                />
              </div>

              <div className="bg-[#EDE7E1] rounded-lg p-4 mt-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#7D4F2C] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">
                      <strong>Free Shipping</strong> on orders above ₹2000 • 
                      <strong> 7-Day Return </strong>• 
                      <strong> Handmade with Love</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Footer />
      </Reveal>
    </div>
  );
}