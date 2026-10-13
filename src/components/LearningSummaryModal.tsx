import React from 'react';
import { LearningSummary } from '../types.ts';
import { CheckCircle2, XCircle, Award, BookOpen, Lightbulb, Compass, RotateCcw, X } from 'lucide-react';

interface LearningSummaryModalProps {
  summary: LearningSummary;
  isOpen: boolean;
  onClose: () => void;
  onRestartChat: () => void;
}

export const LearningSummaryModal: React.FC<LearningSummaryModalProps> = ({
  summary,
  isOpen,
  onClose,
  onRestartChat
}) => {
  if (!isOpen) return null;

  const totalQuizzes = summary.quizzes.length;
  const correctCount = summary.quizzes.filter((q) => q.isCorrect).length;
  const accuracy = totalQuizzes > 0 ? Math.round((correctCount / totalQuizzes) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1D9E75] to-[#147a5a] text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>학습 완료 리포트</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            📋 오늘의 학습 요약
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-1">
            집톡과 함께 청년 주거 정책 핵심 개념을 똑똑하게 마스터하셨어요!
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Section 1: 오늘 배운 개념 */}
          <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-[#1D9E75]" />
              <span>✅ 오늘 배운 개념</span>
            </h3>
            {summary.learnedConcepts.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {summary.learnedConcepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold rounded-xl shadow-2xs"
                  >
                    #{concept}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                아직 학습한 개념이 없습니다. 챗봇 질문 버튼을 눌러보세요!
              </p>
            )}
          </div>

          {/* Section 2: 퀴즈 결과 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>📝 퀴즈 결과</span>
              </h3>
              <div className="text-xs sm:text-sm font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                총 {totalQuizzes}문제 중 {correctCount}개 정답 (정답률 {accuracy}%)
              </div>
            </div>

            {totalQuizzes > 0 ? (
              <div className="space-y-3">
                {summary.quizzes.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/70 text-xs sm:text-sm space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-gray-800">
                        {idx + 1}. {q.questionText}
                      </span>
                      <span className="shrink-0 flex items-center gap-1 font-bold">
                        {q.isCorrect ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> 정답
                          </span>
                        ) : (
                          <span className="text-rose-500 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> 오답
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="text-gray-500 text-[11px] sm:text-xs">
                      내 답변: <span className="font-medium text-gray-700">{q.selectedOption}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                아직 풀어본 퀴즈가 없습니다. 챗봇 질문을 진행하면 퀴즈가 출제됩니다!
              </p>
            )}
          </div>

          {/* Section 3: 한 줄 정리 */}
          <div className="bg-amber-50/40 rounded-2xl p-5 border border-amber-200/60">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>💡 한 줄 정리</span>
            </h3>
            {summary.oneLineSummaries.length > 0 ? (
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                {summary.oneLineSummaries.map((summaryText, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#1D9E75] font-bold">•</span>
                    <span className="leading-relaxed">{summaryText}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500">
                학습을 진행하시면 핵심 개념의 한 줄 요약이 이곳에 모입니다.
              </p>
            )}
          </div>

          {/* Section 4: 추천 다음 단계 */}
          <div className="bg-sky-50/60 rounded-2xl p-5 border border-sky-200">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-sky-600" />
              <span>🏠 추천 다음 단계</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              {summary.recommendedSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onRestartChat}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs sm:text-sm hover:bg-gray-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>대화 계속하기</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1D9E75] hover:bg-[#168260] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
