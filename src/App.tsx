import React, { useState } from 'react';
import { UserProfile, Policy } from './types.ts';
import { POLICIES } from './data/policies.ts';
import { StepProgressBar } from './components/StepProgressBar.tsx';
import { Step1BasicInfo } from './components/Step1BasicInfo.tsx';
import { Step2IncomeInfo } from './components/Step2IncomeInfo.tsx';
import { Step3Recommendations } from './components/Step3Recommendations.tsx';
import { Step4PolicyDetail } from './components/Step4PolicyDetail.tsx';
import { Home, Sparkles, RefreshCw, ExternalLink, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Default preselected state for smooth user experience, yet easy to change
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: '25~29세',
    region: '서울',
    housingStatus: '자취 중 (월세)',
    incomeSource: '아르바이트',
    monthlyIncome: '100~200만 원',
    independentStatus: '따로 살아요'
  });

  const [selectedPolicy, setSelectedPolicy] = useState<Policy>(POLICIES[0]);

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  const canNavigateTo = (step: number) => {
    if (step === 1) return true;
    if (step === 2) return Boolean(userProfile.age && userProfile.region && userProfile.housingStatus);
    if (step === 3)
      return Boolean(
        userProfile.age &&
          userProfile.region &&
          userProfile.housingStatus &&
          userProfile.incomeSource &&
          userProfile.monthlyIncome &&
          userProfile.independentStatus
      );
    if (step === 4) return Boolean(selectedPolicy);
    return false;
  };

  const handleReset = () => {
    setUserProfile({
      age: undefined,
      region: undefined,
      housingStatus: undefined,
      incomeSource: undefined,
      monthlyIncome: undefined,
      independentStatus: undefined
    });
    setCurrentStep(1);
    setSelectedPolicy(POLICIES[0]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-gray-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1D9E75] to-[#25b889] text-white flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform">
              🏠
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-gray-900 tracking-tight group-hover:text-[#1D9E75] transition-colors">
                  집톡
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#1D9E75]">
                  v3.0
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
                청년 주거지원 정책 맞춤 안내 & 학습형 AI 챗봇
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="조건 초기화"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">처음부터 다시하기</span>
            </button>

            <a
              href="https://housing.seoul.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-semibold text-[#1D9E75] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl flex items-center gap-1 transition-colors"
            >
              <span>서울주거포털</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* 4-Step Progress Navigation Bar */}
      <StepProgressBar
        currentStep={currentStep}
        onSelectStep={(step) => setCurrentStep(step)}
        canNavigateTo={canNavigateTo}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentStep === 1 && (
          <Step1BasicInfo
            userProfile={userProfile}
            onChangeProfile={handleUpdateProfile}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2IncomeInfo
            userProfile={userProfile}
            onChangeProfile={handleUpdateProfile}
            onPrev={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <Step3Recommendations
            userProfile={userProfile}
            onSelectPolicy={(policy) => {
              setSelectedPolicy(policy);
              setCurrentStep(4);
            }}
            onPrev={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <Step4PolicyDetail
            policy={selectedPolicy}
            userProfile={userProfile}
            onBackToRecommendations={() => setCurrentStep(3)}
            onSelectAnotherPolicy={(p) => setSelectedPolicy(p)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 px-4 text-xs text-gray-500 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-bold text-gray-800 flex items-center justify-center md:justify-start gap-1 mb-1">
              <span>집톡 🏠 청년 주거지원 정책 맞춤 안내</span>
              <span className="text-emerald-700 font-semibold">• 버전 3.0</span>
            </div>
            <p className="text-gray-400">
              정책 조건은 정부 및 지자체 공고에 따라 변경될 수 있으므로 최종 자격 여부는 공식 포털에서 확인하세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-gray-600">
            <a
              href="https://housing.seoul.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D9E75] hover:underline"
            >
              서울주거포털
            </a>
            <span>•</span>
            <a
              href="https://www.bokjiro.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D9E75] hover:underline"
            >
              복지로
            </a>
            <span>•</span>
            <a
              href="https://apply.lh.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D9E75] hover:underline"
            >
              LH 청약플러스
            </a>
            <span>•</span>
            <a
              href="https://enhuf.molit.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D9E75] hover:underline"
            >
              기금e든든 (버팀목)
            </a>
            <span>•</span>
            <a
              href="https://www.myhome.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D9E75] hover:underline"
            >
              마이홈
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
