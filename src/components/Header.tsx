import React, { useState } from 'react';
import { Brain, Menu, X } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TalentLens
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {['Find Jobs', 'Skill Assessment', 'Portfolio', 'About'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-indigo-600 transition-colors relative group"
                onClick={(e) => e.preventDefault()}
              >
                {item}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              className="hidden md:block px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              onClick={() => console.log('Sign In clicked')}
            >
              Sign In
            </button>
            <button 
              className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => console.log('Get Started clicked')}
            >
              Get Started
            </button>
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}