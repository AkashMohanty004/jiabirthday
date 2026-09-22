import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, CheckCircle2, Laugh } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { sound } from '../utils/audio';

export default function FriendshipGame({ onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = birthdayConfig.quizQuestions;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (option, e) => {
    if (selectedOption) return; // Prevent double taps during animation
    setSelectedOption(option);

    // Audio effect
    sound.playPop();

    // Trigger colorful confetti on each tap
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

    confetti({
      particleCount: 30,
      spread: 55,
      origin: { x, y },
      colors: ['#f472b6', '#ec4899', '#a855f7', '#fbbf24']
    });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setSelectedOption(null);
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      sound.playSuccess();
      
      // Grand celebratory confetti burst for passing!
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#a855f7', '#f59e0b', '#10b981']
      });
    }
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-10 sm:px-6 z-10">
      <div className="w-full max-w-lg mx-auto">
        
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={`q-${currentIdx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card-glow rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden"
            >
              {/* Header Title & Subtitle */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold tracking-wider uppercase mb-3">
                  <Laugh className="w-3.5 h-3.5 text-pink-400" />
                  Friendship Quiz • {currentIdx + 1} of {questions.length}
                </span>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 text-glow">
                  Before You Get Your Surprise... 😏
                </h2>
                <p className="text-pink-200/80 text-sm sm:text-base font-serif-elegant italic">
                  There's just one tiny challenge first. 😂
                </p>

                {/* Progress bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                    initial={{ width: `${(currentIdx / questions.length) * 100}%` }}
                    animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="my-6 min-h-[64px] flex items-center justify-center">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-pink-100">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedOption === opt;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: selectedOption ? 1 : 1.02 }}
                      whileTap={{ scale: selectedOption ? 1 : 0.98 }}
                      onClick={(e) => handleSelectOption(opt, e)}
                      disabled={!!selectedOption}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 flex items-center justify-between text-sm sm:text-base font-medium ${
                        isSelected
                          ? 'bg-gradient-to-r from-pink-500/40 to-rose-500/40 border-2 border-pink-400 text-white shadow-[0_0_20px_rgba(244,114,182,0.4)]'
                          : 'bg-white/5 border border-white/10 text-pink-100 hover:bg-white/10 hover:border-pink-300/30'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-pink-300 shrink-0 ml-2" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Commentary Popup and Next Button */}
              <AnimatePresence>
                {selectedOption && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-4 border-t border-white/10 text-center"
                  >
                    <p className="text-sm sm:text-base font-medium text-pink-200 bg-pink-950/40 p-3 rounded-xl border border-pink-500/30 mb-4 animate-bounce" style={{ animationIterationCount: 1 }}>
                      {selectedOption.commentary}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-pink-500/25 transition"
                    >
                      <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Completed Screen */
            <motion.div
              key="quiz-complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card-glow rounded-3xl p-8 sm:p-10 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                🏆
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3 text-glow">
                Okay Jiaa... you passed! 😂❤️
              </h2>

              <p className="font-serif-elegant text-xl sm:text-2xl text-pink-200/90 mb-8 max-w-sm mx-auto">
                Now you deserve your real surprise.
              </p>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sound.playChime();
                  onComplete();
                }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base sm:text-lg font-semibold text-white tracking-wide shadow-2xl transition"
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                  boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)'
                }}
              >
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span>✨ Show My Memories</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
