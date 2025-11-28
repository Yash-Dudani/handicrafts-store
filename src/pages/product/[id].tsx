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
  const [quantity, setQuantity] = useState(1);

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
              className="flex items-center text-[#7D4F2C] hover:text-[#6b4125] transition-all duration-300 group"
            >
              <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Shop
            </button>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Product Images - Enhanced */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden aspect-square border border-[#E8E2D6]">
                <img 
                  src={selectedImage} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              {/* Product Highlights */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-[#F9F5F1] rounded-xl border border-[#E8E2D6]">
                <div className="text-center">
                  <div className="w-8 h-8 bg-[#7D4F2C] rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-[#2C2C2C]">Handmade</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-[#7D4F2C] rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-[#2C2C2C]">Premium</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-[#7D4F2C] rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-[#2C2C2C]">Secure</p>
                </div>
              </div>
            </div>

            {/* Product Info - Enhanced */}
            <div className="space-y-6">
              {/* Header Section */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8E2D6]">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#7D4F2C] to-[#B07A52] text-white rounded-full text-sm font-medium mb-4 shadow-md">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C2C2C] mb-4 leading-tight">
                  {product.title}
                </h1>
                <div className="flex items-baseline gap-3 mb-4">
                  <p className="text-2xl sm:text-3xl font-bold text-[#7D4F2C]">
                    {product.price}
                  </p>
                  <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    ✓ In Stock
                  </span>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-[#F59E0B]">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-sm text-gray-600">(42 reviews)</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8E2D6]">
                <h3 className="font-semibold text-lg text-[#2C2C2C] mb-4 flex items-center">
                  <svg className="w-5 h-5 text-[#7D4F2C] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Product Story
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8E2D6]">
                <h3 className="font-semibold text-lg text-[#2C2C2C] mb-4 flex items-center">
                  <svg className="w-5 h-5 text-[#7D4F2C] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-[#F9F5F1] rounded-lg border border-[#E8E2D6]">
                      <svg className="w-4 h-4 text-[#7D4F2C] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-[#2C2C2C]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8E2D6]">
                <h3 className="font-semibold text-lg text-[#2C2C2C] mb-4 flex items-center">
                  <svg className="w-5 h-5 text-[#7D4F2C] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-[#E8E2D6]">
                    <span className="text-gray-600">Dimensions</span>
                    <span className="font-medium text-[#2C2C2C]">{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E8E2D6]">
                    <span className="text-gray-600">Material</span>
                    <span className="font-medium text-[#2C2C2C]">{product.material}</span>
                  </div>
                  <div className="sm:col-span-2 flex justify-between py-2 border-b border-[#E8E2D6]">
                    <span className="text-gray-600">Crafted by</span>
                    <span className="font-medium text-[#7D4F2C]">{product.artisan}</span>
                  </div>
                </div>
              </div>

              {/* Quantity & Buttons */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8E2D6]">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-medium text-[#2C2C2C]">Quantity</span>
                  <div className="flex items-center border border-[#E8E2D6] rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-[#7D4F2C] hover:bg-[#F9F5F1] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-[#E8E2D6] min-w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-[#7D4F2C] hover:bg-[#F9F5F1] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <AddToCartButton
                    productId={product.id}
                    productTitle={product.title}
                    productPrice={product.price}
                    productImage={product.image}
                    quantity={quantity}
                    variant="addToCart"
                  />
                  
                  <AddToCartButton
                    productId={product.id}
                    productTitle={product.title}
                    productPrice={product.price}
                    productImage={product.image}
                    quantity={quantity} 
                    variant="buyNow"
                  />
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#E8E2D6]">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-[#F0F8F0] rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-[#FFF8F0] rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600">7-Day Return</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-[#F0F8FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600">Secure Payment</p>
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