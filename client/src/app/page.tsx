"use client";

import { AnimatePresence } from 'framer-motion';
import QuestionFeed from "@/components/home/QuestionFeed";
import ScrollLanding from "@/components/home/ScrollLanding";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const hasSeenLanding = useAppStore((state) => state.hasSeenLanding);
  const setHasSeenLanding = useAppStore((state) => state.setHasSeenLanding);

  // 랜딩을 보지 않은 경우 스크롤 랜딩 표시
  if (!hasSeenLanding) {
    return <ScrollLanding onEnter={() => setHasSeenLanding(true)} />;
  }

  // 랜딩을 본 경우 메인 피드 표시
  return <QuestionFeed />;
}
