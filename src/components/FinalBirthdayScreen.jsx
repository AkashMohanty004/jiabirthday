import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

export default function FinalBirthdayScreen({ onReplay }) {
  // Interactive floating balloons
  const [balloons, setBalloons] = useState([
    { id: 1, x: 12, delay: 0, color: 'from-pink-500 to-rose-400', popped: false, emoji: '🎈' },
    { id: 2, x: 28, delay: 1.5, color: 'from-purple-500 to-indigo-400', popped: false, emoji: '💖' },
    { id: 3, x: 48, delay: 0.8, color: 'from-amber-400 to-pink-500', popped: false, emoji: '🎈' },
    { id: 4, x: 70, delay: 2, color: 'from-rose-500 to-pink-400', popped: false, emoji: '✨' },
    { id: 5, x: 88, delay: 1.2, color: 'from-pink-400 to-purple-400', popped: false, emoji: '🎈' }
  ]);

  // Initial celebratory confetti explosion
  useEffect(() => {
    sound.playSuccess();
    
    const end = Date.now() + 2500;
    const colors = ['#f43f5e', '#ec4899', '#fbcfe8', '#fef08a', '#c084fc'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const popBalloon = (id, e) => {
    sound.playPop();

    // Trigger confetti at balloon position
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x, y },
        colors: ['#f43f5e', '#ec4899', '#fef08a']
      });
    }

    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
  };

  const handleSendLove = () => {
    sound.playChime();
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.85 },
      colors: ['#ec4899', '#f43f5e', '#fda4af', '#fef08a']
    });
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-12 sm:px-6 z-10 text-center overflow-hidden">
      
      {/* Interactive Floating Balloons */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {balloons.map((b) => (
          <AnimatePresence key={b.id}>
            {!b.popped && (
              <motion.div
                initial={{ y: '105vh', opacity: 0 }}
                animate={{
                  y: ['105vh', '-20vh'],
                  opacity: [0, 1, 1, 0.8]
                }}
                transition={{
                  duration: 14,
                  delay: b.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute pointer-events-auto cursor-pointer"
                style={{ left: `${b.x}%` }}
                onClick={(e) => popBalloon(b.id, e)}
                title="Tap to pop balloon!"
              >
                <div className="relative group p-2">
                  <div className="text-3xl sm:text-4xl filter drop-shadow-[0_0_12px_rgba(244,114,182,0.6)] group-hover:scale-125 transition-transform">
                    {b.emoji}
                  </div>
                  {/* String */}
                  <div className="w-0.5 h-8 bg-white/20 mx-auto -mt-1" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      <div className="max-w-2xl mx-auto z-30">
        
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 flex items-center justify-center text-4xl sm:text-5xl shadow-[0_0_40px_rgba(236,72,153,0.6)] border-2 border-white/40"
        >
          👑
        </motion.div>

        {/* Large Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 text-glow leading-tight"
        >
          Happy Birthday <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">Jiaa</span> 🎂❤️
        </motion.h1>

        {/* Celebratory Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card-glow rounded-3xl p-6 sm:p-8 mb-8"
        >
          <p className="font-serif-elegant text-xl sm:text-2xl md:text-3xl text-pink-100/95 leading-relaxed mb-6">
            “Here’s to another year of smiles, <br className="hidden sm:block" />
            adventures, memories, and endless reasons to celebrate. ✨”
          </p>

          <div className="pt-6 border-t border-pink-500/25">
            <p className="font-serif-elegant text-lg text-pink-300/90 italic">
              Your Loved One,
            </p>
            <p className="font-script text-4xl sm:text-5xl text-pink-300 text-glow-gold mt-1">
              Anshu ❤️
            </p>
          </div>
        </motion.div>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendLove}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold text-white tracking-wide shadow-2xl transition"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
              boxShadow: '0 0 30px rgba(236, 72, 153, 0.45)'
            }}
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>Send Love & Confetti ❤️</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              sound.playChime();
              onReplay();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass-card-subtle text-pink-200 hover:text-white border border-pink-400/30 hover:border-pink-300 text-base font-medium transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Journey ↺</span>
          </motion.button>
        </motion.div>

        <p className="text-pink-300/50 text-xs sm:text-sm mt-6 font-sans">
          Tip: Tap the floating balloons in the air to pop them! 🎈
        </p>

      </div>
    </div>
  );
}
