import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundEffects from './components/BackgroundEffects';
import MusicPlayer from './components/MusicPlayer';
import WelcomeScreen from './components/WelcomeScreen';
import FriendshipGame from './components/FriendshipGame';
import MemorySlideshow from './components/MemorySlideshow';
import WishSection from './components/WishSection';
import LoveLetter from './components/LoveLetter';
import FinalBirthdayScreen from './components/FinalBirthdayScreen';
import { birthdayConfig } from './birthdayConfig';

const SECTIONS = ['welcome', 'game', 'memories', 'wish', 'letter', 'final'];

export default function App() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const currentSection = SECTIONS[currentSectionIndex];

  // Start music safely on user interaction
  const handleUserInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsPlayingMusic(true);
    }
  };

  const handleNextSection = () => {
    handleUserInteraction();
    if (currentSectionIndex < SECTIONS.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    setCurrentSectionIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -15, scale: 1.02 }
  };

  return (
    <div 
      className="relative min-h-[100dvh] w-full text-white selection:bg-pink-500/40 selection:text-white"
      onClick={handleUserInteraction}
    >
      {/* Background Animated Atmosphere */}
      <BackgroundEffects />

      {/* Persistent Floating Music Player */}
      <MusicPlayer
        isPlaying={isPlayingMusic}
        onTogglePlay={() => {
          setHasInteracted(true);
          setIsPlayingMusic((prev) => !prev);
        }}
        hasStarted={hasInteracted}
      />

      {/* Top Journey Tracker Bar (Subtle & Elegant) */}
      <div className="fixed top-4 left-4 z-40">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card-subtle text-[11px] font-medium text-pink-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
          <span>Step {currentSectionIndex + 1} of {SECTIONS.length}</span>
        </div>
      </div>

      {/* Main Content View with Transitions */}
      <main className="relative z-10 w-full min-h-[100dvh]">
        <AnimatePresence mode="wait">
          {currentSection === 'welcome' && (
            <motion.section
              key="welcome"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <WelcomeScreen onUnlock={handleNextSection} />
            </motion.section>
          )}

          {currentSection === 'game' && (
            <motion.section
              key="game"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <FriendshipGame onComplete={handleNextSection} />
            </motion.section>
          )}

          {currentSection === 'memories' && (
            <motion.section
              key="memories"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <MemorySlideshow onNext={handleNextSection} />
            </motion.section>
          )}

          {currentSection === 'wish' && (
            <motion.section
              key="wish"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <WishSection onContinue={handleNextSection} />
            </motion.section>
          )}

          {currentSection === 'letter' && (
            <motion.section
              key="letter"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <LoveLetter
                onCelebrate={handleNextSection}
                ensureMusicPlaying={() => setIsPlayingMusic(true)}
              />
            </motion.section>
          )}

          {currentSection === 'final' && (
            <motion.section
              key="final"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <FinalBirthdayScreen onReplay={handleReplay} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
