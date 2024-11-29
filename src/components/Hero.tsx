import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Target, Upload } from 'lucide-react';
import { UploadModal } from './UploadModal';
import { AssessmentModal } from './AssessmentModal';

export function Hero() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);

  const features = [
    {
      icon: <Upload className="h-8 w-8 text-indigo-600" />,
      title: "Upload Portfolio",
      description: "Showcase your work and experience in an interactive format"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-indigo-600" />,
      title: "AI-Powered Matching",
      description: "Our AI analyzes your skills and matches you with perfect opportunities"
    },
    {
      icon: <Target className="h-8 w-8 text-indigo-600" />,
      title: "Skill Validation",
      description: "Validate your expertise through gamified assessments"
    }
  ];

  return (
    <div className="relative min-h-screen pt-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect Role with
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}AI-Powered Matching
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your portfolio, showcase your skills, and let our AI match you with roles that truly fit your potential.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button 
              className="px-8 py-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 group"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Upload className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Upload Portfolio</span>
            </button>
            <button 
              className="px-8 py-4 text-indigo-600 bg-white border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center space-x-2 group"
              onClick={() => setIsAssessmentModalOpen(true)}
            >
              <Target className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Take Skill Assessment</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => {
                if (feature.title === "Upload Portfolio") {
                  setIsUploadModalOpen(true);
                } else if (feature.title === "Skill Validation") {
                  setIsAssessmentModalOpen(true);
                }
              }}
            >
              <div className="bg-indigo-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
      <AssessmentModal isOpen={isAssessmentModalOpen} onClose={() => setIsAssessmentModalOpen(false)} />
    </div>
  );
}