import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'nav-glass py-2' : 'bg-white py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://p-smobilpay-public-resources.s3.eu-central-1.amazonaws.com/prl/smobilpay-logo.png"
              alt="Smobilpay Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 z-10">
            <a href="#services" className="nav-link">Services</a>
            <a href="#authentication" className="nav-link">Authentication</a>
            <a href="#libraries" className="nav-link">Libraries</a>
            <a href="#api" className="nav-link">API Reference</a>
            <a href="#use-cases" className="nav-link">Use Cases</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a 
              href="https://apidocs.smobilpay.com/s3papi/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-accent-600 font-medium hover:text-accent-700 transition-colors"
            >
              Documentation <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden nav-glass ${isOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          <a href="#services" className="block py-2 text-gray-800 hover:text-primary-700" onClick={toggleMenu}>Services</a>
          <a href="#authentication" className="block py-2 text-gray-800 hover:text-primary-700" onClick={toggleMenu}>Authentication</a>
          <a href="#libraries" className="block py-2 text-gray-800 hover:text-primary-700" onClick={toggleMenu}>Libraries</a>
          <a href="#api" className="block py-2 text-gray-800 hover:text-primary-700" onClick={toggleMenu}>API Reference</a>
          <a href="#use-cases" className="block py-2 text-gray-800 hover:text-primary-700" onClick={toggleMenu}>Use Cases</a>
          <a href="#contact" className="block py-2 text-gray-800 hover:text-primary-700" onClick={toggleMenu}>Contact</a>
          <a 
            href="https://apidocs.smobilpay.com/s3papi/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-accent-600 font-medium hover:text-accent-700 transition-colors"
            onClick={toggleMenu}
          >
            Documentation <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
