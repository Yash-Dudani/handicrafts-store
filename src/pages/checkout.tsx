import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/animations/Reveal";

export default function Checkout() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = localStorage.getItem("currentUser");
    
    if (!isLoggedIn || !currentUser) {
      // Show login message and redirect after delay
      setShowLoginMessage(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    try {
      const userData = JSON.parse(currentUser);
      
      // Pre-fill email and name from stored user data
      setFormData(prev => ({
        ...prev,
        email: userData.email,
        firstName: userData.name.split(' ')[0] || "",
        lastName: userData.name.split(' ').slice(1).join(' ') || ""
      }));

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cart);
      
      if (cart.length === 0) {
        router.push("/cart");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Rest of the code remains same...
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveOrderToProfile = (orderData: any) => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return;

    try {
      const userData = JSON.parse(currentUser);
      const userEmail = userData.email;
      
      const userOrders = JSON.parse(localStorage.getItem("userOrders") || "{}");
      
      const newOrder = {
        orderId: orderData.orderId,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        date: new Date().toISOString(),
        status: 'confirmed',
        shippingAddress: `${orderData.shippingAddress}, ${orderData.city}, ${orderData.state} - ${orderData.pincode}`
      };

      if (!userOrders[userEmail]) {
        userOrders[userEmail] = [];
      }
      
      userOrders[userEmail].unshift(newOrder); // Add new order at beginning
      localStorage.setItem("userOrders", JSON.stringify(userOrders));
    } catch (error) {
      console.error("Error saving order to profile:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate order ID
    const orderId = 'HH' + Date.now();
    const customerName = `${formData.firstName} ${formData.lastName}`;
    
    try {
      // Send order email
      const emailResponse = await fetch('/api/order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          paymentMethod: formData.paymentMethod,
          items: cartItems,
          totalAmount: getTotalPrice(),
          orderId: orderId
        }),
      });

      if (emailResponse.ok) {
        // Save order to user profile
        saveOrderToProfile({
          orderId,
          items: cartItems,
          totalAmount: getTotalPrice(),
          shippingAddress: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        });

        // Order successful
        setSubmitStatus('success');
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
        
        // Redirect to profile instead of home
        setTimeout(() => {
          router.push("/profile");
        }, 3000);
      } else {
        setSubmitStatus('error');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace('₹', '')) * item.quantity;
      return total + price;
    }, 0);
  };

  // Show login message if not logged in
  if (showLoginMessage) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Please login before checkout
            </h3>
            <p className="text-gray-500 mb-6">
              Redirecting you to login page...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7D4F2C] mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D4F2C] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading or redirect if not logged in or cart empty
  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some items to proceed with checkout</p>
            <button
              onClick={() => router.push("/shop")}
              className="bg-[#7D4F2C] text-white px-6 py-3 rounded-lg hover:bg-[#6b4125] transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] text-[#2C2C2C] min-h-screen">
      <Navbar />
      
      <Reveal delay={0.2}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-8 text-center">
            Checkout
          </h1>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
              <h3 className="font-bold text-lg">🎉 Order Placed Successfully!</h3>
              <p>Thank you for your order. You will be redirected to your profile shortly.</p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
              <h3 className="font-bold text-lg">❌ Order Failed</h3>
              <p>Please try again or contact support.</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D4F2C] focus:border-transparent"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D4F2C] focus:border-transparent"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D4F2C] focus:border-transparent"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D4F2C] focus:border-transparent"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D4F2C] focus:border-transparent"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D4F2C] focus:border-transparent"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D4F2C] focus:border-transparent"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D4F2C] focus:border-transparent"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                      className="text-[#7D4F2C] focus:ring-[#7D4F2C]"
                      disabled={isSubmitting}
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleInputChange}
                      className="text-[#7D4F2C] focus:ring-[#7D4F2C]"
                      disabled={isSubmitting}
                    />
                    <span>UPI</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="text-[#7D4F2C] focus:ring-[#7D4F2C]"
                      disabled={isSubmitting}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.title}</p>
                        <p className="text-[#7D4F2C] font-semibold">
                          {item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold">
                        ₹{parseInt(item.price.replace('₹', '')) * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 border-t pt-4">
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
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#7D4F2C] text-white py-3 px-6 rounded-lg hover:bg-[#6b4125] transition-all duration-300 font-medium shadow-lg hover:shadow-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </form>
        </div>
      </Reveal>
      
      <Reveal delay={0.1}>
        <Footer />
      </Reveal>
    </div>
  );
}