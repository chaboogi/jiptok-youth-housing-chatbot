import React from 'react';
import { Policy, UserProfile } from '../types.ts';
import { getMedianIncomePercentText, POLICIES, checkIncomeEligibilityBadge } from '../data/policies.ts';
import { ChatbotWindow } from './ChatbotWindow.tsx';
import {
  ArrowLeft,
  MapPin,
  ExternalLink,
  AlertTriangle,
  Building,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

interface Step4PolicyDetailProps {
  policy: Policy;
  userProfile: UserProfile;
  onBackToRecommendations: () => void;
  onSelectAnotherPolicy: (policy: Policy) => void;
}

export const Step4PolicyDetail: React.FC<Step4PolicyDetailProps> = ({
  policy,
  userProfile,
  onBackToRecommendations,
  onSelectAnotherPolicy
}) => {
  const incomeGuidance = getMedianIncomePercentText(userProfile.monthlyIncome);
  const eligibility = checkIncomeEligibilityBadge(policy, userProfile);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Top Navigation & Policy Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToRecommendations}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#1D9E75] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>추천 정책 목록으로 돌아가기</span>
        </button>

        {/* Quick policy switcher dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">다른 정책 바로보기:</span>
          <select
            value={policy.id}
            onChange={(e) => {
              const nextPolicy = POLICIES.find((p) => p.id === e.target.value);
              if (nextPolicy) onSelectAnotherPolicy(nextPolicy);
            }}
            className="text-xs sm:text-sm font-semibold bg-white border border-gray-300 rounded-xl px-3 py-1.5 focus:outline-hidden focus:border-[#1D9E75] text-gray-800 cursor-pointer shadow-2xs"
          >
            {POLICIES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.scope})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mandatory Top Notice Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-[#1D9E75] text-white p-4 sm:p-5 rounded-2xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📌</span>
          <p className="text-sm sm:text-base font-bold tracking-tight">
            선택한 정책을 자세히 알아보고, 챗봇과 함께 관련 개념을 학습해보세요!
          </p>
        </div>
      </div>

      {/* Policy Header Box */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                policy.scope === '서울시'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-purple-50 text-purple-700 border border-purple-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {policy.scope}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                eligibility.badge === '✅ 내 조건에 해당'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-50 text-amber-800 border border-amber-300'
              }`}
            >
              {eligibility.badge}
            </span>
          </div>

          <a
            href={policy.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
          >
            <span>공식 사이트 ({policy.officialSiteName})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {policy.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
            {policy.shortSummary}
          </p>
        </div>

        {/* Highlight Benefit */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-emerald-800">핵심 혜택</span>
            <div className="text-base sm:text-lg font-bold text-emerald-950">
              {policy.benefit}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            대상: <span className="font-semibold text-gray-700">{policy.targetAudience}</span>
          </div>
        </div>

        {/* Policy Detail Table (지원 내용 / 지원 기간 / 소득 기준 / 신청 방법 / 주의사항) */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#1D9E75]" />
            <span>정책 상세 정보 표</span>
          </h2>

          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-gray-200">
                {/* 1. 지원 내용 */}
                <tr className="flex flex-col sm:table-row">
                  <th className="sm:w-36 bg-gray-50/80 p-4 text-xs sm:text-sm font-bold text-gray-700 border-b sm:border-b-0 sm:border-r border-gray-200 shrink-0">
                    지원 내용
                  </th>
                  <td className="p-4 text-xs sm:text-sm text-gray-800 leading-relaxed">
                    {policy.detailSupport}
                  </td>
                </tr>

                {/* 2. 지원 기간 */}
                <tr className="flex flex-col sm:table-row">
                  <th className="sm:w-36 bg-gray-50/80 p-4 text-xs sm:text-sm font-bold text-gray-700 border-b sm:border-b-0 sm:border-r border-gray-200 shrink-0">
                    지원 기간
                  </th>
                  <td className="p-4 text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                    {policy.period}
                  </td>
                </tr>

                {/* 3. 소득 기준 (With Mandatory Personalized Income Note) */}
                <tr className="flex flex-col sm:table-row bg-emerald-50/30">
                  <th className="sm:w-36 bg-emerald-100/50 p-4 text-xs sm:text-sm font-bold text-emerald-900 border-b sm:border-b-0 sm:border-r border-emerald-200 shrink-0">
                    소득 기준
                  </th>
                  <td className="p-4 text-xs sm:text-sm text-gray-800 leading-relaxed space-y-2.5">
                    {/* Mandatory Personalized Income Guide */}
                    <div className="p-3 bg-white rounded-xl border-2 border-[#1D9E75] shadow-xs">
                      <div className="text-xs font-bold text-[#1D9E75] flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>개인화 소득 분석 결과</span>
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-gray-900">
                        {userProfile.monthlyIncome && userProfile.monthlyIncome !== '잘 모르겠어요' ? (
                          `"내 월 소득(${userProfile.monthlyIncome} 기준)은 기준 중위소득 약 ${incomeGuidance.percentText}에 해당합니다."`
                        ) : (
                          `"내 월 소득(미확인 기준)은 국민건강보험료 납부확인서를 통해 기준 중위소득 해당 비율을 확인하실 수 있습니다."`
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {incomeGuidance.fullGuide}
                      </p>
                    </div>

                    <div className="text-gray-700">
                      <span className="font-semibold text-gray-900">정책 공식 기준: </span>
                      {policy.incomeCriteria}
                    </div>
                  </td>
                </tr>

                {/* 4. 신청 방법 */}
                <tr className="flex flex-col sm:table-row">
                  <th className="sm:w-36 bg-gray-50/80 p-4 text-xs sm:text-sm font-bold text-gray-700 border-b sm:border-b-0 sm:border-r border-gray-200 shrink-0">
                    신청 방법
                  </th>
                  <td className="p-4 text-xs sm:text-sm text-gray-800 leading-relaxed">
                    <p>{policy.applicationMethod}</p>
                    <a
                      href={policy.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold mt-1 text-xs"
                    >
                      <span>{policy.officialSiteName} 바로가기</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>

                {/* 5. 주의사항 */}
                <tr className="flex flex-col sm:table-row">
                  <th className="sm:w-36 bg-gray-50/80 p-4 text-xs sm:text-sm font-bold text-gray-700 border-b sm:border-b-0 sm:border-r border-gray-200 shrink-0">
                    주의사항
                  </th>
                  <td className="p-4 text-xs sm:text-sm text-gray-800 leading-relaxed">
                    <ul className="space-y-1.5">
                      {policy.cautions.map((caution, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{caution}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Visual Divider / Spacing between Table and Chatbot */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-dashed border-emerald-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#f8faf9] px-4 py-1 text-xs font-bold text-[#1D9E75] rounded-full border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
            <span>💬 아래 집톡 AI 챗봇과 함께 실시간 개념 학습 & 퀴즈 풀기</span>
          </span>
        </div>
      </div>

      {/* AI Chatbot Window Area */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>AI 챗봇 "집톡" 1:1 맞춤 학습</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-[#1D9E75] rounded-full text-xs font-semibold">
              학습형
            </span>
          </h2>
          <p className="text-xs text-gray-400 hidden sm:block">
            궁금한 점을 누르면 개념 설명 → 꼬리질문 → 퀴즈 → 해설로 이어집니다.
          </p>
        </div>

        <ChatbotWindow policy={policy} userProfile={userProfile} />
      </div>
    </div>
  );
};
