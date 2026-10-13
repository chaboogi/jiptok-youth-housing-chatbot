import React from 'react';
import { AgeGroup, Region, HousingStatus, UserProfile } from '../types.ts';
import { Sparkles, MapPin, Home, ArrowRight, Check } from 'lucide-react';

interface Step1BasicInfoProps {
  userProfile: UserProfile;
  onChangeProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

const AGE_OPTIONS: AgeGroup[] = ['19~24세', '25~29세', '30~34세', '35~39세'];

const REGION_OPTIONS: { label: Region; tip: string }[] = [
  { label: '서울', tip: '서울시 청년월세, 청년안심주택 등 서울 특화 혜택 대상' },
  { label: '경기·인천', tip: '수도권 버팀목 대출(3억 이하) 및 행복주택 공급' },
  { label: '지방 광역시', tip: '부산·대구·인천·광주·대전·울산 등 전국 청년 정책' },
  { label: '기타 지방', tip: '전국 국토부 월세, 버팀목, LH 매입임대 대상' }
];

const HOUSING_OPTIONS: { label: HousingStatus; tip: string; icon: string }[] = [
  { label: '자취 중 (월세)', tip: '매월 나가는 월세 지원 및 안심주택 대상', icon: '🚪' },
  { label: '자취 중 (전세)', tip: '2.2%대 청년 버팀목 전세대출 갈아타기 추천', icon: '🔑' },
  { label: '기숙사 거주 중', tip: '한국장학재단 주거장학금 및 청년임대 추천', icon: '🏫' },
  { label: '부모님과 거주', tip: '독립 예정자를 위한 예비 세대주 대출/공공임대', icon: '👨‍👩‍👧' },
  { label: '곧 자취 예정', tip: '독립 전 보증금 마련 및 월세 지원 사전 준비', icon: '📦' }
];

export const Step1BasicInfo: React.FC<Step1BasicInfoProps> = ({
  userProfile,
  onChangeProfile,
  onNext
}) => {
  const isComplete = Boolean(
    userProfile.age && userProfile.region && userProfile.housingStatus
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#1D9E75] text-xs font-semibold rounded-full mb-2 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>1단계 기본 정보 입력</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          반가워요! 주거 상황을 알려주세요 🏠
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          선택하신 조건에 맞춰 신청 가능한 서울시 및 전국 청년 주거 정책을 쏙쏙 찾아드립니다.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 sm:p-8 space-y-8">
        {/* 1. 나이 선택 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#1D9E75] text-xs font-bold flex items-center justify-center">
                1
              </span>
              나이 선택 <span className="text-xs text-emerald-700 font-normal">(1개 선택)</span>
            </label>
            {userProfile.age && (
              <span className="text-xs font-medium text-[#1D9E75] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 선택완료
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AGE_OPTIONS.map((age) => {
              const isSelected = userProfile.age === age;
              return (
                <button
                  key={age}
                  type="button"
                  onClick={() => onChangeProfile({ age })}
                  className={`py-3.5 px-4 rounded-xl border text-sm sm:text-base font-semibold transition-all duration-150 flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'border-[#1D9E75] bg-emerald-50 text-[#1D9E75] ring-2 ring-[#1D9E75]/30 shadow-xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-gray-50'
                  }`}
                >
                  <span>{age}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#1D9E75]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 거주 지역 선택 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#1D9E75] text-xs font-bold flex items-center justify-center">
                2
              </span>
              거주 지역 선택 <span className="text-xs text-emerald-700 font-normal">(1개 선택)</span>
            </label>
            {userProfile.region && (
              <span className="text-xs font-medium text-[#1D9E75] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 선택완료
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REGION_OPTIONS.map(({ label, tip }) => {
              const isSelected = userProfile.region === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => onChangeProfile({ region: label })}
                  className={`text-left p-4 rounded-xl border transition-all duration-150 flex items-start justify-between ${
                    isSelected
                      ? 'border-[#1D9E75] bg-emerald-50 text-gray-900 ring-2 ring-[#1D9E75]/30 shadow-xs'
                      : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin
                      className={`w-5 h-5 mt-0.5 shrink-0 ${
                        isSelected ? 'text-[#1D9E75]' : 'text-gray-400'
                      }`}
                    />
                    <div>
                      <div className="font-bold text-base text-gray-900">{label}</div>
                      <div className="text-xs text-gray-500 mt-1">{tip}</div>
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

        {/* 3. 주거 상황 선택 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#1D9E75] text-xs font-bold flex items-center justify-center">
                3
              </span>
              주거 상황 선택 <span className="text-xs text-emerald-700 font-normal">(1개 선택)</span>
            </label>
            {userProfile.housingStatus && (
              <span className="text-xs font-medium text-[#1D9E75] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 선택완료
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOUSING_OPTIONS.map(({ label, tip, icon }) => {
              const isSelected = userProfile.housingStatus === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => onChangeProfile({ housingStatus: label })}
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
                      <div className="text-xs text-gray-500 mt-1">{tip}</div>
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

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            {isComplete ? (
              <span className="text-emerald-700 font-medium">
                모든 항목이 입력되었습니다. 다음 단계(소득 정보)로 넘어가볼까요?
              </span>
            ) : (
              <span>세 가지 항목을 모두 클릭하여 선택해주세요.</span>
            )}
          </p>
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
            <span>다음 단계 (소득 정보)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
