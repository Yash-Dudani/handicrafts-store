// components/ui/AddToCartButton.tsx
import { useState } from "react";
import { useRouter } from "next/router";

interface AddToCartButtonProps {
  productId: number;
  productTitle: string;
  productPrice: string;
  productImage: string;
  variant?: "addToCart" | "buyNow";
}

export default function AddToCartButton({ 
  productId, 
  productTitle, 
  productPrice, 
  productImage,
  variant = "addToCart" 
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const handleAction = () => {
    setIsAdding(true);
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    if (variant === "buyNow") {
      // For Buy Now: Clear cart and add only this product
      const newCart = [{
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity: 1
      }];
      
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(new Event("cartUpdated"));
      setIsAdding(false);
      router.push("/checkout");
    } else {
      // For Add to Cart: Add product to existing cart
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === productId);
      
      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart.push({
          id: productId,
          title: productTitle,
          price: productPrice,
          image: productImage,
          quantity: 1
        });
      }
      
      localStorage.setItem("cart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("cartUpdated"));
      setIsAdding(false);
    }
  };

  const getButtonText = () => {
    if (isAdding) return variant === "buyNow" ? "Processing..." : "Adding...";
    return variant === "buyNow" ? "Buy Now" : "Add to Cart";
  };

  const getButtonClass = () => {
    const baseClass = "w-full py-3 px-6 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed";
    
    if (variant === "buyNow") {
      return `${baseClass} border-2 border-[#7D4F2C] text-[#7D4F2C] hover:bg-[#7D4F2C] hover:text-white`;
    }
    
    return `${baseClass} bg-[#7D4F2C] text-white hover:bg-[#6b4125]`;
  };

  return (
    <button
      onClick={handleAction}
      disabled={isAdding}
      className={getButtonClass()}
    >
      {getButtonText()}
    </button>
  );
}