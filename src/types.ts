export type AgeGroup = '19~24세' | '25~29세' | '30~34세' | '35~39세';

export type Region = '서울' | '경기·인천' | '지방 광역시' | '기타 지방';

export type HousingStatus =
  | '자취 중 (월세)'
  | '자취 중 (전세)'
  | '기숙사 거주 중'
  | '부모님과 거주'
  | '곧 자취 예정';

export type IncomeSource = '소득 없음' | '아르바이트' | '직장' | '프리랜서';

export type MonthlyIncome =
  | '50만 원 이하'
  | '50~100만 원'
  | '100~200만 원'
  | '200~300만 원'
  | '300만 원 이상'
  | '잘 모르겠어요';

export type IndependentStatus = '따로 살아요' | '함께 살아요' | '곧 따로 살 예정';

export interface UserProfile {
  age?: AgeGroup;
  region?: Region;
  housingStatus?: HousingStatus;
  incomeSource?: IncomeSource;
  monthlyIncome?: MonthlyIncome;
  independentStatus?: IndependentStatus;
}

export type KnowledgeLevel = '처음 알아보는 중이에요' | '어느 정도 알고 있어요' | '잘 알고 있어요';

export interface Policy {
  id: string;
  name: string;
  shortSummary: string;
  benefit: string;
  scope: '서울시' | '전국';
  targetAudience: string;
  detailSupport: string;
  period: string;
  incomeCriteria: string;
  applicationMethod: string;
  cautions: string[];
  officialUrl: string;
  officialSiteName: string;
  quickQuestions: string[];
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizData {
  type: 'multiple_choice' | 'ox';
  question: string;
  options: QuizOption[];
  explanation: string;
  oneLineSummary: string;
}

export interface CurriculumItem {
  id: string;
  question: string;
  conceptName: string;
  // Explanations per knowledge level
  explanations: Record<KnowledgeLevel, string>;
  // Follow-up question per knowledge level
  followUpConcept: string;
  followUpQuestion: string;
  // Sub-explanation when user selects "아니요, 몰라요"
  subExplanation: string;
  // Quizzes tailored per knowledge level
  quizzes: Record<KnowledgeLevel, QuizData>;
}

export type MessageSender = 'user' | 'bot' | 'system';

export type ChatFlowStep =
  | 'initial_level_check'
  | 'ready'
  | 'concept_explained' // STEP 1
  | 'tail_question_asked' // STEP 1 tail
  | 'tail_explained_not_known' // STEP 2 (no)
  | 'quiz_ready' // STEP 3
  | 'quiz_answered' // STEP 4
  | 'free_talk';

export interface QuizAttempt {
  questionText: string;
  selectedOption: string;
  isCorrect: boolean;
  conceptName: string;
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  curriculumItem?: CurriculumItem;
  quiz?: QuizData;
  activeOptions?: {
    type: 'level_check' | 'tail_yn' | 'quiz_choice' | 'quick_question';
    items: string[];
    quizData?: QuizData;
    conceptKey?: string;
  };
  quizResult?: {
    isCorrect: boolean;
    explanation: string;
  };
}

export interface LearningSummary {
  learnedConcepts: string[];
  quizzes: QuizAttempt[];
  oneLineSummaries: string[];
  recommendedSteps: string[];
}
