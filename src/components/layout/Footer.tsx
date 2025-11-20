import { FaInstagram, FaPinterest, FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="relative w-8 h-8">
                <span className="absolute -top-1 left-0 text-white font-bold text-2xl">H</span>
                <span className="absolute top-1 left-2 text-[#7D4F2C] font-bold text-2xl">H</span>
              </div>
              <h2 className="ml-3 text-lg sm:text-xl font-semibold">Handmade Haven</h2>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Celebrating traditional craftsmanship through modern design. Each piece tells a unique story.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm">
              <li>
                <Link href="/shop" className="hover:text-[#7D4F2C] cursor-pointer transition-colors duration-300 block">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-[#7D4F2C] cursor-pointer transition-colors duration-300 block">
                  Artisan Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#7D4F2C] cursor-pointer transition-colors duration-300 block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#7D4F2C] cursor-pointer transition-colors duration-300 block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Contact</h3>
            <div className="text-gray-400 space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <p>123 Artisan Street</p>
              <p>Mumbai, India 400001</p>
              <p>hello@handmadehaven.com</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
          
          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <FaInstagram className="text-gray-400 hover:text-[#E4405F] text-lg sm:text-xl cursor-pointer transition-colors duration-300" />
              <FaPinterest className="text-gray-400 hover:text-[#BD081C] text-lg sm:text-xl cursor-pointer transition-colors duration-300" />
              <FaFacebook className="text-gray-400 hover:text-[#1877F2] text-lg sm:text-xl cursor-pointer transition-colors duration-300" />
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>© 2025 Handmade Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}