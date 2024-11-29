import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, ChevronRight, Timer, XCircle, Trophy } from 'lucide-react';
import ReactConfetti from 'react-confetti';
import { CodeBlock } from './CodeBlock';
import { ResultsModal } from './ResultsModal';
import { questions } from '../data/questions';
import { useWindowSize } from '../hooks/useWindowSize';

interface AssessmentGameProps {
  assessmentId: string;
}

export function AssessmentGame({ assessmentId }: AssessmentGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<{correct: boolean, time: number}[]>([]);
  const { width, height } = useWindowSize();

  const currentQuestions = questions[assessmentId] || [];
  const question = currentQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === currentQuestions.length - 1;

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showFeedback]);

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    const isCorrect = index === question.correct;
    const timeBonus = Math.floor(timeLeft / 2);
    const streakBonus = Math.floor(streak * 1.5);
    const questionPoints = isCorrect ? (100 + timeBonus + streakBonus) : 0;
    
    setAnswers([...answers, { correct: isCorrect, time: 30 - timeLeft }]);
    
    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      setPoints(p => p + questionPoints);
      if (streak === 2) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (isLastQuestion) {
        setShowResults(true);
      } else {
        setCurrentQuestion(c => c + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setTimeLeft(30);
      }
    }, 2000);
  };

  const progressPercentage = (currentQuestion / currentQuestions.length) * 100;

  return (
    <>
      {showConfetti && <ReactConfetti width={width} height={height} recycle={false} />}
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="relative h-2 mb-6 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                Question {currentQuestion + 1}/{currentQuestions.length}
              </div>
              <div className="flex items-center gap-1 text-yellow-600">
                <Timer className="h-4 w-4" />
                <span className="font-medium">{timeLeft}s</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-purple-600 font-medium flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                Streak: {streak}🔥
              </div>
              <div className="text-green-600 font-medium">
                Points: {points}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {question.question}
            </h2>
            {question.code && (
              <CodeBlock code={question.code} language="javascript" />
            )}
          </div>

          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                className={`p-4 text-left rounded-lg border-2 transition-colors ${
                  showFeedback
                    ? index === question.correct
                      ? 'border-green-500 bg-green-50'
                      : index === selectedAnswer
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
                onClick={() => handleAnswer(index)}
                whileHover={!showFeedback ? { scale: 1.02 } : {}}
                whileTap={!showFeedback ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showFeedback && index === question.correct && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {showFeedback && index === selectedAnswer && index !== question.correct && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {timeLeft === 0 && !showFeedback && (
            <div className="mt-6 flex items-center justify-center gap-2 text-yellow-600">
              <AlertCircle className="h-5 w-5" />
              <span>Time's up! Please select an answer.</span>
            </div>
          )}

          <div className="mt-8 flex justify-between items-center text-sm text-gray-500">
            <div>Score: {score}/{currentQuestions.length}</div>
            {!isLastQuestion && showFeedback && (
              <div className="flex items-center gap-1 text-indigo-600">
                Next question <ChevronRight className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </div>

      <ResultsModal
        isOpen={showResults}
        onClose={() => {}}
        score={score}
        totalQuestions={currentQuestions.length}
        points={points}
        answers={answers}
        assessmentType={assessmentId}
      />
    </>
  );
}