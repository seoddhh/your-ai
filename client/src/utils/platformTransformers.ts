// 플랫폼별 응답 스타일 변환 유틸리티
// 동일한 규칙을 GPT, Claude, Gemini의 개인 설정 형식에 맞게 변환

export type Platform = 'gpt' | 'claude' | 'gemini';

export interface PlatformConfig {
    id: Platform;
    name: string;
    label: string;
    color: string;
    bgColor: string;
    pasteGuide: string;
    description: string;
}

// 플랫폼별 설정 정보
export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
    gpt: {
        id: 'gpt',
        name: 'ChatGPT',
        label: 'GPT',
        color: '#10a37f',
        bgColor: '#10a37f15',
        pasteGuide: 'ChatGPT → 설정 → 개인화 → "응답 방식 선호" 영역에 붙여넣으세요',
        description: 'ChatGPT 개인 응답 설정에 맞게 변환됨',
    },
    claude: {
        id: 'claude',
        name: 'Claude',
        label: 'Claude',
        color: '#d97706',
        bgColor: '#d9770615',
        pasteGuide: 'Claude → 설정 → 프로젝트 지침에 붙여넣으세요',
        description: 'Claude의 개인 응답 설정에 맞게 변환됨',
    },
    gemini: {
        id: 'gemini',
        name: 'Gemini',
        label: 'Gemini',
        color: '#4285f4',
        bgColor: '#4285f415',
        pasteGuide: 'Gemini → 설정 → 개인 설정에 붙여넣으세요',
        description: 'Gemini의 개인 응답 설정에 맞게 변환됨',
    },
};

/**
 * 응답 스타일을 플랫폼별로 변환
 * 
 * 변환 규칙:
 * - GPT: 간결한 지시문 스타일 (짧은 문장, 직접적인 명령)
 * - Claude: 자연어 설명 스타일 (부드러운 표현, 맥락 포함)
 * - Gemini: 구조화된 목록 스타일 (명확한 구분, 키워드 강조)
 * 
 * 의미는 동일하게 유지하며, 새로운 규칙 추가나 삭제는 하지 않습니다.
 */
export function transformForPlatform(
    responsePreference: string,
    platform: Platform
): string {
    // 원본 텍스트의 줄 단위로 분리
    const lines = responsePreference.trim().split('\n');

    switch (platform) {
        case 'gpt':
            return transformForGPT(lines);
        case 'claude':
            return transformForClaude(lines);
        case 'gemini':
            return transformForGemini(lines);
        default:
            return responsePreference;
    }
}

/**
 * GPT용 변환: 간결한 지시문 스타일
 * - "~해주세요" → "~할 것"
 * - 불필요한 수식어 제거
 */
function transformForGPT(lines: string[]): string {
    return lines
        .map((line) => {
            let transformed = line.trim();
            if (!transformed) return '';

            // 번호가 있는 항목 처리
            const numberMatch = transformed.match(/^(\d+)\.\s*/);
            const prefix = numberMatch ? `${numberMatch[1]}. ` : '';
            const content = numberMatch
                ? transformed.slice(numberMatch[0].length)
                : transformed;

            // GPT 스타일로 변환: 간결하고 직접적인 명령형
            let gptContent = content
                .replace(/해주세요$/g, '할 것')
                .replace(/주세요$/g, '줄 것')
                .replace(/알려주세요$/g, '알려줄 것')
                .replace(/포함해주세요$/g, '포함할 것')
                .replace(/고려해주세요$/g, '고려할 것')
                .replace(/전달해주세요$/g, '전달할 것')
                .replace(/설명해주세요$/g, '설명할 것')
                .replace(/작성해주세요$/g, '작성할 것')
                .replace(/사용해주세요$/g, '사용할 것');

            return prefix + gptContent;
        })
        .filter(line => line)
        .join('\n');
}

/**
 * Claude용 변환: 자연어 설명 스타일
 * - 부드러운 표현 사용
 * - 맥락과 이유를 약간 추가
 */
function transformForClaude(lines: string[]): string {
    return lines
        .map((line) => {
            let transformed = line.trim();
            if (!transformed) return '';

            // 번호가 있는 항목 처리
            const numberMatch = transformed.match(/^(\d+)\.\s*/);
            const prefix = numberMatch ? `${numberMatch[1]}. ` : '';
            const content = numberMatch
                ? transformed.slice(numberMatch[0].length)
                : transformed;

            // Claude 스타일로 변환: 부드럽고 협력적인 톤
            let claudeContent = content
                .replace(/해주세요$/g, '해 주시면 좋겠습니다')
                .replace(/주세요$/g, '주시면 감사하겠습니다')
                .replace(/알려주세요$/g, '알려 주세요')
                .replace(/보여주세요$/g, '보여 주시면 됩니다');

            return prefix + claudeContent;
        })
        .filter(line => line)
        .join('\n');
}

/**
 * Gemini용 변환: 구조화된 목록 스타일
 * - 키워드를 대괄호로 강조
 * - 명확한 구조
 */
function transformForGemini(lines: string[]): string {
    return lines
        .map((line) => {
            let transformed = line.trim();
            if (!transformed) return '';

            // 번호가 있는 항목 처리
            const numberMatch = transformed.match(/^(\d+)\.\s*/);
            const prefix = numberMatch ? `• ` : '';
            const content = numberMatch
                ? transformed.slice(numberMatch[0].length)
                : transformed;

            // Gemini 스타일로 변환: 구조화된 형식
            let geminiContent = content
                .replace(/해주세요$/g, '해 주세요')
                .replace(/TypeScript/gi, '[TypeScript]')
                .replace(/Python/gi, '[Python]')
                .replace(/코드/g, '[코드]')
                .replace(/예제/g, '[예제]');

            return prefix + geminiContent;
        })
        .filter(line => line)
        .join('\n');
}

// 플랫폼 목록 (순서 유지)
export const PLATFORMS: Platform[] = ['gpt', 'claude', 'gemini'];
