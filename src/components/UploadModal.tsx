import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    console.log('Dropped files:', files);
    // Handle file upload logic here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Your Portfolio</h2>
              
              <div
                className={`mt-4 p-8 border-2 border-dashed rounded-lg text-center ${
                  dragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-sm text-gray-600">
                  Drag and drop your files here, or{' '}
                  <button
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    browse
                  </button>
                </p>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    console.log('Selected files:', files);
                    // Handle file upload logic here
                  }}
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  onClick={() => {
                    console.log('Upload confirmed');
                    onClose();
                  }}
                >
                  Upload
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}