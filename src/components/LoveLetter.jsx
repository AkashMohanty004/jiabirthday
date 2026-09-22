import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, PartyPopper } from 'lucide-react';
import { sound } from '../utils/audio';

export default function LoveLetter({ onCelebrate, ensureMusicPlaying }) {
  const containerRef = useRef(null);

  // Automatically request music playback when entering this emotional section
  useEffect(() => {
    if (ensureMusicPlaying) {
      ensureMusicPlaying();
    }
  }, [ensureMusicPlaying]);

  const letterParagraphs = [
    {
      type: "salutation",
      content: "Dear Jiaa,"
    },
    {
      type: "highlight",
      content: "Happy Birthday to one of the most amazing people I have had the chance to know. ❤️"
    },
    {
      type: "body",
      content: "I don't know if a website can ever properly describe how special a person is, but I still wanted to try."
    },
    {
      type: "body",
      content: "Some people enter our lives and simply become part of our memories. And then there are people who become a part of our everyday life, our random conversations, our stupid jokes, our unforgettable moments, and the stories we keep talking about again and again."
    },
    {
      type: "accent",
      content: "You are one of those people."
    },
    {
      type: "body",
      content: "Thank you for all the laughs, the crazy conversations, the random moments, the support, and all those little memories that somehow became important without us even realizing it."
    },
    {
      type: "body",
      content: "I hope this birthday brings you countless reasons to smile."
    },
    {
      type: "wishes",
      content: [
        "I hope you get everything you wish for.",
        "I hope your dreams slowly become reality.",
        "I hope you meet beautiful people, experience beautiful moments, and create memories that you'll remember for years."
      ]
    },
    {
      type: "body",
      content: "And whenever life becomes difficult, I hope you remember that there are people who genuinely care about you and want to see you happy."
    },
    {
      type: "accent",
      content: "So today, forget all the worries."
    },
    {
      type: "reminders",
      content: [
        "Smile a little more.",
        "Laugh a little louder.",
        "Eat an extra piece of cake.",
        "Take too many pictures.",
        "Make a crazy wish.",
        "And enjoy your day like you deserve to."
      ]
    },
    {
      type: "body",
      content: "Thank you for being Jiaa."
    },
    {
      type: "body",
      content: "Thank you for being a wonderful friend."
    },
    {
      type: "accent",
      content: "And most importantly..."
    },
    {
      type: "highlight-large",
      content: "never stop being the amazing person you are. ❤️"
    },
    {
      type: "closing-wish",
      content: "Happy Birthday once again, Jiaa! 🎂✨"
    },
    {
      type: "body",
      content: "May this year bring you happiness, success, peace, beautiful surprises, and countless unforgettable memories."
    },
    {
      type: "mantra",
      content: [
        "Keep smiling.",
        "Keep shining.",
        "And keep being you. ❤️"
      ]
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-16 sm:px-6 z-10"
    >
      <div className="w-full max-w-xl mx-auto">
        
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-subtle text-pink-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-3">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            <span>From The Heart</span>
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white text-glow">
            For Jiaa ❤️
          </h2>
        </motion.div>

        {/* Letter Parchment Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative glass-card-glow rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(236,72,153,0.35)] border border-pink-400/30 overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(45, 12, 60, 0.9) 0%, rgba(20, 5, 30, 0.95) 100%)'
          }}
        >
          {/* Subtle Golden Ribbon Accent */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-pink-500 via-amber-300 to-rose-500" />

          {/* Letter Content */}
          <div className="space-y-6 text-pink-100/90 font-serif-elegant text-lg sm:text-xl md:text-2xl leading-relaxed">
            {letterParagraphs.map((item, idx) => {
              if (item.type === "salutation") {
                return (
                  <motion.h3
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.15 }}
                    className="font-display text-2xl sm:text-3xl text-pink-200 font-semibold mb-4"
                  >
                    {item.content}
                  </motion.h3>
                );
              }

              if (item.type === "highlight") {
                return (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.15 }}
                    className="text-xl sm:text-2xl font-medium text-pink-200"
                  >
                    {item.content}
                  </motion.p>
                );
              }

              if (item.type === "highlight-large") {
                return (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.15 }}
                    className="font-display text-2xl sm:text-3xl text-pink-300 font-bold py-2 text-glow"
                  >
                    {item.content}
                  </motion.p>
                );
              }

              if (item.type === "accent") {
                return (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.15 }}
                    className="font-display text-xl sm:text-2xl text-amber-200/95 italic font-semibold"
                  >
                    {item.content}
                  </motion.p>
                );
              }

              if (item.type === "closing-wish") {
                return (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.15 }}
                    className="font-display text-2xl sm:text-3xl text-pink-200 font-bold pt-3"
                  >
                    {item.content}
                  </motion.p>
                );
              }

              if (Array.isArray(item.content)) {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.15 }}
                    className="pl-4 border-l-2 border-pink-400/40 space-y-2 py-1 my-3 text-pink-100"
                  >
                    {item.content.map((line, lIdx) => (
                      <p key={lIdx} className={item.type === 'mantra' ? 'font-display font-semibold text-pink-300 text-xl' : ''}>
                        {line}
                      </p>
                    ))}
                  </motion.div>
                );
              }

              return (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.12 }}
                >
                  {item.content}
                </motion.p>
              );
            })}
          </div>

          {/* Signature Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="mt-12 pt-8 border-t border-pink-500/30 text-right"
          >
            <p className="font-serif-elegant text-lg sm:text-xl text-pink-200/90 italic">
              With lots of love and best wishes,
            </p>
            <div className="mt-3">
              <p className="font-serif-elegant text-base sm:text-lg text-pink-300">
                Your Loved One,
              </p>
              <p className="font-script text-4xl sm:text-5xl text-pink-300 text-glow-gold mt-1">
                Anshu ❤️
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Celebration Transition Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.7 }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              sound.playSuccess();
              onCelebrate();
            }}
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-base sm:text-lg font-semibold text-white tracking-wide shadow-2xl transition"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #9d174d 100%)',
              boxShadow: '0 0 35px rgba(236, 72, 153, 0.5)'
            }}
          >
            <PartyPopper className="w-5 h-5 text-amber-200" />
            <span>Celebrate Jiaa 🎉</span>
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}
