import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from sessionStorage", err);
      }
    } else {
      setUser(null);
    }
  }, [location]); //

  const handleProfileClick = () => {
    if (!user) return;

    switch (user.role) {
      case "buyer":
        navigate("/editbuyer");
        break;
      case "seller":
        navigate("/editprofile");
        break;
      case "admin":
        navigate("/admin/editprofile");
        break;
      default:
        break;
    }
  };

  const handleProductsClick = () => {
    if (!user) {
      navigate("/user/login");
      return;
    }

    switch (user.role) {
      case "buyer":
        navigate("/buyer");
        break;
      case "seller":
        navigate("/seller");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/user/login");
    }
  };
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
            <span
              onClick={handleProductsClick}
              className="hover:text-gray-200 cursor-pointer"
            >
              Products
            </span>

            <Link to="/about" className="hover:text-gray-200">
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

          {!user ? (
            <>
              <Link
                to="/user/login"
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/user/signup"
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Sign Up
              </Link>
              <Link
                to="/user/becomeseller"
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Become a Seller
              </Link>
            </>
          ) : (
            <div
              onClick={handleProfileClick}
              className="w-10 h-10 bg-white text-blue-600 font-semibold rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100"
              title="Go to Profile"
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-xl ml-2 focus:outline-none"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 flex flex-col space-y-2">
          <Link to="/" className="hover:text-gray-200 p-2">
            Home
          </Link>
          <span
            onClick={() => {
              handleProductsClick();
              setMenuOpen(false); // Close the mobile menu after click
            }}
            className="hover:text-gray-200 p-2 cursor-pointer"
          >
            Products
          </span>

          <Link to="/about" className="hover:text-gray-200 p-2">
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
