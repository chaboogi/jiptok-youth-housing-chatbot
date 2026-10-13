import React, { useState } from 'react';
import { Policy, UserProfile } from '../types.ts';
import { POLICIES, checkIncomeEligibilityBadge, getMedianIncomePercentText } from '../data/policies.ts';
import { Sparkles, MapPin, Building, ChevronRight, Filter, ArrowLeft, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Step3RecommendationsProps {
  userProfile: UserProfile;
  onSelectPolicy: (policy: Policy) => void;
  onPrev: () => void;
}

export const Step3Recommendations: React.FC<Step3RecommendationsProps> = ({
  userProfile,
  onSelectPolicy,
  onPrev
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'high_match' | 'rent' | 'loan' | 'public'>('all');

  const incomeGuidance = getMedianIncomePercentText(userProfile.monthlyIncome);

  // Compute badges and scores for all policies
  const policyCards = POLICIES.map((policy) => {
    const { badge, reason, isHighMatch } = checkIncomeEligibilityBadge(policy, userProfile);
    return {
      policy,
      badge,
      reason,
      isHighMatch
    };
  });

  // Filter policies based on active tab
  const filteredCards = policyCards.filter(({ policy, isHighMatch }) => {
    if (filterTab === 'high_match') return isHighMatch;
    if (filterTab === 'rent') return policy.name.includes('월세') || policy.name.includes('장학');
    if (filterTab === 'loan') return policy.name.includes('대출') || policy.name.includes('버팀목');
    if (filterTab === 'public') return policy.name.includes('주택');
    return true;
  });

  // Count high match
  const matchCount = policyCards.filter((c) => c.isHighMatch).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#1D9E75] text-xs font-semibold rounded-full mb-2 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>3단계 맞춤 정책 추천</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          내 조건에 맞는 추천 주거 정책 7선 🎯
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          자세히 알아보고 싶은 카드를 클릭하면 상세 안내 및 1:1 맞춤 학습 챗봇이 시작됩니다!
        </p>
      </div>

      {/* User Summary Pill Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="font-bold text-emerald-900">내 선택 조건:</span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-emerald-200 text-gray-800 font-semibold shadow-2xs">
            {userProfile.age || '연령 미입력'}
          </span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-emerald-200 text-gray-800 font-semibold shadow-2xs">
            {userProfile.region || '지역 미입력'}
          </span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-emerald-200 text-gray-800 font-semibold shadow-2xs">
            {userProfile.housingStatus || '주거상태 미입력'}
          </span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-emerald-200 text-emerald-700 font-semibold shadow-2xs">
            월 {userProfile.monthlyIncome || '소득 미입력'} ({incomeGuidance.percentText})
          </span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-emerald-200 text-gray-800 font-semibold shadow-2xs">
            {userProfile.independentStatus || '독립여부 미입력'}
          </span>
        </div>

        <div className="shrink-0 text-xs sm:text-sm text-emerald-800 font-bold bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#1D9E75]" />
          <span>조건 충족 정책 {matchCount}개 발견!</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        <button
          type="button"
          onClick={() => setFilterTab('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
            filterTab === 'all'
              ? 'bg-[#1D9E75] text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
          }`}
        >
          전체 보기 (7)
        </button>
        <button
          type="button"
          onClick={() => setFilterTab('high_match')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
            filterTab === 'high_match'
              ? 'bg-[#1D9E75] text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
          }`}
        >
          <span>✅ 내 조건 해당만 ({matchCount})</span>
        </button>
        <button
          type="button"
          onClick={() => setFilterTab('rent')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
            filterTab === 'rent'
              ? 'bg-[#1D9E75] text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
          }`}
        >
          월세 지원 (3)
        </button>
        <button
          type="button"
          onClick={() => setFilterTab('loan')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
            filterTab === 'loan'
              ? 'bg-[#1D9E75] text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
          }`}
        >
          전세·보증금 대출 (1)
        </button>
        <button
          type="button"
          onClick={() => setFilterTab('public')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
            filterTab === 'public'
              ? 'bg-[#1D9E75] text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
          }`}
        >
          공공임대 주택 (3)
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCards.map(({ policy, badge, reason, isHighMatch }) => {
          const isEligible = badge === '✅ 내 조건에 해당';

          return (
            <div
              key={policy.id}
              onClick={() => onSelectPolicy(policy)}
              className="bg-white rounded-2xl border border-gray-200 hover:border-[#1D9E75] p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group relative"
            >
              <div>
                {/* Badges Top Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  {/* Seoul vs Nationwide Badge */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      policy.scope === '서울시'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    {policy.scope}
                  </span>

                  {/* Income Eligibility Badge (Mandatory: ✅ 내 조건에 해당 / ⚠️ 조건 확인 필요) */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      isEligible
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 ring-1 ring-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {badge}
                  </span>
                </div>

                {/* Policy Name */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1D9E75] transition-colors flex items-center justify-between">
                  <span>{policy.name}</span>
                </h3>

                {/* One line summary */}
                <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                  {policy.shortSummary}
                </p>

                {/* Support Amount or Benefit Box */}
                <div className="mt-4 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                    지원 금액 및 핵심 혜택
                  </div>
                  <div className="text-sm font-bold text-emerald-900 mt-0.5">
                    {policy.benefit}
                  </div>
                </div>

                {/* Target Audience */}
                <div className="mt-3 text-xs text-gray-500 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{policy.targetAudience}</span>
                </div>
              </div>

              {/* Bottom Reason & Call to action */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500 truncate max-w-[200px]" title={reason}>
                  {reason}
                </span>
                <span className="text-[#1D9E75] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                  <span>상세 보기</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-8">
          <Info className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-base font-semibold text-gray-700">
            선택한 필터 조건에 해당하는 정책이 없습니다.
          </p>
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className="mt-3 px-4 py-2 bg-emerald-50 text-[#1D9E75] rounded-xl text-sm font-bold hover:bg-emerald-100"
          >
            전체 정책 보기
          </button>
        </div>
      )}

      {/* Prev / Back Button */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>이전 단계 (소득 정보 수정)</span>
        </button>

        <p className="text-xs text-gray-400">
          원하는 정책 카드를 누르면 상세 안내와 AI 챗봇으로 바로 이동해요!
        </p>
      </div>
    </div>
  );
};
