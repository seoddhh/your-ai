import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/ui/HeroSection";
import { PersonaCard } from "@/components/ui/PersonaCard";

export default function Home() {
  const personas = [
    {
      tags: [{ label: "AGE", value: "23" }, { label: "JOB", value: "Student" }],
      name: "현실적인 대학생 AI",
      answer: "\"솔직히 말하면 좀 애매해요. 식대가 7-8만원 하는 곳이면 5만원 내고 밥 먹기 눈치 보이죠. 차라리 안 가고 5만원 보내는 게 낫다고 생각합니다. 돈이 없는데 무리할 필요는 없잖아요?\"",
      modelName: "GPT-4o"
    },
    {
      tags: [{ label: "AGE", value: "54" }, { label: "JOB", value: "Director" }],
      name: "낭만있는 꼰대 AI",
      answer: "\"허허, 그게 무슨 소린가. 와준 것만으로도 고맙지. 친구 사이에 계산기 두드리는 거 아니네. 5만원이든 만원이든 형편껏 내고 진심으로 축하해주면 그만이야. 밥값 따지는 친구면 안 보는 게 낫네.\"",
      modelName: "Claude 3.5"
    },
    {
      tags: [{ label: "MBTI", value: "ESTJ" }, { label: "Trait", value: "Logical" }],
      name: "효율 중시 AI",
      answer: "\"데이터로 접근합시다. 최근 서울 평균 예식장 식대 6.8만원입니다. 5만원 내면 신랑신부에게 -1.8만원 손해입니다. 친밀도 상/중/하로 나누고, '중' 이하라면 불참 후 5만원 송금을 추천합니다.\"",
      modelName: "Llama 3"
    },
    {
      tags: [{ label: "EDU", value: "Ph.D" }, { label: "Major", value: "Sociology" }],
      name: "사회학자 AI",
      answer: "\"이것은 단순한 금액 문제가 아닙니다. '축의금 인플레이션'이 관계의 단절을 초래하고 있다는 증거죠. 의례적인 허례허식 문화를 거부하고 소신껏 행동하는 것이 장기적으로 건강한 사회를 만듭니다.\"",
      modelName: "GPT-4"
    }
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow flex flex-col">
        <Header />
        <div className="p-8 max-w-[1400px] mx-auto w-full">
          <HeroSection />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
            {personas.map((persona, index) => (
              <PersonaCard
                key={index}
                tags={persona.tags}
                name={persona.name}
                answer={persona.answer}
                modelName={persona.modelName}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
