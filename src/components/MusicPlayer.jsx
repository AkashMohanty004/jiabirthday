import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music2, Disc } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';

export default function MusicPlayer({ isPlaying, onTogglePlay, hasStarted }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  // Initialize and handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay prevented by browser:", error);
          // Auto-resume on next user tap
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={birthdayConfig.song}
        loop
        preload="auto"
      />

      {/* Floating Music Widget */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed top-4 right-4 z-50 flex items-center gap-2"
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, width: 0, scale: 0.9 }}
              animate={{ opacity: 1, width: 'auto', scale: 1 }}
              exit={{ opacity: 0, width: 0, scale: 0.9 }}
              className="glass-card-glow rounded-full px-3 py-1.5 flex items-center gap-2.5 overflow-hidden text-xs text-pink-200"
            >
              <Music2 className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
              <span className="whitespace-nowrap font-medium tracking-wide">
                {birthdayConfig.songTitle || "Pehle Bhi Main"}
              </span>
              <button
                onClick={toggleMute}
                className="text-pink-300 hover:text-white transition p-1"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            onTogglePlay();
            setIsExpanded(true);
          }}
          className={`relative p-2.5 sm:p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying
              ? 'glass-card-glow text-pink-300 border-pink-400/50 shadow-[0_0_20px_rgba(244,114,182,0.4)]'
              : 'glass-card text-pink-200/80 border-white/20 hover:border-pink-400/40'
          }`}
          title={isPlaying ? "Pause Birthday Song" : "Play Birthday Song"}
        >
          {/* Animated pulsing outer ring when active */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full animate-ping bg-pink-500/20 pointer-events-none" />
          )}

          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Disc className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300" />
            </motion.div>

            {isPlaying ? (
              <Pause className="w-4 h-4 text-pink-200" />
            ) : (
              <Play className="w-4 h-4 text-pink-200 fill-pink-200" />
            )}

            {/* Audio Wave Bars when playing */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3.5 pl-0.5">
                <span className="w-0.5 bg-pink-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
                <span className="w-0.5 bg-pink-300 rounded-full animate-[pulse_0.8s_ease-in-out_0.2s_infinite] h-2" />
                <span className="w-0.5 bg-pink-400 rounded-full animate-[pulse_0.7s_ease-in-out_0.4s_infinite] h-3.5" />
              </div>
            )}
          </div>
        </motion.button>
      </motion.div>
    </>
  );
}
