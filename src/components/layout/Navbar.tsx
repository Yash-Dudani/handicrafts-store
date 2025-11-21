import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-[#FDFBF7] lg:bg-[#FDFBF7]/80 backdrop-blur-md flex justify-between items-center px-4 sm:px-6 lg:px-10 py-4 shadow-sm border-b border-gray-100 sticky top-0 z-50">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 lg:space-x-3 group cursor-pointer z-50">
          <div className="relative w-8 h-8 lg:w-9 lg:h-9 transition-transform duration-300 group-hover:scale-110">
            <span className="absolute -top-1 left-0 text-black font-bold text-xl lg:text-2xl leading-none">H</span>
            <span className="absolute top-1 left-2 text-[#7D4F2C] font-bold text-xl lg:text-2xl leading-none">H</span>
          </div>
          <h1 className="text-lg lg:text-xl font-semibold text-[#2C2C2C] tracking-tight">Handmade Haven</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-8 text-[#2C2C2C]">
            <li className="relative group">
              <Link href="/shop" className="font-medium hover:text-[#7D4F2C]">Shop</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7D4F2C] group-hover:w-full transition-all"></span>
            </li>

            <li className="relative group">
              <Link href="/artisans" className="font-medium hover:text-[#7D4F2C]">Artisan Story</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7D4F2C] group-hover:w-full transition-all"></span>
            </li>

            <li className="relative group">
              <Link href="/blog" className="font-medium hover:text-[#7D4F2C]">Blog</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7D4F2C] group-hover:w-full transition-all"></span>
            </li>

            <li className="relative group">
              <Link href="/contact" className="font-medium hover:text-[#7D4F2C]">Contact</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7D4F2C] group-hover:w-full transition-all"></span>
            </li>
          </ul>

          {/* Profile Icon */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#EDE7E1] hover:bg-[#7D4F2C] hover:text-white transition-all duration-300 border border-[#E8E2D6]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E8E2D6] py-2 z-50">
                <Link href="/profile" className="block px-4 py-2 text-sm text-[#2C2C2C] hover:bg-[#FDFBF7] hover:text-[#7D4F2C] transition-colors">
                  👤 My Profile
                </Link>
                <Link href="/orders" className="block px-4 py-2 text-sm text-[#2C2C2C] hover:bg-[#FDFBF7] hover:text-[#7D4F2C] transition-colors">
                  📦 My Orders
                </Link>
                <Link href="/wishlist" className="block px-4 py-2 text-sm text-[#2C2C2C] hover:bg-[#FDFBF7] hover:text-[#7D4F2C] transition-colors">
                  ❤️ Wishlist
                </Link>
                <div className="border-t border-[#E8E2D6] my-1"></div>
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative w-8 h-8 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6">
            <span className={`absolute h-0.5 w-6 bg-[#2C2C2C] transition-all ${isMobileMenuOpen ? "rotate-45" : "-translate-y-2"}`} />
            <span className={`absolute h-0.5 w-6 bg-[#2C2C2C] transition-all ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-0.5 w-6 bg-[#2C2C2C] transition-all ${isMobileMenuOpen ? "-rotate-45" : "translate-y-2"}`} />
          </div>
        </button>
      </nav>

      {/* FULLSCREEN MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-[#FDFBF7] z-[999] lg:hidden transform transition-transform duration-300
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-10">

          {/* Close Button */}
          <button
            onClick={closeMobileMenu}
            className="absolute top-4 right-4 text-3xl text-[#2C2C2C] hover:text-[#7D4F2C]"
          >
            ×
          </button>

          {/* Mobile Logo */}
          <div className="flex items-center space-x-3 mb-10">
            <div className="relative w-10 h-10">
              <span className="absolute -top-1 left-0 text-black font-bold text-2xl">H</span>
              <span className="absolute top-1 left-2 text-[#7D4F2C] font-bold text-2xl">H</span>
            </div>
            <h1 className="text-xl font-semibold text-[#2C2C2C]">Handmade Haven</h1>
          </div>

          {/* Mobile Nav Items */}
          <ul className="flex flex-col space-y-2">
            <li>
              <Link href="/shop" onClick={closeMobileMenu}
                className="block py-4 px-4 text-lg font-medium hover:bg-[#EDE7E1] rounded-lg">
                Shop
              </Link>
            </li>

            <li>
              <Link href="/artisans" onClick={closeMobileMenu}
                className="block py-4 px-4 text-lg font-medium hover:bg-[#EDE7E1] rounded-lg">
                Artisan Story
              </Link>
            </li>

            <li>
              <Link href="/blog" onClick={closeMobileMenu}
                className="block py-4 px-4 text-lg font-medium hover:bg-[#EDE7E1] rounded-lg">
                Blog
              </Link>
            </li>

            <li>
              <Link href="/contact" onClick={closeMobileMenu}
                className="block py-4 px-4 text-lg font-medium hover:bg-[#EDE7E1] rounded-lg">
                Contact
              </Link>
            </li>
            
            {/* Mobile Profile Link */}
            <li>
              <Link href="/profile" onClick={closeMobileMenu}
                className="block py-4 px-4 text-lg font-medium hover:bg-[#EDE7E1] rounded-lg flex items-center space-x-3">
                <div className="w-6 h-6 bg-[#7D4F2C] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>My Profile</span>
              </Link>
            </li>
          </ul>

          {/* Footer */}
          <div className="mt-auto text-center text-sm text-gray-600 pt-6 border-t">
            Crafted with Passion
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isProfileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileDropdownOpen(false)}
        />
      )}
    </>
  );
}