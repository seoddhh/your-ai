"use client";

import { AnimatePresence } from 'framer-motion';
import InstructionsHome from "@/components/home/InstructionsHome";
import ScrollLanding from "@/components/home/ScrollLanding";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const hasSeenLanding = useAppStore((state) => state.hasSeenLanding);
  const setHasSeenLanding = useAppStore((state) => state.setHasSeenLanding);

  // 랜딩을 보지 않은 경우 스크롤 랜딩 표시
  if (!hasSeenLanding) {
    return <ScrollLanding onEnter={() => setHasSeenLanding(true)} />;
  }

  // 랜딩을 본 경우 지침 라이브러리 표시
  return <InstructionsHome />;
}

