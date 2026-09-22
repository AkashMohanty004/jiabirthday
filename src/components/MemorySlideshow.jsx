import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { sound } from '../utils/audio';

export default function MemorySlideshow({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageError, setImageError] = useState({});
  const timerRef = useRef(null);

  // Normalize memories array so strings and objects both work flawlessly
  const memoriesList = birthdayConfig.memories.map((item, idx) => {
    if (typeof item === 'string') {
      const defaultCaptions = [
        "Two trouble-makers, one frame! Forever laughing together 😂❤️",
        "Just another unforgettable day ❤️",
        "Too cute with the heart crown filter ✨",
        "That genuine, radiant smile of yours 🌸",
        "Somehow we survived this adventure 😂",
        "Memories that deserve an endless replay ✨",
        "The undisputed queen of cute expressions 👑❤️",
        "Too many laughs, not enough pictures ❤️",
        "Years may pass, but this bond stays forever 💫"
      ];
      return {
        url: item,
        caption: defaultCaptions[idx % defaultCaptions.length]
      };
    }
    return item;
  });

  const total = memoriesList.length;

  // Auto-play slideshow timer
  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
      }, 4500);
    }
    return () => clearInterval(timerRef.current);
  }, [isAutoPlaying, total, currentIndex]);

  const handlePrev = () => {
    sound.playPop();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNextSlide = () => {
    sound.playPop();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Touch Swipe handler for mobile
  const handleDragEnd = (event, info) => {
    if (info.offset.x > 60) {
      handlePrev();
    } else if (info.offset.x < -60) {
      handleNextSlide();
    }
  };

  const currentMemory = memoriesList[currentIndex];

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 sm:px-6 z-10">
      
      {/* Header Section */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card-subtle text-pink-300 text-xs font-semibold tracking-wider uppercase mb-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Our Journey In Photos</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display text-3xl sm:text-4xl font-bold text-white mb-2 text-glow"
        >
          Some Memories, Some Madness ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-serif-elegant text-base sm:text-lg text-pink-200/80 leading-snug px-4"
        >
          Because the best friendships are made of random moments, endless laughs, and memories worth keeping forever.
        </motion.p>
      </div>

      {/* Main Slideshow Container */}
      <div 
        className="w-full max-w-sm sm:max-w-md mx-auto"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Slideshow Card */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden glass-card-glow p-2.5 sm:p-3 shadow-[0_15px_45px_rgba(236,72,153,0.3)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative w-full h-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing bg-black/40"
            >
              {!imageError[currentIndex] ? (
                <img
                  src={currentMemory.url}
                  alt={`Memory ${currentIndex + 1}`}
                  onError={() => setImageError((prev) => ({ ...prev, [currentIndex]: true }))}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="eager"
                />
              ) : (
                /* Fallback if image fails */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-purple-900/60 to-pink-900/60">
                  <Heart className="w-16 h-16 text-pink-400 mb-3 animate-pulse" />
                  <p className="font-display text-xl text-pink-200">A Cherished Memory</p>
                  <p className="text-xs text-pink-300/70 mt-1">Photo memory #{currentIndex + 1}</p>
                </div>
              )}

              {/* Gradient vignette overlay at bottom of photo for caption legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Memory Counter Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-semibold text-pink-200">
                {currentIndex + 1} / {total}
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-center">
                <motion.p
                  key={`cap-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-serif-elegant text-base sm:text-xl font-medium text-pink-100 drop-shadow-md"
                >
                  “{currentMemory.caption}”
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls Overlay */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white transition active:scale-90"
            title="Previous Photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white transition active:scale-90"
            title="Next Photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Dots & Autoplay Toggle */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-pink-300/70 hover:text-pink-200 p-1 mr-2 transition"
            title={isAutoPlaying ? "Pause Slideshow" : "Resume Slideshow"}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] py-1">
            {memoriesList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.playPop();
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-gradient-to-r from-pink-400 to-rose-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Go to memory ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-[11px] text-pink-300/50 mt-1 sm:hidden">
          Swipe left or right to flip photos
        </p>
      </div>

      {/* Bottom Quote & Next Button */}
      <div className="text-center mt-6 sm:mt-8 max-w-md mx-auto">
        <p className="font-serif-elegant text-base sm:text-xl text-pink-200/90 leading-snug mb-5">
          Years may pass, <br />
          but some memories will always stay special. ❤️
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            sound.playChime();
            onNext();
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-white tracking-wide shadow-xl transition"
          style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #9d174d 100%)',
            boxShadow: '0 0 25px rgba(236, 72, 153, 0.4)'
          }}
        >
          <span>💫 Move Ahead</span>
        </motion.button>
      </div>

    </div>
  );
}
