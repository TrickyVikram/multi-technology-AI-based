import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              JobPortal
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Home
              </Link>
              <Link to="/jobs" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Jobs
              </Link>
              <Link to="/applications" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                My Applications
              </Link>
              <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Profile
              </Link>
              <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Home
            </Link>
            <Link to="/jobs" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Jobs
            </Link>
            <Link to="/applications" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              My Applications
            </Link>
            <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Profile
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;