import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();

    // Store user info
    localStorage.setItem("username", name);
    localStorage.setItem("email", email);

    router.push(`/profile?name=${name}`);
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

      <div className="flex flex-col items-center justify-center flex-1 px-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-[#E8E2D6]">
          <h2 className="text-2xl font-semibold text-center mb-6">Login / Sign Up</h2>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="text"
              placeholder="Enter your first name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg outline-none border-[#E8E2D6] focus:border-[#7D4F2C]"
            />

            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg outline-none border-[#E8E2D6] focus:border-[#7D4F2C]"
            />

            <input
              type="password"
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg outline-none border-[#E8E2D6] focus:border-[#7D4F2C]"
            />

            <button
              type="submit"
              className="w-full bg-[#7D4F2C] text-white py-3 rounded-lg hover:bg-[#6b4125] transition-all shadow-md"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
