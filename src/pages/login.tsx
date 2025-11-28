import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/animations/Reveal";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // Login logic
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = storedUsers.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        // Set current session
        localStorage.setItem("currentUser", JSON.stringify({
          name: user.name,
          email: user.email
        }));
        localStorage.setItem("isLoggedIn", "true");
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } else {
      // Signup logic
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
      
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if user already exists
      if (storedUsers.find((u: any) => u.email === email)) {
        setError("User with this email already exists");
        return;
      }
      
      // Add new user
      const newUser = {
        name,
        email,
        password,
        joinDate: new Date().toISOString()
      };
      
      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      
      // Set current session
      localStorage.setItem("currentUser", JSON.stringify({
        name: name,
        email: email
      }));
      localStorage.setItem("isLoggedIn", "true");
      
      // Initialize empty orders
      const userOrders = JSON.parse(localStorage.getItem("userOrders") || "{}");
      userOrders[email] = [];
      localStorage.setItem("userOrders", JSON.stringify(userOrders));
      
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <nav className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <span className="absolute -top-1 left-0 text-black font-bold text-2xl">H</span>
              <span className="absolute top-1 left-2 text-[#7D4F2C] font-bold text-2xl">H</span>
            </div>
            <h1 className="text-lg font-semibold text-[#2C2C2C] tracking-tight">
              Handmade Haven
            </h1>
          </Link>
        </div>
      </nav>

      <Reveal delay={0.2}>
        <div className="flex flex-col items-center justify-center flex-1 px-6 py-8">
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-[#E8E2D6]">
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                }}
                className={`flex-1 py-3 font-medium text-center transition-colors ${
                  isLogin 
                    ? "text-[#7D4F2C] border-b-2 border-[#7D4F2C]" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
                className={`flex-1 py-3 font-medium text-center transition-colors ${
                  !isLogin 
                    ? "text-[#7D4F2C] border-b-2 border-[#7D4F2C]" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign Up
              </button>
            </div>

            <h2 className="text-2xl font-semibold text-center mb-6 text-[#2C2C2C]">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg outline-none border-[#E8E2D6] focus:border-[#7D4F2C] transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg outline-none border-[#E8E2D6] focus:border-[#7D4F2C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isLogin ? "Password" : "Create Password"}
                </label>
                <input
                  type="password"
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg outline-none border-[#E8E2D6] focus:border-[#7D4F2C] transition-colors"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg outline-none border-[#E8E2D6] focus:border-[#7D4F2C] transition-colors"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#7D4F2C] text-white py-3 rounded-lg hover:bg-[#6b4125] transition-all shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-[#7D4F2C] hover:text-[#6b4125] font-medium transition-colors"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}