// components/ui/AddToCartButton.tsx
import { useState } from "react";
import { useRouter } from "next/router";

interface AddToCartButtonProps {
  productId: number;
  productTitle: string;
  productPrice: string;
  productImage: string;
  quantity?: number;
  variant?: "addToCart" | "buyNow";
}

export default function AddToCartButton({ 
  productId, 
  productTitle, 
  productPrice, 
  productImage,
  quantity = 1,
  variant = "addToCart" 
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleAction = () => {
    setIsAdding(true);
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    if (variant === "buyNow") {
      // ✅ FIXED: Buy Now should ADD to existing cart and go to CART PAGE
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === productId);
      
      if (existingItemIndex > -1) {
        // Agar product already hai, toh quantity add karo
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        // Naya product add karo with selected quantity
        existingCart.push({
          id: productId,
          title: productTitle,
          price: productPrice,
          image: productImage,
          quantity: quantity
        });
      }
      
      localStorage.setItem("cart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("cartUpdated"));
      setIsAdding(false);
      
      // ✅ CART PAGE PE REDIRECT KARO (not checkout)
      router.push("/cart");
      
    } else {
      // For Add to Cart: Add product to existing cart WITH QUANTITY
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === productId);
      
      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push({
          id: productId,
          title: productTitle,
          price: productPrice,
          image: productImage,
          quantity: quantity
        });
      }
      
      localStorage.setItem("cart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("cartUpdated"));
      setIsAdding(false);
      
      // ✅ SUCCESS MESSAGE SHOW KARO
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000); // 2 seconds baad auto hide
    }
  };

  const getButtonText = () => {
    if (isAdding) return variant === "buyNow" ? "Adding to Cart..." : "Adding...";
    if (showSuccess && variant === "addToCart") return "✓ Added!";
    return variant === "buyNow" ? "Buy Now" : "Add to Cart";
  };

  const getButtonClass = () => {
    const baseClass = "w-full py-3 px-6 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed";
    
    if (variant === "buyNow") {
      return `${baseClass} border-2 border-[#7D4F2C] text-[#7D4F2C] hover:bg-[#7D4F2C] hover:text-white`;
    }
    
    if (showSuccess && variant === "addToCart") {
      return `${baseClass} bg-green-600 text-white hover:bg-green-700`;
    }
    
    return `${baseClass} bg-[#7D4F2C] text-white hover:bg-[#6b4125]`;
  };

  return (
    <>
      <button
        onClick={handleAction}
        disabled={isAdding}
        className={getButtonClass()}
      >
        {getButtonText()}
      </button>
      
      {/* ✅ FLOATING SUCCESS MESSAGE - Only for Add to Cart */}
      {showSuccess && variant === "addToCart" && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Added to cart successfully! 🎉</span>
          </div>
        </div>
      )}
    </>
  );
}