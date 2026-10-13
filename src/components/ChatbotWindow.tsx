import React, { useState, useEffect, useRef } from 'react';
import {
  Policy,
  UserProfile,
  KnowledgeLevel,
  ChatMessage,
  CurriculumItem,
  QuizData,
  QuizAttempt,
  LearningSummary
} from '../types.ts';
import { CURRICULUM_DATA } from '../data/curriculum.ts';
import { LearningSummaryModal } from './LearningSummaryModal.tsx';
import {
  Send,
  Sparkles,
  Bot,
  User,
  HelpCircle,
  LogOut,
  RotateCcw,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';

interface ChatbotWindowProps {
  policy: Policy;
  userProfile: UserProfile;
}

export const ChatbotWindow: React.FC<ChatbotWindowProps> = ({
  policy,
  userProfile
}) => {
  const [knowledgeLevel, setKnowledgeLevel] = useState<KnowledgeLevel | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Learning tracking
  const [learnedConcepts, setLearnedConcepts] = useState<string[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [oneLineSummaries, setOneLineSummaries] = useState<string[]>([]);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  // Chat scroll container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initial greeting with mandatory knowledge level check
  useEffect(() => {
    // Reset or start initial message
    const initialGreeting: ChatMessage = {
      id: 'greeting-1',
      sender: 'bot',
      text: '안녕하세요! 집톡이에요 🏠 본격적으로 시작하기 전에, 주거 정책에 대해 얼마나 알고 계신지 여쭤볼게요!',
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      activeOptions: {
        type: 'level_check',
        items: ['처음 알아보는 중이에요', '어느 정도 알고 있어요', '잘 알고 있어요']
      }
    };
    setMessages([initialGreeting]);
  }, [policy.id]);

  // Handle user selecting knowledge level
  const handleSelectLevel = (level: KnowledgeLevel) => {
    setKnowledgeLevel(level);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: level,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    let welcomeText = '';
    if (level === '처음 알아보는 중이에요') {
      welcomeText =
        '좋아요! 눈높이에 딱 맞추어 어려운 행정 용어도 일상 언어와 쉬운 비유로 친절하게 설명해 드릴게요 😊 ' +
        `지금 보고 계신 [${policy.name}]에 대해 무엇이든 편하게 물어보세요! 아래 빠른 질문을 누르시면 바로 시작할 수 있어요.`;
    } else if (level === '어느 정도 알고 있어요') {
      welcomeText =
        '멋져요! 이미 기본 지식이 있으시군요 👍 핵심 개념을 간결하게 짚고 실제 정책 조건 및 당첨 꿀팁과 연결해서 안내해 드릴게요. ' +
        `[${policy.name}]의 세부 조건 중 궁금한 항목을 선택해보세요!`;
    } else {
      welcomeText =
        '대단해요! 전문가 수준이시네요 👏 기본 설명은 짧게 압축하고, 정책별 비교 및 소득분위 산정 등 심화 실전 전략 중심으로 깊이 있게 대화 나눠봐요!';
    }

    const botReply: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: welcomeText,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      activeOptions: {
        type: 'quick_question',
        items: policy.quickQuestions
      }
    };

    // Remove activeOptions from the greeting and add new messages
    setMessages((prev) => [
      ...prev.map((m) => (m.id === 'greeting-1' ? { ...m, activeOptions: undefined } : m)),
      userMsg,
      botReply
    ]);
  };

  // Helper to start STEP 1 for a question
  const triggerStep1Concept = (questionText: string, curriculum: CurriculumItem, currentLevel: KnowledgeLevel) => {
    const explanation = curriculum.explanations[currentLevel];
    const followUpQuestionText = curriculum.followUpQuestion;

    // Track learned concept
    if (!learnedConcepts.includes(curriculum.conceptName)) {
      setLearnedConcepts((prev) => [...prev, curriculum.conceptName]);
    }

    const fullBotResponse = `${explanation}\n\n${followUpQuestionText}`;

    const botMsg: ChatMessage = {
      id: `bot-concept-${Date.now()}`,
      sender: 'bot',
      text: fullBotResponse,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      curriculumItem: curriculum,
      activeOptions: {
        type: 'tail_yn',
        items: ['네, 알아요', '아니요, 몰라요'],
        conceptKey: curriculum.id
      }
    };

    setMessages((prev) => [...prev, botMsg]);
  };

  // Handle Question Trigger (Quick Button or Custom Input)
  const handleAskQuestion = async (questionText: string) => {
    if (!questionText.trim()) return;

    const currentLevel = knowledgeLevel || '처음 알아보는 중이에요';
    if (!knowledgeLevel) {
      setKnowledgeLevel(currentLevel);
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: questionText,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    // Clear previous active options to keep chat clean
    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, activeOptions: undefined })),
      userMsg
    ]);
    setInputQuery('');

    // Check if question exists in our rich predefined curriculum
    const matchedCurriculum = Object.values(CURRICULUM_DATA).find(
      (c) =>
        c.question === questionText ||
        questionText.includes(c.conceptName) ||
        (c.conceptName.includes('중위소득') && questionText.includes('중위소득')) ||
        (c.conceptName.includes('서류') && questionText.includes('서류')) ||
        (c.conceptName.includes('LTV') && questionText.includes('LTV')) ||
        (c.conceptName.includes('금리') && questionText.includes('금리')) ||
        (c.conceptName.includes('한도') && questionText.includes('한도')) ||
        (c.conceptName.includes('무주택') && questionText.includes('무주택')) ||
        (c.conceptName.includes('입주') && questionText.includes('입주')) ||
        (c.conceptName.includes('청약') && questionText.includes('청약')) ||
        (c.conceptName.includes('시세') && questionText.includes('시세')) ||
        (c.conceptName.includes('관리비') && questionText.includes('관리비')) ||
        (c.conceptName.includes('기초') && questionText.includes('기초')) ||
        (c.conceptName.includes('기간') && questionText.includes('기간'))
    );

    if (matchedCurriculum) {
      setTimeout(() => {
        triggerStep1Concept(questionText, matchedCurriculum, currentLevel);
      }, 400);
      return;
    }

    // If not matched directly in curriculum, attempt calling backend /api/chat with Gemini API!
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionText,
          knowledgeLevel: currentLevel,
          policyContext: policy,
          userData: userProfile,
          conversationHistory: messages.slice(-4).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.explanation && data.quizIfKnown) {
          // Construct custom curriculum item from Gemini JSON output!
          const dynamicCurriculum: CurriculumItem = {
            id: `gemini-${Date.now()}`,
            question: questionText,
            conceptName: data.conceptName || questionText,
            explanations: {
              '처음 알아보는 중이에요': data.explanation,
              '어느 정도 알고 있어요': data.explanation,
              '잘 알고 있어요': data.explanation
            },
            followUpConcept: data.followUpConcept || '관련 신청 꿀팁',
            followUpQuestion: data.followUpQuestion || `혹시 ${data.followUpConcept || '관련 신청 꿀팁'}에 대해서도 알고 계신가요?`,
            subExplanation: data.subExplanationIfNotKnown || '이 개념을 알아두시면 실제 주거 정책 신청 시 훨씬 유리해집니다!',
            quizzes: {
              '처음 알아보는 중이에요': {
                type: data.quizIfKnown.type || 'multiple_choice',
                question: data.quizIfKnown.question,
                options: data.quizIfKnown.options.map((opt: string, idx: number) => ({
                  text: opt,
                  isCorrect: idx === data.quizIfKnown.correctIndex
                })),
                explanation: data.quizIfKnown.explanation,
                oneLineSummary: data.quizIfKnown.oneLineSummary || data.explanation.slice(0, 50)
              },
              '어느 정도 알고 있어요': {
                type: data.quizIfKnown.type || 'multiple_choice',
                question: data.quizIfKnown.question,
                options: data.quizIfKnown.options.map((opt: string, idx: number) => ({
                  text: opt,
                  isCorrect: idx === data.quizIfKnown.correctIndex
                })),
                explanation: data.quizIfKnown.explanation,
                oneLineSummary: data.quizIfKnown.oneLineSummary || data.explanation.slice(0, 50)
              },
              '잘 알고 있어요': {
                type: data.quizIfKnown.type || 'multiple_choice',
                question: data.quizIfKnown.question,
                options: data.quizIfKnown.options.map((opt: string, idx: number) => ({
                  text: opt,
                  isCorrect: idx === data.quizIfKnown.correctIndex
                })),
                explanation: data.quizIfKnown.explanation,
                oneLineSummary: data.quizIfKnown.oneLineSummary || data.explanation.slice(0, 50)
              }
            }
          };

          triggerStep1Concept(questionText, dynamicCurriculum, currentLevel);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('API call fallback to default curriculum or smart responder', e);
    }

    // High quality intelligent fallback if custom API didn't respond
    setIsLoading(false);
    const fallbackCurriculum = CURRICULUM_DATA['중위소득이 뭔가요?'];
    triggerStep1Concept(questionText, fallbackCurriculum, currentLevel);
  };

  // STEP 2: Handle Tail Question Response [네, 알아요] vs [아니요, 몰라요]
  const handleTailAnswer = (answer: '네, 알아요' | '아니요, 몰라요', lastBotMsg: ChatMessage) => {
    const curriculum = lastBotMsg.curriculumItem;
    if (!curriculum) return;

    const currentLevel = knowledgeLevel || '처음 알아보는 중이에요';
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: answer,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, activeOptions: undefined })),
      userMsg
    ]);

    const targetQuiz = curriculum.quizzes[currentLevel];

    if (answer === '네, 알아요') {
      // [네, 알아요] -> "좋아요! 그럼 확인 차 퀴즈 하나 풀어볼까요? 😊" -> STEP 3
      setTimeout(() => {
        const botQuizMsg: ChatMessage = {
          id: `bot-quiz-${Date.now()}`,
          sender: 'bot',
          text: `좋아요! 그럼 확인 차 퀴즈 하나 풀어볼까요? 😊\n\n📝 퀴즈\n${targetQuiz.question}`,
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          curriculumItem: curriculum,
          quiz: targetQuiz,
          activeOptions: {
            type: 'quiz_choice',
            items: targetQuiz.options.map((o) => o.text),
            quizData: targetQuiz
          }
        };
        setMessages((prev) => [...prev, botQuizMsg]);
      }, 350);
    } else {
      // [아니요, 몰라요] -> 관련 개념 4~5문장 설명 후 -> "그럼 이 내용으로 퀴즈를 풀어볼까요? 😊" -> STEP 3
      setTimeout(() => {
        const botExplainAndQuizMsg: ChatMessage = {
          id: `bot-quiz-sub-${Date.now()}`,
          sender: 'bot',
          text: `${curriculum.subExplanation}\n\n그럼 이 내용으로 퀴즈를 풀어볼까요? 😊\n\n📝 퀴즈\n${targetQuiz.question}`,
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          curriculumItem: curriculum,
          quiz: targetQuiz,
          activeOptions: {
            type: 'quiz_choice',
            items: targetQuiz.options.map((o) => o.text),
            quizData: targetQuiz
          }
        };
        setMessages((prev) => [...prev, botExplainAndQuizMsg]);
      }, 350);
    }
  };

  // STEP 4: Handle Quiz Answer Selection -> STEP 4 Explanation
  const handleSelectQuizOption = (selectedOptionText: string, lastMsg: ChatMessage) => {
    const quiz = lastMsg.quiz;
    const curriculum = lastMsg.curriculumItem;
    if (!quiz || !curriculum) return;

    const chosenOption = quiz.options.find((o) => o.text === selectedOptionText);
    const isCorrect = chosenOption ? chosenOption.isCorrect : false;

    // Record quiz attempt
    const attempt: QuizAttempt = {
      questionText: quiz.question,
      selectedOption: selectedOptionText,
      isCorrect,
      conceptName: curriculum.conceptName
    };
    setQuizAttempts((prev) => [...prev, attempt]);

    // Record one line summary
    if (quiz.oneLineSummary && !oneLineSummaries.includes(quiz.oneLineSummary)) {
      setOneLineSummaries((prev) => [...prev, quiz.oneLineSummary]);
    }

    const userMsg: ChatMessage = {
      id: `user-quiz-ans-${Date.now()}`,
      sender: 'user',
      text: selectedOptionText,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, activeOptions: undefined })),
      userMsg
    ]);

    setTimeout(() => {
      const resultPrefix = isCorrect
        ? '정답이에요! 🎉 대단한데요!\n\n'
        : '아쉬워요, 오답이에요! 하지만 이번 기회에 확실히 짚고 넘어가면 돼요 😊\n\n';

      const fullExplanation = `${resultPrefix}${quiz.explanation}\n\n💡 한 줄 요약: ${quiz.oneLineSummary}\n\n다른 궁금한 점이 있으시다면 아래 빠른 질문을 누르시거나 직접 질문해 주세요!`;

      const botExplanationMsg: ChatMessage = {
        id: `bot-quiz-eval-${Date.now()}`,
        sender: 'bot',
        text: fullExplanation,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        quizResult: {
          isCorrect,
          explanation: quiz.explanation
        },
        activeOptions: {
          type: 'quick_question',
          items: policy.quickQuestions
        }
      };

      setMessages((prev) => [...prev, botExplanationMsg]);
    }, 400);
  };

  // [대화 종료하기] handler -> opens summary report
  const handleEndConversation = () => {
    // Generate recommended next steps based on user situation and selected policy
    const defaultSteps = [
      `${policy.officialSiteName}(${policy.officialUrl})에 접속하여 ${policy.name} 최신 공고문을 북마크하세요.`,
      `정부24 및 건강보험공단 앱에서 '주민등록등본'과 '건강보험료 납부확인서'를 미리 무료 발급해두세요.`
    ];

    if (userProfile.housingStatus === '곧 자취 예정' || userProfile.housingStatus === '부모님과 거주') {
      defaultSteps.push('이사 갈 방을 알아보기 전 은행 창구에서 청년 버팀목 대출 사전 상담을 받아보세요.');
    }

    setIsSummaryModalOpen(true);
  };

  const currentSummary: LearningSummary = {
    learnedConcepts: learnedConcepts.length > 0 ? learnedConcepts : [policy.name],
    quizzes: quizAttempts,
    oneLineSummaries:
      oneLineSummaries.length > 0
        ? oneLineSummaries
        : [`${policy.name}: ${policy.shortSummary}`],
    recommendedSteps: [
      `${policy.officialSiteName}(${policy.officialUrl})에서 최신 입주자 모집 공고를 확인하세요.`,
      `건강보험공단 앱(The 건강보험)에서 본인 건보료를 조회하여 기준 중위소득 충족 여부를 최종 검증하세요.`,
      `필요 서류(확정일자 임대차계약서, 주민등록등본, 월세 이체확인증)를 미리 PDF로 저장해두세요.`
    ]
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[750px] sm:h-[800px]">
      {/* Chatbot Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-[#1D9E75] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shadow-inner">
            🏠
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg tracking-tight">집톡 AI 안내원</h3>
              <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-100 rounded-full text-[10px] font-semibold border border-white/20">
                버전 3.0
              </span>
            </div>
            <p className="text-white/80 text-xs">
              현재 정책: <span className="font-semibold text-white">{policy.name}</span>
              {knowledgeLevel && (
                <span className="ml-1.5 opacity-90">({knowledgeLevel})</span>
              )}
            </p>
          </div>
        </div>

        {/* Header Action: 대화 종료하기 Button */}
        <button
          type="button"
          onClick={handleEndConversation}
          className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-white/20 cursor-pointer shadow-2xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>대화 종료하기</span>
        </button>
      </div>

      {/* Chat Message Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gray-50/50">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3 ${
                isBot ? 'justify-start' : 'justify-end'
              }`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-full bg-[#1D9E75] text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs text-xs font-bold">
                  집톡
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                {/* Speech Bubble */}
                <div
                  className={`rounded-2xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed shadow-2xs ${
                    isBot
                      ? 'bg-white border border-emerald-100 text-gray-800 rounded-tl-xs'
                      : 'bg-[#1D9E75] text-white rounded-tr-xs font-medium'
                  }`}
                >
                  {/* If message text contains 📝 퀴즈, format cleanly */}
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  <div
                    className={`mt-2 text-[10px] sm:text-[11px] text-right ${
                      isBot ? 'text-gray-400' : 'text-emerald-100'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {/* Interactive Action Buttons attached to this message */}
                {msg.activeOptions && (
                  <div className="pt-1">
                    {/* 1. Level Check Option Buttons */}
                    {msg.activeOptions.type === 'level_check' && (
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        {msg.activeOptions.items.map((levelText) => (
                          <button
                            key={levelText}
                            type="button"
                            onClick={() => handleSelectLevel(levelText as KnowledgeLevel)}
                            className="px-4 py-2.5 bg-white hover:bg-emerald-50 border border-emerald-200 hover:border-[#1D9E75] text-[#1D9E75] rounded-xl text-xs sm:text-sm font-bold shadow-2xs transition-all text-center cursor-pointer"
                          >
                            {levelText}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* 2. Tail Question Y/N Buttons */}
                    {msg.activeOptions.type === 'tail_yn' && (
                      <div className="flex gap-2.5 mt-2">
                        <button
                          type="button"
                          onClick={() => handleTailAnswer('네, 알아요', msg)}
                          className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer text-center"
                        >
                          네, 알아요 👍
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTailAnswer('아니요, 몰라요', msg)}
                          className="flex-1 py-2.5 px-4 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold shadow-2xs transition-colors cursor-pointer text-center"
                        >
                          아니요, 몰라요 🤔
                        </button>
                      </div>
                    )}

                    {/* 3. Quiz Options Buttons (Clicking directly answers) */}
                    {msg.activeOptions.type === 'quiz_choice' && (
                      <div className="space-y-2 mt-2 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200">
                        <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>선택지를 클릭하면 바로 해설로 넘어갑니다:</span>
                        </div>
                        {msg.activeOptions.items.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectQuizOption(opt, msg)}
                            className="w-full text-left p-3 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-[#1D9E75] rounded-xl text-xs sm:text-sm font-semibold text-gray-800 transition-all shadow-2xs cursor-pointer flex items-center justify-between"
                          >
                            <span>{opt}</span>
                            <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-400 group-hover:border-[#1D9E75]">
                              {oIdx + 1}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* 4. Quick Question Buttons */}
                    {msg.activeOptions.type === 'quick_question' && (
                      <div className="mt-3">
                        <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-[#1D9E75]" />
                          <span>추천 빠른 질문:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {msg.activeOptions.items.map((q) => (
                            <button
                              key={q}
                              type="button"
                              onClick={() => handleAskQuestion(q)}
                              className="px-3.5 py-2 bg-white hover:bg-emerald-50 border border-emerald-200 hover:border-[#1D9E75] text-[#1D9E75] rounded-xl text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1D9E75] text-white flex items-center justify-center shrink-0 text-xs font-bold">
              집톡
            </div>
            <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-2xs flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <Loader2 className="w-4 h-4 text-[#1D9E75] animate-spin" />
              <span>집톡이 답변과 퀴즈를 준비하고 있어요...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions Sticky Ribbon (Always accessible) */}
      <div className="bg-emerald-50/50 border-t border-emerald-100 px-4 py-2.5 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-bold text-emerald-800 shrink-0">빠른 질문:</span>
        {policy.quickQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => handleAskQuestion(q)}
            className="px-3 py-1 bg-white hover:bg-emerald-50 border border-emerald-200 text-[#1D9E75] rounded-full text-xs font-semibold shrink-0 cursor-pointer shadow-2xs hover:border-[#1D9E75] transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-gray-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskQuestion(inputQuery);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="궁금한 주거 정책 용어나 신청 조건을 질문해보세요 (예: 중위소득이 뭐야?)"
            className="flex-1 bg-gray-50 border border-gray-300 focus:border-[#1D9E75] focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-hidden text-gray-800 placeholder-gray-400 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              inputQuery.trim() && !isLoading
                ? 'bg-[#1D9E75] hover:bg-[#168260] text-white shadow-xs cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        {/* Bottom Bar: Mandatory [대화 종료하기] Button */}
        <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>💡 챗봇과 대화하며 개념을 익히고 퀴즈를 풀어보세요.</span>
          <button
            type="button"
            onClick={handleEndConversation}
            className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer hover:underline"
          >
            <Award className="w-3.5 h-3.5" />
            <span>[대화 종료하기] & 학습 리포트 보기</span>
          </button>
        </div>
      </div>

      {/* Learning Summary Report Modal */}
      <LearningSummaryModal
        isOpen={isSummaryModalOpen}
        summary={currentSummary}
        onClose={() => setIsSummaryModalOpen(false)}
        onRestartChat={() => setIsSummaryModalOpen(false)}
      />
    </div>
  );
};
