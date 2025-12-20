import { CustomInstruction, Domain } from '@/data/customInstructions';

export interface RecommendOptions {
  domain: Domain;
  desiredTags: string[];
  limit?: number;
}

export interface Recommendation {
  instruction: CustomInstruction;
  score: number;
  matchedTags: string[];
  reasons: string[];
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function computeTagMatches(desiredTags: string[], instructionTags: string[]): string[] {
  const desired = desiredTags.map(normalize);
  const tags = instructionTags.map(normalize);

  const matched: string[] = [];
  for (let index = 0; index < desired.length; index += 1) {
    const wanted = desired[index];
    if (!wanted) continue;

    const exact = tags.find((t) => t === wanted);
    if (exact) {
      matched.push(desiredTags[index]);
      continue;
    }

    const partial = tags.find((t) => t.includes(wanted) || wanted.includes(t));
    if (partial) {
      matched.push(desiredTags[index]);
    }
  }

  return matched;
}

export function recommendInstructions(
  allInstructions: CustomInstruction[],
  options: RecommendOptions
): Recommendation[] {
  const { domain, desiredTags, limit = 6 } = options;
  const normalizedDesiredTags = (desiredTags || []).filter(Boolean);

  const recommendations = (allInstructions || []).map((instruction) => {
    const isDomainMatch = instruction.domain === domain;
    const matchedTags = computeTagMatches(normalizedDesiredTags, instruction.tags || []);

    let score = 0;
    const reasons: string[] = [];

    if (isDomainMatch) {
      score += 6;
      reasons.push('도메인 일치');
    }

    if (matchedTags.length > 0) {
      score += matchedTags.length * 3;
      reasons.push(`태그 매칭: ${matchedTags.join(', ')}`);
    }

    score += Math.min(2.5, (instruction.popularity || 0) / 400);

    return {
      instruction,
      score,
      matchedTags,
      reasons,
    } satisfies Recommendation;
  });

  return recommendations
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (b.instruction.popularity || 0) - (a.instruction.popularity || 0);
    })
    .slice(0, limit);
}

