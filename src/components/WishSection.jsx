import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import BirthdayCake from './BirthdayCake';
import { sound } from '../utils/audio';

export default function WishSection({ onContinue }) {
  const [candlesBlown, setCandlesBlown] = useState(false);

  // Generate continuous falling love emojis/hearts after blowing candles
  const fallingHearts = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    left: `${(i * 4.3 + Math.random() * 3) % 96}%`,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 3,
    size: 14 + Math.random() * 16,
    char: i % 4 === 0 ? '💖' : i % 3 === 0 ? '✨' : i % 2 === 0 ? '🎂' : '❤️'
  }));

  const handleCandlesDone = () => {
    setCandlesBlown(true);
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-10 sm:px-6 z-10 text-center">
      
      {/* Continuous Falling Hearts Stream when candles are blown */}
      {candlesBlown && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {fallingHearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ y: -50, opacity: 0 }}
              animate={{
                y: ['0vh', '105vh'],
                opacity: [0, 1, 1, 0],
                x: [0, (h.id % 2 === 0 ? 30 : -30)]
              }}
              transition={{
                duration: h.duration,
                delay: h.delay,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute select-none filter drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]"
              style={{
                left: h.left,
                fontSize: `${h.size}px`
              }}
            >
              {h.char}
            </motion.div>
          ))}
        </div>
      )}

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto mb-6"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card-subtle text-pink-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Candle Wish Time</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-3 text-glow">
          Now, Make a Wish, Jiaa 🎂✨
        </h2>

        <p className="font-serif-elegant text-lg sm:text-xl text-pink-200/85 max-w-sm sm:max-w-md mx-auto leading-relaxed">
          Close your eyes... <br />
          think of something beautiful... <br />
          and make your birthday wish.
        </p>
      </motion.div>

      {/* Interactive Birthday Cake */}
      <div className="my-4">
        <BirthdayCake onAllCandlesBlown={handleCandlesDone} />
      </div>

      {/* After-Wish Reveal Card */}
      <AnimatePresence>
        {candlesBlown && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 max-w-md mx-auto glass-card-glow rounded-3xl p-6 sm:p-8"
          >
            <div className="space-y-3 font-serif-elegant text-xl sm:text-2xl text-pink-100">
              <p className="font-display text-2xl sm:text-3xl text-amber-200 font-bold text-glow-gold">
                Wish made? ✨
              </p>
              <p className="text-pink-200">Good.</p>
              <p className="text-pink-100 font-medium pt-1">
                Now let's hope the universe is listening. ❤️
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-pink-500/20">
              <p className="text-sm sm:text-base text-pink-300 font-medium mb-4 flex items-center justify-center gap-1.5">
                <Heart className="w-4 h-4 fill-pink-400 text-pink-400 animate-pulse" />
                <span>One last surprise is waiting for you... ❤️</span>
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sound.playChime();
                  onContinue();
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base sm:text-lg font-semibold text-white tracking-wide shadow-2xl transition"
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                  boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)'
                }}
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
