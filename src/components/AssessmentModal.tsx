import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Code, Database, Layout, X } from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const assessments = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: <Layout className="h-6 w-6" />,
    description: 'Test your skills in HTML, CSS, JavaScript, and modern frameworks',
    duration: '25 mins',
    questions: 15,
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: <Database className="h-6 w-6" />,
    description: 'Evaluate your backend development and API design expertise',
    duration: '30 mins',
    questions: 20,
  },
  {
    id: 'algorithms',
    title: 'Algorithms & Data Structures',
    icon: <Code className="h-6 w-6" />,
    description: 'Challenge yourself with algorithmic problem-solving',
    duration: '45 mins',
    questions: 10,
  },
];

export function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const handleStartAssessment = () => {
    if (!selectedAssessment) return;
    setIsStarting(true);
    // Simulate loading
    setTimeout(() => {
      window.location.href = `/assessment/${selectedAssessment}`;
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Award className="h-6 w-6 text-indigo-600" />
                  Choose Your Assessment
                </h2>
                <p className="text-gray-600 mt-1">
                  Select a skill assessment to showcase your expertise
                </p>
              </div>

              <div className="grid gap-4">
                {assessments.map((assessment) => (
                  <div
                    key={assessment.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedAssessment === assessment.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => setSelectedAssessment(assessment.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {assessment.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {assessment.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {assessment.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>⏱ {assessment.duration}</span>
                          <span>📝 {assessment.questions} questions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition-all ${
                    selectedAssessment
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  onClick={handleStartAssessment}
                  disabled={!selectedAssessment || isStarting}
                >
                  {isStarting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Starting...
                    </span>
                  ) : (
                    'Start Assessment'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}