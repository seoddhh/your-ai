import { useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import {
    customInstructions,
    CustomInstruction,
    Domain,
    DOMAIN_META,
} from '@/data/customInstructions';

export type SortOption = 'popular' | 'recent' | 'usage';

export interface UseAnswerRulesOptions {
    domain?: Domain | 'all';
    searchQuery?: string;
    sortBy?: SortOption;
    limit?: number;
    onlyTrending?: boolean;
    includeUserRules?: boolean;
}

export interface UseAnswerRulesResult {
    instructions: CustomInstruction[];
    allInstructions: CustomInstruction[];
    isLoading: boolean;
    domainMeta: typeof DOMAIN_META;
    domains: Domain[];
}

/**
 * 통합 응답 규칙 데이터 페칭 훅
 * Home과 Library 페이지에서 공통으로 사용
 */
export function useAnswerRules(options: UseAnswerRulesOptions = {}): UseAnswerRulesResult {
    const {
        domain = 'all',
        searchQuery = '',
        sortBy = 'popular',
        limit,
        onlyTrending = false,
        includeUserRules = true,
    } = options;

    const userInstructions = useAppStore((state) => state.userInstructions);

    // 전체 응답 규칙 (사용자 등록 + 기본)
    const allInstructions = useMemo(() => {
        if (!includeUserRules) {
            return customInstructions;
        }
        return [...userInstructions, ...customInstructions];
    }, [userInstructions, includeUserRules]);

    // 필터링 및 정렬된 응답 규칙
    const instructions = useMemo(() => {
        if (!allInstructions || !Array.isArray(allInstructions)) {
            return [];
        }

        let result = [...allInstructions];

        // 도메인 필터
        if (domain !== 'all') {
            result = result.filter((i) => i.domain === domain);
        }

        // 검색 필터
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (i) =>
                    i.name.toLowerCase().includes(q) ||
                    i.description.toLowerCase().includes(q) ||
                    i.tags.some((t) => t.toLowerCase().includes(q))
            );
        }

        // 인기 항목만
        if (onlyTrending) {
            result = result.filter((i) => i.popularity >= 400);
        }

        // 정렬
        switch (sortBy) {
            case 'popular':
                result.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'recent':
                // ID 기반 정렬 (실제로는 createdAt 사용하면 좋음)
                result.sort((a, b) => b.id.localeCompare(a.id));
                break;
            case 'usage':
                result.sort((a, b) => b.popularity - a.popularity);
                break;
        }

        // 개수 제한
        if (limit && limit > 0) {
            result = result.slice(0, limit);
        }

        return result;
    }, [allInstructions, domain, searchQuery, sortBy, limit, onlyTrending]);

    const domains = Object.keys(DOMAIN_META) as Domain[];

    return {
        instructions,
        allInstructions,
        isLoading: false,
        domainMeta: DOMAIN_META,
        domains,
    };
}

/**
 * 도메인별 TOP N 응답 규칙 가져오기
 */
export function useTopRulesByDomain(topN: number = 3): Record<Domain | 'all', CustomInstruction[]> {
    const { allInstructions, domains } = useAnswerRules();

    return useMemo(() => {
        const result: Record<string, CustomInstruction[]> = {
            all: [...allInstructions]
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, topN),
        };

        domains.forEach((domain) => {
            result[domain] = allInstructions
                .filter((i) => i.domain === domain)
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, topN);
        });

        return result as Record<Domain | 'all', CustomInstruction[]>;
    }, [allInstructions, domains, topN]);
}

/**
 * 도메인별 대표 규칙 1개씩 가져오기 (분야별 하이라이트용)
 */
export function useDomainRepresentatives(): CustomInstruction[] {
    const { allInstructions, domains } = useAnswerRules();

    return useMemo(() => {
        return domains
            .map((domain) => {
                const domainRules = allInstructions
                    .filter((i) => i.domain === domain)
                    .sort((a, b) => b.popularity - a.popularity);
                return domainRules[0];
            })
            .filter(Boolean);
    }, [allInstructions, domains]);
}
