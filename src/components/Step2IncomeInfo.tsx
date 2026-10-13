import React from 'react';
import { IncomeSource, MonthlyIncome, IndependentStatus, UserProfile } from '../types.ts';
import { Wallet, Sparkles, ArrowRight, ArrowLeft, Check, HelpCircle } from 'lucide-react';

interface Step2IncomeInfoProps {
  userProfile: UserProfile;
  onChangeProfile: (updates: Partial<UserProfile>) => void;
  onPrev: () => void;
  onNext: () => void;
}

const INCOME_SOURCE_OPTIONS: { label: IncomeSource; desc: string; icon: string }[] = [
  { label: '소득 없음', desc: '현재 취업준비 중이거나 학업에 집중하고 있어요', icon: '🌱' },
  { label: '아르바이트', desc: '파트타임 또는 단기 아르바이트로 소득이 발생해요', icon: '☕' },
  { label: '직장', desc: '정규직 또는 계약직 직장인으로 4대보험에 가입되어 있어요', icon: '💼' },
  { label: '프리랜서', desc: '자유직업 또는 3.3% 사업소득 원천징수 대상자예요', icon: '💻' }
];

const MONTHLY_INCOME_OPTIONS: { label: MonthlyIncome; medianRatio: string; tip: string }[] = [
  { label: '50만 원 이하', medianRatio: '중위소득 약 20%', tip: '기초·차상위 및 청년월세 1순위 최우선 혜택 구간' },
  { label: '50~100만 원', medianRatio: '중위소득 약 35%', tip: '국토부 청년월세(60% 이하) 및 청년임대 추천' },
  { label: '100~200만 원', medianRatio: '중위소득 약 65%', tip: '서울시 청년월세(150% 이하) 및 행복주택 적합' },
  { label: '200~300만 원', medianRatio: '중위소득 약 110%', tip: '버팀목 전세대출(연 5천 이하) 및 안심주택 적합' },
  { label: '300만 원 이상', medianRatio: '중위소득 약 145%+', tip: '버팀목 전세대출 및 민간임대 우선 검토' },
  { label: '잘 모르겠어요', medianRatio: '건보료 확인 필요', tip: '건강보험료 납부확인서로 나중에 쉽게 확인 가능' }
];

const INDEPENDENT_OPTIONS: { label: IndependentStatus; desc: string; icon: string }[] = [
  { label: '따로 살아요', desc: '주민등록등본상 이미 부모님과 분리되어 단독 세대주예요', icon: '🏡' },
  { label: '함께 살아요', desc: '현재 부모님 댁에 함께 전입되어 세대원으로 거주해요', icon: '👨‍👩‍👧‍👦' },
  { label: '곧 따로 살 예정', desc: '이사 준비 중이며 이사 당일 단독 세대주로 분리 예정이에요', icon: '🚚' }
];

export const Step2IncomeInfo: React.FC<Step2IncomeInfoProps> = ({
  userProfile,
  onChangeProfile,
  onPrev,
  onNext
}) => {
  const isComplete = Boolean(
    userProfile.incomeSource && userProfile.monthlyIncome && userProfile.independentStatus
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#1D9E75] text-xs font-semibold rounded-full mb-2 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>2단계 소득 & 독립 정보 입력</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          소득과 독립 형태를 알려주세요 💰
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          청년 주거 정책은 중위소득 및 가구 분리 여부에 따라 지원 금액과 당첨 순위가 달라져요.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 sm:p-8 space-y-8">
        {/* 1. 소득 경로 선택 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#1D9E75] text-xs font-bold flex items-center justify-center">
                1
              </span>
              소득 경로 선택 <span className="text-xs text-emerald-700 font-normal">(1개 선택)</span>
            </label>
            {userProfile.incomeSource && (
              <span className="text-xs font-medium text-[#1D9E75] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 선택완료
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INCOME_SOURCE_OPTIONS.map(({ label, desc, icon }) => {
              const isSelected = userProfile.incomeSource === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => onChangeProfile({ incomeSource: label })}
                  className={`text-left p-4 rounded-xl border transition-all duration-150 flex items-start justify-between ${
                    isSelected
                      ? 'border-[#1D9E75] bg-emerald-50 text-gray-900 ring-2 ring-[#1D9E75]/30 shadow-xs'
                      : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{icon}</span>
                    <div>
                      <div className="font-bold text-base text-gray-900">{label}</div>
                      <div className="text-xs text-gray-500 mt-1">{desc}</div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#1D9E75] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 월 소득 선택 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#1D9E75] text-xs font-bold flex items-center justify-center">
                2
              </span>
              월 소득 선택 <span className="text-xs text-emerald-700 font-normal">(1개 선택)</span>
            </label>
            {userProfile.monthlyIncome && (
              <span className="text-xs font-medium text-[#1D9E75] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 선택완료
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MONTHLY_INCOME_OPTIONS.map(({ label, medianRatio, tip }) => {
              const isSelected = userProfile.monthlyIncome === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => onChangeProfile({ monthlyIncome: label })}
                  className={`text-left p-4 rounded-xl border transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#1D9E75] bg-emerald-50 text-gray-900 ring-2 ring-[#1D9E75]/30 shadow-xs'
                      : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="font-bold text-base text-gray-900">{label}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                        isSelected
                          ? 'bg-[#1D9E75] text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {medianRatio}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{tip}</div>
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 p-2.5 rounded-lg">
            <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              2025~2026년 대한민국 1인 가구 기준 중위소득(100%)은 약 239만 원입니다.
            </span>
          </div>
        </div>

        {/* 3. 부모님 독립 여부 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#1D9E75] text-xs font-bold flex items-center justify-center">
                3
              </span>
              부모님 독립 여부 <span className="text-xs text-emerald-700 font-normal">(1개 선택)</span>
            </label>
            {userProfile.independentStatus && (
              <span className="text-xs font-medium text-[#1D9E75] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 선택완료
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {INDEPENDENT_OPTIONS.map(({ label, desc, icon }) => {
              const isSelected = userProfile.independentStatus === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => onChangeProfile({ independentStatus: label })}
                  className={`text-left p-4 rounded-xl border transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#1D9E75] bg-emerald-50 text-gray-900 ring-2 ring-[#1D9E75]/30 shadow-xs'
                      : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{icon}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#1D9E75] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-base text-gray-900">{label}</div>
                    <div className="text-xs text-gray-500 mt-1 leading-snug">{desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>이전 단계 (기본 정보)</span>
          </button>

          <button
            type="button"
            disabled={!isComplete}
            onClick={onNext}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
              isComplete
                ? 'bg-[#1D9E75] hover:bg-[#168260] text-white cursor-pointer hover:shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>다음 단계 (맞춤 정책 추천)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
