import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

export default function WelcomeScreen({ onUnlock }) {
  const handleUnlockClick = (e) => {
    // Sound & Confetti trigger
    sound.playChime();

    // Heart and gold confetti burst
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#f43f5e', '#ec4899', '#fbcfe8', '#fef08a'],
      shapes: ['circle', 'square']
    });

    setTimeout(() => {
      onUnlock();
    }, 450);
  };

  const messageLines = [
    "Today is not just another day...",
    "it's the day someone truly special was born.",
    "",
    "Someone who can turn ordinary moments into unforgettable memories,",
    "make people laugh when they don't feel like smiling,",
    "and somehow make every day a little brighter.",
    "",
    "Happy Birthday, Jiaa! ❤️✨"
  ];

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-12 sm:px-6 text-center z-10">
      
      {/* Decorative top badge */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-subtle text-pink-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
      >
        <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>A Special Surprise For You</span>
        <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
      </motion.div>

      {/* Main Birthday Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 text-glow leading-tight">
          Happy Birthday <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200 bg-clip-text text-transparent">Jiaa</span> 🎂❤️
        </h1>
      </motion.div>

      {/* Poetic Message Animated Line by Line */}
      <div className="max-w-xl mx-auto my-6 space-y-2 sm:space-y-3 font-serif-elegant text-lg sm:text-2xl md:text-2xl text-pink-100/90 leading-relaxed font-normal">
        {messageLines.map((line, idx) => {
          if (!line) {
            return <div key={idx} className="h-2" />;
          }

          const isLast = line.includes("Happy Birthday, Jiaa!");

          return (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5 + idx * 0.25,
                ease: "easeOut"
              }}
              className={
                isLast
                  ? "font-display text-2xl sm:text-3xl text-pink-300 font-semibold tracking-wide pt-2 text-glow"
                  : "text-pink-100/85"
              }
            >
              {line}
            </motion.p>
          );
        })}
      </div>

      {/* Glowing Unlock Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.8 }}
        className="mt-8 sm:mt-10"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleUnlockClick}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-semibold text-white tracking-wide overflow-hidden shadow-2xl transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #831843 100%)',
            boxShadow: '0 0 35px 2px rgba(236, 72, 153, 0.45), inset 0 1px 1px rgba(255,255,255,0.4)'
          }}
        >
          {/* Animated Sheen effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <span>Unlock Your Gift</span>
          </span>
          <Heart className="w-4 h-4 text-pink-200 fill-pink-200/50 group-hover:scale-125 transition-transform" />
        </motion.button>

        <p className="mt-4 text-xs sm:text-sm text-pink-300/60 font-sans tracking-wider">
          Crafted with love by Anshu • Tap to begin your journey
        </p>
      </motion.div>

    </div>
  );
}
