"use client";

import { AnimatePresence } from 'framer-motion';
import QuestionFeed from "@/components/home/QuestionFeed";
import LandingHero from "@/components/home/LandingHero";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const hasSeenLanding = useAppStore((state) => state.hasSeenLanding);
  const setHasSeenLanding = useAppStore((state) => state.setHasSeenLanding);

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasSeenLanding && (
          <LandingHero onEnter={() => setHasSeenLanding(true)} />
        )}
      </AnimatePresence>

      {hasSeenLanding && (
        <QuestionFeed />
      )}
    </>
  );
}
