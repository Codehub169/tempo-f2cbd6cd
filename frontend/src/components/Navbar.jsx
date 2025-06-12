import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { EyeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinkClass = ({ isActive }) => 
    `block py-2 px-3 md:p-0 rounded md:bg-transparent hover:text-clinic-primary md:hover:text-clinic-primary md:hover:bg-transparent transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-clinic-primary after:transition-all after:duration-300 md:after:bottom-[-2px] ${isActive ? 'text-clinic-primary md:after:w-full' : 'text-clinic-text-primary'}`;

  const mobileNavLinkClass = ({ isActive }) => 
    `block py-3 px-4 text-base hover:bg-clinic-neutral-lightest transition-colors duration-200 ${isActive ? 'text-clinic-primary font-semibold' : 'text-clinic-text-primary'}`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-clinic-primary hover:text-clinic-primary-dark transition-colors">
            <EyeIcon className="h-9 w-9" />
            <span className="font-display text-2xl font-bold">NayanJyoti</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-clinic-primary hover:text-clinic-primary-dark hover:bg-clinic-neutral-lightest focus:outline-none focus:ring-2 focus:ring-inset focus:ring-clinic-primary transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
            <NavLink to="/services" className={navLinkClass}>Services</NavLink>
            <NavLink to="/doctors" className={navLinkClass}>Doctors</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <Link to="/book-appointment" className="btn btn-accent text-sm px-5 py-2.5">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg pb-4 border-t border-clinic-neutral-lighter" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileNavLinkClass} onClick={toggleMenu} end>Home</NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={toggleMenu}>About Us</NavLink>
            <NavLink to="/services" className={mobileNavLinkClass} onClick={toggleMenu}>Services</NavLink>
            <NavLink to="/doctors" className={mobileNavLinkClass} onClick={toggleMenu}>Doctors</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={toggleMenu}>Contact</NavLink>
          </div>
          <div className="px-4 pt-2">
            <Link 
              to="/book-appointment" 
              className="block w-full text-center btn btn-accent text-sm py-2.5" 
              onClick={toggleMenu}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
