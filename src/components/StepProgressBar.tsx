import { User, Wallet, Sparkles, MessageSquare } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number; // 1, 2, 3, 4
  onSelectStep?: (step: number) => void;
  canNavigateTo?: (step: number) => boolean;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  onSelectStep,
  canNavigateTo = () => false
}) => {
  const steps = [
    { number: 1, title: '기본 정보', icon: User, desc: '나이·지역·주거' },
    { number: 2, title: '소득 정보', icon: Wallet, desc: '소득·독립여부' },
    { number: 3, title: '맞춤 정책 추천', icon: Sparkles, desc: '조건 맞춤 혜택' },
    { number: 4, title: '상세 안내 & 챗봇', icon: MessageSquare, desc: '학습형 챗봇' }
  ];

  return (
    <div className="w-full bg-white border-b border-emerald-100 shadow-xs py-3 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Background Connecting Line */}
          <div className="absolute left-6 right-6 top-5 -translate-y-1/2 h-1 bg-gray-200 z-0">
            <div
              className="h-full bg-[#1D9E75] transition-all duration-300"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
              }}
            />
          </div>

          {/* Step Nodes */}
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;
            const isClickable = canNavigateTo(step.number);
            const IconComponent = step.icon;

            return (
              <button
                key={step.number}
                type="button"
                disabled={!isClickable && !isCurrent}
                onClick={() => isClickable && onSelectStep?.(step.number)}
                className={`relative z-10 flex flex-col items-center group focus:outline-hidden ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-xs ${
                    isCurrent
                      ? 'bg-[#1D9E75] text-white ring-4 ring-emerald-100 ring-offset-1 scale-105'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border-2 border-gray-300 text-gray-400 group-hover:border-gray-400'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="mt-1 text-center">
                  <span
                    className={`block text-xs sm:text-sm font-semibold ${
                      isCurrent
                        ? 'text-[#1D9E75]'
                        : isCompleted
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="hidden sm:block text-[11px] text-gray-400">
                    {step.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
