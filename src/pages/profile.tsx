import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/animations/Reveal";

interface Order {
  orderId: string;
  items: any[];
  totalAmount: number;
  date: string;
  status: string;
  shippingAddress: string;
}

export default function Profile() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = localStorage.getItem("currentUser");

    if (!isLoggedIn || !currentUser) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(currentUser);
      setUserName(userData.name);
      setUserEmail(userData.email);

      // Load user orders
      const userOrders = JSON.parse(localStorage.getItem("userOrders") || "{}");
      const userOrderHistory = userOrders[userData.email] || [];
      setOrders(userOrderHistory);

      // Load join date from users data
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = storedUsers.find((u: any) => u.email === userData.email);
      if (user && user.joinDate) {
        setJoinDate(new Date(user.joinDate).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D4F2C] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
      <Navbar />

      <Reveal delay={0.2}>
        <div className="max-w-6xl mx-auto w-full px-6 py-8">
          {/* User Welcome Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-3xl font-semibold text-[#2C2C2C]">
                  Welcome back, <span className="text-[#7D4F2C]">{userName}</span>! 👋
                </h1>
                <p className="mt-2 text-gray-600">{userEmail}</p>
                {joinDate && (
                  <p className="mt-1 text-sm text-gray-500">
                    Member since {joinDate}
                  </p>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 sm:mt-0 px-6 py-2 border border-[#7D4F2C] text-[#7D4F2C] rounded-lg hover:bg-[#7D4F2C] hover:text-white transition-all duration-300 font-medium"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-[#2C2C2C]">Your Orders</h2>
              <Link href="/shop">
                <button className="bg-[#7D4F2C] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#6b4125] transition-all shadow-lg">
                  Continue Shopping
                </button>
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start shopping to see your orders here
                </p>
                <Link href="/shop">
                  <button className="bg-[#7D4F2C] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#6b4125] transition-all shadow-lg hover:shadow-xl">
                    Start Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.orderId} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">Order #{order.orderId}</h3>
                        <p className="text-gray-600 text-sm">
                          Placed on {formatDate(order.date)}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'confirmed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 text-gray-700">Items Ordered:</h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{item.title}</p>
                                <p className="text-sm text-gray-600">
                                  {item.price} × {item.quantity}
                                </p>
                              </div>
                              <p className="font-bold text-[#7D4F2C]">
                                ₹{parseInt(item.price.replace('₹', '')) * item.quantity}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3 text-gray-700">Shipping Details:</h4>
                        <p className="text-sm text-gray-600 mb-4">{order.shippingAddress}</p>
                        
                        <div className="border-t pt-4">
                          <p className="font-semibold text-lg text-[#7D4F2C]">
                            Total: ₹{order.totalAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Footer />
      </Reveal>
    </div>
  );
}