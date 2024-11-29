import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Clock, Trophy, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  points: number;
  answers: { correct: boolean; time: number }[];
  assessmentType: string;
}

export function ResultsModal({
  isOpen,
  score,
  totalQuestions,
  points,
  answers,
  assessmentType,
}: ResultsModalProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const averageTime = Math.round(
    answers.reduce((acc, curr) => acc + curr.time, 0) / answers.length
  );
  const streak = Math.max(
    ...answers.reduce(
      (acc, curr) => {
        if (curr.correct) {
          acc[0] += 1;
        } else {
          acc.push(0);
        }
        return acc;
      },
      [0]
    )
  );

  const getFeedback = () => {
    if (percentage >= 90) {
      return `# 🌟 Outstanding Performance!
You've demonstrated exceptional knowledge in ${assessmentType}. Your quick response times and consistent accuracy show true expertise.

## Recommendations:
- Consider advanced certifications
- Explore senior-level positions
- Share your knowledge through mentoring`;
    } else if (percentage >= 70) {
      return `# 👏 Great Work!
You show strong understanding of ${assessmentType} concepts. With some focused practice, you could excel even further.

## Recommendations:
- Review specific topics where you hesitated
- Practice with more complex scenarios
- Join coding communities for knowledge sharing`;
    } else {
      return `# 💪 Good Start!
You've taken an important step in assessing your ${assessmentType} skills. There's room for growth, and that's exciting!

## Recommendations:
- Focus on fundamental concepts
- Practice with interactive tutorials
- Join study groups or bootcamps`;
    }
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
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 mb-8">
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <Trophy className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-indigo-600">{points}</div>
                  <div className="text-sm text-indigo-600">Total Points</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{streak}</div>
                  <div className="text-sm text-green-600">Best Streak</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{averageTime}s</div>
                  <div className="text-sm text-yellow-600">Avg Time</div>
                </div>
              </div>

              <div className="prose prose-indigo max-w-none">
                <ReactMarkdown>{getFeedback()}</ReactMarkdown>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  onClick={() => window.location.href = '/'}
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}