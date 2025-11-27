import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/animations/Reveal";

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

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

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FDFBF7] text-[#2C2C2C] min-h-screen">
        <Navbar />
        
        <Reveal delay={0.2}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
              <div className="w-24 h-24 bg-[#EDE7E1] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-[#7D4F2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-4">
                Your Cart is Empty
              </h1>
              
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Discover our unique handmade creations and add some artistry to your cart.
              </p>
              
              <button
                onClick={() => router.push("/shop")}
                className="bg-[#7D4F2C] text-white px-8 py-3 rounded-lg hover:bg-[#6b4125] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={0.1}>
          <Footer />
        </Reveal>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] text-[#2C2C2C] min-h-screen">
      <Navbar />
      
      <Reveal delay={0.2}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-8 text-center">
            Shopping Cart
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2 truncate">{item.title}</h3>
                    <p className="text-[#7D4F2C] font-bold text-xl mb-3">{item.price}</p>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ₹{parseInt(item.price.replace('₹', '')) * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total</span>
                    <span className="text-[#7D4F2C]">₹{getTotalPrice()}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-[#7D4F2C] text-white py-3 px-6 rounded-lg hover:bg-[#6b4125] transition-all duration-300 font-medium shadow-lg hover:shadow-xl mb-3"
                >
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={() => router.push("/shop")}
                  className="w-full border-2 border-[#7D4F2C] text-[#7D4F2C] py-3 px-6 rounded-lg hover:bg-[#7D4F2C] hover:text-white transition-all duration-300 font-medium"
                >
                  Continue Shopping
                </button>
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