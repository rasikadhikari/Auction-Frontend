import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white px-6 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Nav */}
        <div className="flex items-center space-x-8">
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 font-medium">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/auctions" className="hover:text-gray-200">
              Products
            </Link>
            <Link to="/sell" className="hover:text-gray-200">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </nav>
        </div>

        {/* Right: Search + Auth */}
        <div className="flex items-center space-x-4">
          <FiSearch className="text-xl cursor-pointer hover:text-gray-200" />
          <Link
            to="/login"
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Sign Up
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Become a Seller
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-xl ml-2 focus:outline-none"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 flex flex-col space-y-2">
          <Link to="/" className="hover:text-gray-200 p-2">
            Home
          </Link>
          <Link to="/auctions" className="hover:text-gray-200 p-2">
            Products
          </Link>
          <Link to="/sell" className="hover:text-gray-200 p-2">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-200 p-2">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
