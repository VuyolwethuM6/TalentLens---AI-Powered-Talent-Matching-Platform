import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuItems = ['Find Jobs', 'Skill Assessment', 'Portfolio', 'About'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg border-b border-gray-100"
        >
          <div className="px-4 py-2">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block py-3 px-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                {item}
              </a>
            ))}
            <div className="p-4 space-y-3">
              <button 
                className="w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                onClick={() => {
                  console.log('Sign In clicked');
                  onClose();
                }}
              >
                Sign In
              </button>
              <button 
                className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => {
                  console.log('Get Started clicked');
                  onClose();
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}