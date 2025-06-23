
  import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    // <header className="flex justify-between items-center p-6 shadow-md bg-blue-800 text-white">
    //   <div className="text-2xl font-bold tracking-wide">RK</div>
    //   <div className="flex items-center space-x-4">
    //     <input
    //       type="text"
    //       placeholder="Search..."
    //       className="px-3 py-1 rounded-md text-black"
    //     />
    //     <button className="border px-4 py-1 rounded border-white">My Account</button>
    //     <button className="border px-4 py-1 rounded border-white">Log Off</button>
    //   </div>
    // </header>


    <header className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <a href="/" className="flex items-center text-2xl font-bold text-indigo-600">
          <img src="logos/rk.png" alt="Logo" className="h-10 w-auto mr-2 invert" />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="/how-it-works" className="hover:text-indigo-600">How It Works</a>
          <a href="/pricing" className="hover:text-indigo-600">Pricing</a>
          <a href="/about" className="hover:text-indigo-600">About</a>
          <a href="/contact" className="hover:text-indigo-600">Contact</a>
        </nav>

        {/* Call to Action */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/login" className="text-gray-700 hover:text-indigo-600">Log In</a>
          <a
            href="https://remoteking.com.au/"
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
          >
            Purchase now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-3">
          <a href="/how-it-works" className="block text-gray-700">How It Works</a>
          <a href="/pricing" className="block text-gray-700">Pricing</a>
          <a href="/about" className="block text-gray-700">About</a>
          <a href="/contact" className="block text-gray-700">Contact</a>
          <a href="/login" className="block text-gray-700">Log In</a>

        </div>
      )}
    </header>

  );
}
