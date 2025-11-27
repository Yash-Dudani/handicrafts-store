import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CartIcon() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cart);
    };

    // Initial load
    updateCart();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCart);
    
    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace('₹', '')) * item.quantity;
      return total + price;
    }, 0);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#EDE7E1] hover:bg-[#7D4F2C] hover:text-white transition-all duration-300 border border-[#E8E2D6]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#7D4F2C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg border z-50">
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-3">Your Cart</h3>
            
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <>
                <div className="max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 py-3 border-b">
                      <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-[#7D4F2C] font-semibold">{item.price} × {item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg text-[#7D4F2C]">₹{getTotalPrice()}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push("/checkout");
                    }}
                    className="w-full bg-[#7D4F2C] text-white py-2 px-4 rounded-lg hover:bg-[#6b4125] transition-colors"
                  >
                    Checkout
                  </button>
                  
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push("/cart");
                    }}
                    className="w-full mt-2 border border-[#7D4F2C] text-[#7D4F2C] py-2 px-4 rounded-lg hover:bg-[#7D4F2C] hover:text-white transition-colors"
                  >
                    View Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}