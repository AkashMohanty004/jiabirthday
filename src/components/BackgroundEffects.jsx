import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundEffects() {
  // Generate random twinkling stars
  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, []);

  // Floating delicate hearts and sparkles
  const floatingElements = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 92 + 4,
      y: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      type: i % 3 === 0 ? '✨' : i % 2 === 0 ? '💖' : '🌸'
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep romantic gradient atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#130324] via-[#1a062f] to-[#0a0114]" />

      {/* Radiant ambient glow orbs */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-600/15 blur-[120px] animate-pulse-glow"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute top-1/3 -right-28 w-96 h-96 rounded-full bg-purple-600/15 blur-[130px] animate-pulse-glow"
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />
      <div 
        className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-rose-500/12 blur-[140px] animate-pulse-glow"
        style={{ animationDuration: '9s', animationDelay: '4s' }}
      />

      {/* Subtle light rays overlay */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(244,114,182,0.2) 0%, transparent 70%)'
        }}
      />

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-pink-100"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 3}px rgba(254, 240, 138, 0.8)`
          }}
          animate={{
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Subtle Floating Embellishments */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute select-none opacity-40 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}px`
          }}
          animate={{
            y: [-30, -120],
            x: [0, (el.id % 2 === 0 ? 25 : -25)],
            opacity: [0, 0.6, 0.8, 0],
            rotate: [0, el.id % 2 === 0 ? 20 : -20]
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {el.type}
        </motion.div>
      ))}
    </div>
  );
}
