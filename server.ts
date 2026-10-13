import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

// Initialize Google GenAI client if GEMINI_API_KEY is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', hasApiKey: Boolean(process.env.GEMINI_API_KEY) });
  });

  // API endpoint for interactive learning chat
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const {
        question,
        knowledgeLevel = '처음 알아보는 중이에요',
        policyContext,
        userData,
        conversationHistory = [],
      } = req.body;

      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      if (!ai) {
        return res.status(503).json({
          error: 'Gemini API is not configured on this server.',
          useFallback: true,
        });
      }

      const systemPrompt = `당신은 청년 주거지원 정책 전문 AI 안내원 "집톡"입니다.
역할:
서울시 및 전국 청년 주거지원 정책을 쉽고 친근하게 안내합니다.
복잡한 행정 용어를 일상 언어로 풀어주고, 사용자의 상황에 맞는 정책을 찾아드립니다.
또래 청년 멘토처럼 따뜻하고 친근하며 공감하는 말투(해요체, 이모지 적절히 사용)로 답변하세요.

사용자 정보:
- 나이: ${userData?.age || '미지정'}
- 거주 지역: ${userData?.region || '미지정'}
- 주거 상황: ${userData?.housingStatus || '미지정'}
- 소득 경로: ${userData?.incomeSource || '미지정'}
- 월 소득: ${userData?.monthlyIncome || '미지정'}
- 부모 독립 여부: ${userData?.independentStatus || '미지정'}
- 현재 선택된 정책: ${policyContext?.name || '청년 주거지원 정책 전반'}
- 사용자 사전 지식 수준: ${knowledgeLevel}

사전 지식 수준별 대응 지침:
1. '처음 알아보는 중이에요':
   - 모든 용어를 일상 언어로 풀어서 설명하고 실생활 비유를 적극 활용.
   - 퀴즈는 기초 개념 확인용 OX 또는 쉬운 객관식.
2. '어느 정도 알고 있어요':
   - 핵심 개념을 간결히 설명하되 실제 정책 신청 조건과 연결하여 설명.
   - 퀴즈는 신청 자격 및 조건 연계 객관식.
3. '잘 알고 있어요':
   - 기본 설명은 압축하고 심화 내용(소득분위 산정, 중복 수혜 비교, 혜택 극대화 팁) 중심.
   - 퀴즈는 응용 및 비교 문제.

대화 규칙:
반드시 다음 JSON 형식으로만 응답해야 합니다:
{
  "conceptName": "핵심 개념 키워드 (예: 기준 중위소득)",
  "explanation": "5~7문장의 친절하고 쉬운 개념 설명. 사전 지식 수준에 맞는 깊이.",
  "followUpConcept": "방금 설명한 개념과 연결된 심화 개념 이름 (예: 건강보험료로 소득 확인하는 법)",
  "followUpQuestion": "혹시 [심화 개념]에 대해서도 알고 계신가요?",
  "quizIfKnown": {
    "type": "multiple_choice" 또는 "ox",
    "question": "Q. (질문 내용)",
    "options": ["1. 선택지 1", "2. 선택지 2", "3. 선택지 3", "4. 선택지 4"] (또는 ["O", "X"]),
    "correctIndex": 0,
    "explanation": "3~5문장의 상세 해설(실생활 예시 반드시 포함, 퀴즈 전 설명과 중복되지 않는 보충 팁)",
    "oneLineSummary": "개념을 한 문장으로 명쾌하게 정리한 내용"
  },
  "subExplanationIfNotKnown": "4~5문장으로 해당 심화 개념을 추가로 쉽게 설명해주는 내용"
}

반드시 정확한 정책 정보만 제공하세요.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          ...conversationHistory.map((h: { role: string; content: string }) => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.content }],
          })),
          {
            role: 'user',
            parts: [{ text: `사용자의 질문: "${question}"에 대해 위 JSON 규칙대로 응답해주세요.` }],
          },
        ],
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const responseText = response.text || '';
      try {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } catch (e) {
        return res.json({ rawText: responseText, useFallback: true });
      }
    } catch (err: unknown) {
      console.error('Gemini chat error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return res.status(500).json({ error: errorMessage, useFallback: true });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`집톡(Jiptalk) Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
