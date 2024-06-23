import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = ({cartCount}) => {
  const navigate = useNavigate();
  // Handle logout functionality
  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem("token");
    navigate("/login")

  };

 console.log("cart Count" , cartCount);

  return (
    <nav className="bg-white shadow-lg mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            {/* Logo or brand */}
            <Link to="/product" className="flex-shrink-0 text-gray-800">
              <span className="text-xl font-bold">Your Brand</span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* View Cart icon */}
            <div className="relative">
              <button
                 onClick={() => navigate(`/product/view-cart`)}
                className=" text-black px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
              >
                <h3 className=" text-black font-bold">View Cart</h3>
              </button>
              {/* Static number on top */}
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
               {cartCount}
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
