import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function BirthdayCake({ onAllCandlesBlown }) {
  // 5 candles on top of the cake
  const [candles, setCandles] = useState([
    { id: 1, isLit: true, left: '22%' },
    { id: 2, isLit: true, left: '36%' },
    { id: 3, isLit: true, left: '50%' },
    { id: 4, isLit: true, left: '64%' },
    { id: 5, isLit: true, left: '78%' }
  ]);
  const [puffPositions, setPuffPositions] = useState([]);
  const [cakeGlowing, setCakeGlowing] = useState(false);

  const litCount = candles.filter((c) => c.isLit).length;

  const extinguishCandle = (id, e) => {
    const candle = candles.find((c) => c.id === id);
    if (!candle || !candle.isLit) return;

    sound.playCandleBlow();

    // Spawn smoke puff
    setPuffPositions((prev) => [...prev, { id: Date.now() + Math.random(), left: candle.left }]);

    // Trigger brief cake glow
    setCakeGlowing(true);
    setTimeout(() => setCakeGlowing(false), 600);

    // Subtle mini-sparkle confetti
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { x, y },
        colors: ['#fbbf24', '#f43f5e', '#ffffff'],
        ticks: 80,
        gravity: 0.8
      });
    }

    const nextCandles = candles.map((c) =>
      c.id === id ? { ...c, isLit: false } : c
    );
    setCandles(nextCandles);

    // If all are blown out
    if (nextCandles.every((c) => !c.isLit)) {
      triggerAllBlownSequence();
    }
  };

  const blowAllCandles = () => {
    sound.playCandleBlow();
    setCakeGlowing(true);
    setTimeout(() => setCakeGlowing(false), 900);

    // Add puffs for all currently lit candles
    const puffs = candles
      .filter((c) => c.isLit)
      .map((c) => ({ id: Date.now() + c.id, left: c.left }));
    setPuffPositions((prev) => [...prev, ...puffs]);

    setCandles((prev) => prev.map((c) => ({ ...c, isLit: false })));
    triggerAllBlownSequence();
  };

  const triggerAllBlownSequence = () => {
    sound.playSuccess();

    // Grand celebratory confetti burst from both sides
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#f472b6', '#fbbf24'] });
    fire(0.2, { spread: 60, colors: ['#ec4899', '#ffffff'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#be185d', '#fef08a'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#fb7185', '#a855f7'] });
    fire(0.1, { spread: 120, startVelocity: 45 });

    if (onAllCandlesBlown) {
      setTimeout(() => {
        onAllCandlesBlown();
      }, 700);
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      
      {/* Tap Instruction / Count */}
      <div className="text-center mb-6">
        {litCount > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium border border-pink-400/30"
          >
            <span>🌬️ Tap the candles to blow them out ({litCount} remaining)</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-200 text-xs sm:text-sm font-semibold border border-amber-300/40"
          >
            <span>✨ All candles blown! Your wish has flown to the stars! ✨</span>
          </motion.div>
        )}
      </div>

      {/* CAKE CONTAINER */}
      <div className="relative w-64 sm:w-72 h-64 sm:h-72 flex items-center justify-center">
        
        {/* Soft Ambient Glow Halo behind the cake */}
        <div
          className={`absolute inset-4 rounded-full transition-all duration-700 blur-[50px] ${
            cakeGlowing
              ? 'bg-amber-300/60 scale-125'
              : litCount > 0
              ? 'bg-gradient-to-t from-pink-600/30 via-amber-400/20 to-transparent'
              : 'bg-pink-600/20'
          }`}
        />

        {/* CANDLES ROW (Positioned on top tier) */}
        <div className="absolute top-10 sm:top-12 inset-x-0 h-16 pointer-events-auto z-30">
          {candles.map((candle) => (
            <div
              key={candle.id}
              onClick={(e) => extinguishCandle(candle.id, e)}
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center cursor-pointer group p-1"
              style={{ left: candle.left }}
              title="Click to blow out candle"
            >
              {/* Flame */}
              <AnimatePresence>
                {candle.isLit ? (
                  <motion.div
                    exit={{ opacity: 0, scale: 0.2, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-4 h-6 -mb-1 animate-flicker"
                  >
                    {/* Outer flame glow */}
                    <div className="absolute -inset-1 rounded-full bg-amber-400/40 blur-xs" />
                    {/* SVG flame shape */}
                    <svg viewBox="0 0 24 36" className="w-full h-full drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]">
                      <defs>
                        <radialGradient id={`flameGrad-${candle.id}`} cx="50%" cy="70%" r="50%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="40%" stopColor="#fef08a" />
                          <stop offset="80%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </radialGradient>
                      </defs>
                      <path
                        d="M12 0 C14 8, 22 14, 22 24 A10 10 0 0 1 2 24 C2 14, 10 8, 12 0 Z"
                        fill={`url(#flameGrad-${candle.id})`}
                      />
                    </svg>
                  </motion.div>
                ) : (
                  /* Candle wick when unlit */
                  <div className="w-0.5 h-2.5 bg-neutral-600 rounded-t mb-0.5" />
                )}
              </AnimatePresence>

              {/* Candle Body */}
              <div className="w-2.5 h-10 rounded-t-sm bg-gradient-to-r from-pink-300 via-white to-pink-300 border-x border-pink-400/30 relative overflow-hidden shadow-sm">
                {/* Spiral stripes on candle */}
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#f43f5e,#f43f5e_3px,transparent_3px,transparent_6px)]" />
              </div>
            </div>
          ))}

          {/* Smoke Puff Animation when candles are blown */}
          {puffPositions.map((puff) => (
            <motion.div
              key={puff.id}
              initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -35, scale: 1.6 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute text-sm pointer-events-none -translate-x-1/2 select-none"
              style={{ left: puff.left, top: -5 }}
            >
              💨
            </motion.div>
          ))}
        </div>

        {/* 3-TIER DELUXE CAKE SVG & ILLUSTRATION */}
        <div className="absolute bottom-6 w-56 sm:w-64 z-20">
          
          {/* Top Tier */}
          <div className="relative mx-auto w-32 sm:w-36 h-14 rounded-t-2xl bg-gradient-to-b from-[#fdf2f8] via-[#fbcfe8] to-[#f472b6] border-t-2 border-white/50 shadow-md">
            {/* White Cream Icing Drips */}
            <div className="absolute top-0 inset-x-0 h-4 flex justify-around">
              <span className="w-4 h-4 bg-white rounded-b-full shadow-sm" />
              <span className="w-3.5 h-5 bg-white rounded-b-full shadow-sm" />
              <span className="w-4 h-3.5 bg-white rounded-b-full shadow-sm" />
              <span className="w-3.5 h-4.5 bg-white rounded-b-full shadow-sm" />
            </div>
            {/* Strawberries / Pearls decoration */}
            <div className="absolute -top-2 inset-x-0 flex justify-between px-2 text-xs">
              <span>🍓</span>
              <span>🌸</span>
              <span>🍓</span>
              <span>🌸</span>
            </div>
          </div>

          {/* Middle Tier */}
          <div className="relative mx-auto w-44 sm:w-48 h-16 rounded-t-2xl bg-gradient-to-b from-[#fce7f3] via-[#f472b6] to-[#db2777] border-t-2 border-white/40 shadow-lg -mt-1">
            {/* Gold bead garland */}
            <div className="absolute top-2 inset-x-0 flex justify-around px-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_4px_#fbbf24]" />
              ))}
            </div>
            {/* Decorative Heart Center */}
            <div className="absolute inset-x-0 bottom-3 text-center text-xs font-serif-elegant font-semibold tracking-wider text-pink-100">
              JIAA ❤️
            </div>
          </div>

          {/* Bottom Tier */}
          <div className="relative mx-auto w-56 sm:w-60 h-20 rounded-t-3xl bg-gradient-to-b from-[#fbcfe8] via-[#ec4899] to-[#9d174d] border-t-2 border-white/40 shadow-2xl -mt-1">
            {/* White Frosting Fluffs */}
            <div className="absolute top-0 inset-x-0 flex justify-between px-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="w-4 h-2.5 bg-white rounded-b-full opacity-90 shadow-sm" />
              ))}
            </div>
            {/* Sparkling sprinkles */}
            <div className="absolute inset-4 flex flex-wrap justify-around items-center opacity-70">
              <span className="w-1 h-2 bg-yellow-300 rounded-full rotate-45" />
              <span className="w-1.5 h-1.5 bg-pink-200 rounded-full" />
              <span className="w-2 h-1 bg-rose-200 rounded-full -rotate-12" />
              <span className="w-1.5 h-1.5 bg-yellow-200 rounded-full" />
              <span className="w-1 h-2 bg-white rounded-full rotate-12" />
            </div>
          </div>

          {/* Golden Stand / Platter */}
          <div className="relative mx-auto w-64 sm:w-68 h-4 rounded-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 border border-amber-200/60 shadow-[0_6px_20px_rgba(245,158,11,0.4)] -mt-0.5" />
          <div className="mx-auto w-24 h-3 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 rounded-b-lg opacity-80" />
        </div>

      </div>

      {/* Optional "Blow All at Once" Button for mobile ease */}
      {litCount > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={blowAllCandles}
          className="mt-6 px-4 py-2 rounded-full glass-card-subtle text-pink-200 text-xs sm:text-sm font-medium hover:bg-pink-500/20 transition flex items-center gap-1.5"
        >
          <span>💨 Blow All Candles Together</span>
        </motion.button>
      )}

    </div>
  );
}
