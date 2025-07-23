import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">RemoteKing</h3>
            <p className="text-gray-400">
              RemoteKing is Australia's leading provider of remote keyless entry
              systems and vehicle security solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-400 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/help" className="text-gray-400 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/installation"
                  className="text-gray-400 hover:text-white"
                >
                  Installation Guide
                </a>
              </li>
              <li>
                <a
                  href="/troubleshooting"
                  className="text-gray-400 hover:text-white"
                >
                  Troubleshooting
                </a>
              </li>
              <li>
                <a href="/warranty" className="text-gray-400 hover:text-white">
                  Warranty
                </a>
              </li>
              <li>
                <a href="/returns" className="text-gray-400 hover:text-white">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-gray-400">0400397844</p>
              <p className="text-gray-400">sales@remoteking.com.au</p>
              <p className="text-gray-400">
                23 Carl Ct, Hallam, VIC 3803,Australia
              </p>
            </div>
            <div className="mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Subscribe to newsletter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400">
            © 2025 RemoteKing. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Terms & Conditions
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
