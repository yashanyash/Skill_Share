import React from "react";
import { Home, User } from "lucide-react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Search */}
            <div className="flex items-center">
              {/* Logo */}
              <Link to="/" className="text-blue-700 font-bold text-2xl mr-4">
                <span className="bg-blue-700 !text-red px-1.5 py-0.5 rounded">
                  Skill Share
                </span>
              </Link>
            </div>

            {/* Main Navigation (desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-4">
                {/* Home */}
                <a href="#" className="text-gray-500 hover:text-blue-700">
                  <div className="flex flex-col items-center">
                    <Home size={20} />
                    <span className="text-xs mt-1">Home</span>
                  </div>
                </a>
                {/* Profile */}
                <a href="#" className="text-gray-500 hover:text-blue-700">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <span className="text-xs mt-1">Me</span>
                  </div>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
