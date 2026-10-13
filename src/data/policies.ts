import { Policy, UserProfile } from '../types.ts';

export const POLICIES: Policy[] = [
  {
    id: 'seoul-monthly-rent',
    name: '청년월세지원 (서울시)',
    shortSummary: '서울 거주 청년의 주거비 부담을 덜어주기 위해 매월 최대 20만 원씩 월세를 지원해요.',
    benefit: '월 최대 20만 원 (최대 240만 원), 12개월 지원',
    scope: '서울시',
    targetAudience: '서울 거주 만 19~39세 무주택 청년 1인 가구',
    detailSupport: '월세 납부액 중 매월 최대 20만 원을 12개월(최장 1년) 동안 계좌로 직접 현금 입금 지원 (생애 1회, 연 15,000명 내외 선발). 보증금 8천만 원 이하 및 월세 60만 원 이하 주택 대상 (보증금 월세 환산액과 합산 96만 원 이하).',
    period: '최대 12개월 (월 1회 분할 지급, 1년 동안 지원)',
    incomeCriteria: '기준 중위소득 150% 이하 (2025~2026 1인 가구 기준 월 약 358만 원 이하). 건강보험료 부과액을 통해 소득을 판정합니다.',
    applicationMethod: '서울주거포털(housing.seoul.go.kr) 온라인 접수 (상반기 정기 모집 공고 시 온라인 신청).',
    cautions: [
      '생애 1회만 지원받을 수 있으며, 국토부 청년월세 특별지원과 중복 수령은 불가합니다.',
      '임차보증금 8천만 원, 월세 60만 원 이하 건물에 전입신고 및 확정일자가 완료되어 있어야 합니다.',
      '주택 소유자, 분양권 소지자, 공공임대주택 거주자는 신청 대상에서 제외됩니다.'
    ],
    officialUrl: 'https://housing.seoul.go.kr',
    officialSiteName: '서울주거포털',
    quickQuestions: [
      '서류 알려줘요',
      '중위소득이 뭔가요?',
      '신청 자격 확인법',
      '중복 수령 가능한가요?'
    ]
  },
  {
    id: 'gov-monthly-rent',
    name: '국토부 청년월세 특별지원',
    shortSummary: '정부 국토교통부가 주관하여 전국 청년에게 2년간 월 최대 20만 원씩 총 480만 원을 지원해요.',
    benefit: '월 최대 20만 원 (최대 480만 원), 24개월(2년) 지원',
    scope: '전국',
    targetAudience: '전국 만 19~34세(지자체 조례에 따라 일부 만 39세) 부모와 별도 거주하는 무주택 청년',
    detailSupport: '실제 납부하는 월세 중 최대 20만 원을 최장 24개월 동안 매월 분할 지원. 보증금 5천만 원 이하 및 월세 70만 원 이하 주택 대상 (보증금 월세 환산액 합산 86만 원 이하).',
    period: '최대 24개월 (2년 동안 매달 20만 원 지급)',
    incomeCriteria: '원가구(부모+청년) 기준 중위소득 100% 이하 & 청년독립가구 기준 중위소득 60% 이하 (월 약 143만 원 이하). 만 30세 이상이거나 중위소득 50% 이상 소득이 있는 경우 원가구 소득 심사는 면제됩니다.',
    applicationMethod: '복지로(bokjiro.go.kr) 온라인 신청 또는 주소지 관할 주민센터(행정복지센터) 방문 신청.',
    cautions: [
      '서울시 청년월세지원 등 타 지자체 월세 지원과 중복으로 받을 수 없습니다.',
      '부모님과 주민등록상 세대가 분리되어 있어야 하며, 본인 명의 임대차계약서가 필수입니다.',
      '월세 이체 내역(은행 이체확인증)을 증빙서류로 제출해야 합니다.'
    ],
    officialUrl: 'https://www.bokjiro.go.kr',
    officialSiteName: '복지로 (보건복지부)',
    quickQuestions: [
      '서류 알려줘요',
      '중위소득이 뭔가요?',
      '신청 자격 확인법',
      '중복 수령 가능한가요?'
    ]
  },
  {
    id: 'youth-jeonse-loan',
    name: '청년 버팀목 전세자금 대출',
    shortSummary: '전세나 월세 보증금이 부족한 청년을 위한 정부 최저 2.2%대 초저금리 주택도시기금 대출이에요.',
    benefit: '최대 2억 원 한도 (임차보증금의 80% 이내), 최저 연 2.2%~ 저금리',
    scope: '전국',
    targetAudience: '만 19~34세 이하의 무주택 세대주(예비 세대주 포함)',
    detailSupport: '전세보증금의 최대 80%까지, 최대 2억 원 한도로 저리 융자 지원. 시중 은행 전세대출(4~5%대)보다 이자 부담을 절반 이상 줄일 수 있는 대표적 청년 기금 대출.',
    period: '기본 2년 (4회 연장 가능하여 최장 10년까지 이용 가능)',
    incomeCriteria: '본인 및 부부 합산 연소득 5,000만 원 이하 (신혼가구, 2자녀 이상 가구는 7,500만 원 이하). 순자산 3.45억 원 이하.',
    applicationMethod: '주택도시기금 기금e든든(enhuf.molit.go.kr) 온라인 신청 또는 수탁은행(우리, 신한, 국민, 농협, 하나) 방문 신청.',
    cautions: [
      '대출 대상 주택이 전세보증금 3억 원 이하(전용면적 85㎡ 이하)여야 합니다.',
      '임차보증금 5% 이상을 계약금으로 납부한 영수증과 확정일자 부여된 계약서가 필수입니다.',
      '세대원 전원이 무주택자여야 하며 목적물 주택의 융자금(근저당) 상황에 따라 한도가 달라질 수 있습니다.'
    ],
    officialUrl: 'https://enhuf.molit.go.kr',
    officialSiteName: '주택도시기금 기금e든든',
    quickQuestions: [
      'LTV가 뭔가요?',
      '금리 계산법',
      '대출 한도 확인법',
      '무주택 기준이 뭔가요?'
    ]
  },
  {
    id: 'happy-housing',
    name: '행복주택',
    shortSummary: '대중교통이 편리한 역세권에 대학생, 청년, 신혼부부를 위해 시세보다 60~80% 저렴하게 공급하는 공공임대주택이에요.',
    benefit: '주변 시세의 60~80% 수준의 저렴한 임대료, 최장 6~10년 거주',
    scope: '전국',
    targetAudience: '만 19~39세 청년, 대학생, 사회초년생(소득활동 5년 이내)',
    detailSupport: 'LH(한국토지주택공사) 및 각 지역 도시공사가 역세권 또는 직주근접 입지에 쾌적한 1인 맞춤형 원룸 및 투룸을 저렴한 임대보증금과 월세로 공급.',
    period: '청년·대학생 기본 6년 거주 (취업·결혼 시 최대 10년까지 연장 가능)',
    incomeCriteria: '해당 세대 월평균 소득이 전년도 도시근로자 가구원수별 가구당 월평균소득의 100% 이하 (1인 가구는 120% 이하, 약 410만 원 이하). 총자산 2억 7,300만 원 이하.',
    applicationMethod: 'LH 청약플러스(apply.lh.or.kr) 또는 SH 서울주택도시공사 인터넷 청약 시스템을 통해 입주자 모집 공고 기간에 신청.',
    cautions: [
      '청약통장 가입이 필수 요건입니다 (입주 전까지 납입 인정 기준 유지 필요).',
      '거주 기간 동안 무주택 자격을 지속적으로 유지해야 합니다.',
      '인기 단지의 경우 경쟁률이 높으므로 순위(거주지, 소득수준) 및 가점 요건을 미리 챙겨야 합니다.'
    ],
    officialUrl: 'https://apply.lh.or.kr',
    officialSiteName: 'LH 청약플러스 / 마이홈',
    quickQuestions: [
      '입주 자격 확인법',
      '청약 방법',
      '시세란 무엇인가요?',
      '관리비 계산법'
    ]
  },
  {
    id: 'seoul-safe-housing',
    name: '청년안심주택',
    shortSummary: '서울시 역세권 및 간선도로변에 대중교통이 편리하고 안전한 청년 맞춤형 공공 및 민간임대주택이에요.',
    benefit: '시세의 30~85% 저렴한 임대료 (공공임대 30~70%, 공공지원민간임대 75~85%)',
    scope: '서울시',
    targetAudience: '서울 생활권 만 19~39세 미혼 청년 (대학생, 취업준비생, 직장인)',
    detailSupport: '지하철역 도보 5분 이내 역세권에 커뮤니티 시설(스터디룸, 공유주방, 헬스장 등)을 갖춘 청년 전용 주택. 보증금 최대 50%(최대 4,500만 원) 무이자 지원 연계 가능.',
    period: '공공임대 최장 6년 (결혼 시 10년), 민간임대 최장 8~10년',
    incomeCriteria: '공공임대: 전년도 도시근로자 가구원수별 가구당 월평균소득 100~120% 이하 (1인 약 410만 원 이하). 민간임대: 소득 기준 완화(120% 이하 우선공급, 일반공급은 소득 무관).',
    applicationMethod: 'SH 청약센터 및 서울시 청년안심주택 공식 홈페이지(youthhousing.seoul.go.kr)에서 공급 일정 확인 후 청약.',
    cautions: [
      '차량 미소유·미운행이 원칙입니다 (생계용, 장애인, 장애영유아 동반 등 일부 예외 차량만 주차 허용).',
      '공공임대와 민간임대의 보증금 및 월세 차이가 크므로 공고문을 꼼꼼히 확인해야 합니다.',
      '계약 시 보증금 지원 혜택(보증금지원형 장기안심주택 등) 연계 여부를 확인하세요.'
    ],
    officialUrl: 'https://youthhousing.seoul.go.kr',
    officialSiteName: '서울시 청년안심주택 종합포털',
    quickQuestions: [
      '입주 자격 확인법',
      '청약 방법',
      '시세란 무엇인가요?',
      '관리비 계산법'
    ]
  },
  {
    id: 'lh-purchased-housing',
    name: '청년 매입임대주택',
    shortSummary: 'LH나 공공기관이 기존 도심 내 다세대·오피스텔을 매입하여 수리 후 청년에게 시세의 30~50%로 저렴하게 재임대해요.',
    benefit: '시세의 30~50% 수준의 매우 저렴한 임대조건 (보증금 100만~200만 원대)',
    scope: '전국',
    targetAudience: '만 19~39세 무주택 미혼 청년 (대학생, 취업준비생 등)',
    detailSupport: '도심지 내 빌라, 오피스텔, 다가구 주택을 LH가 통째로 매입 후 냉장고, 세탁기, 에어컨 등 가전제품을 갖추어 100만~200만 원 수준의 극저보증금과 월 10~20만 원대 임대료로 공급.',
    period: '최초 2년 계약, 재계약 4회 가능하여 최장 10년 거주 가능',
    incomeCriteria: '1순위(기초수급자, 차상위, 한부모가족), 2순위(본인+부모 소득 100% 이하, 약 700만 원 이하), 3순위(본인 소득 100% 이하, 약 335만 원 이하).',
    applicationMethod: 'LH 청약플러스(apply.lh.or.kr) 및 각 지역 도시공사(SH, GH 등) 홈페이지에서 정기/수시 모집 공고 접수.',
    cautions: [
      '순위별로 임대조건(시세 30% vs 40~50%)과 당첨 확률 차이가 큽니다.',
      '기본 풀옵션(냉장고, 세탁기, 에어컨, 쿡탑)이 제공되는 경우가 많아 초기 비용을 크게 아낄 수 있습니다.',
      '신청 시 거주 희망 시·군·구를 지정하여 지원해야 합니다.'
    ],
    officialUrl: 'https://apply.lh.or.kr',
    officialSiteName: 'LH 청약플러스 / 마이홈',
    quickQuestions: [
      '입주 자격 확인법',
      '청약 방법',
      '시세란 무엇인가요?',
      '관리비 계산법'
    ]
  },
  {
    id: 'kosaf-housing-support',
    name: '한국장학재단 주거비 지원',
    shortSummary: '원거리 대학에 진학하여 자취하는 저소득 기초·차상위 대학생에게 월 최대 20만 원의 주거 장학금을 지원해요.',
    benefit: '월 최대 20만 원 (학기당 최대 120만 원, 연 최대 240만 원) 주거비 지원',
    scope: '전국',
    targetAudience: '대학 소재지와 부모 거주지가 다른 원거리 자취 대학생 (기초생활수급자, 차상위계층)',
    detailSupport: '대학에 재학 중이며 원거리 거주로 인해 월세나 기숙사비를 지출하고 있는 청년 대학생의 실주거비를 월 최대 20만 원까지 비과세 장학금 형태로 무상 지급.',
    period: '학기 단위 지급 (매 학기 신청 및 자격 유지 시 최대 정규 학기 동안 지원)',
    incomeCriteria: '학자금 지원구간 기초생활수급자 및 차상위계층 (중위소득 50% 이하). 소득인정액 심사 한국장학재단 기준 적용.',
    applicationMethod: '한국장학재단 홈페이지(kosaf.go.kr) 또는 모바일 앱에서 주거안정장학금 온라인 신청.',
    cautions: [
      '대학생 전용 지원 사업으로 직장인이나 졸업생은 신청할 수 없습니다.',
      '본인 명의의 임대차계약서 및 거주 사실 증명서류(기숙사 납부 확인서 등)가 필요합니다.',
      '직전 학기 성적 기준(백분위 70점 또는 C학점 이상)을 충족해야 합니다.'
    ],
    officialUrl: 'https://www.kosaf.go.kr',
    officialSiteName: '한국장학재단',
    quickQuestions: [
      '기초·차상위란?',
      '서류 알려줘요',
      '중위소득이 뭔가요?',
      '신청 기간 언제예요?'
    ]
  }
];

// Helper to calculate median income percentage based on selected monthly income
export function getMedianIncomePercentText(monthlyIncome?: string): {
  referenceAmount: string;
  percentText: string;
  percentNumber: number;
  fullGuide: string;
} {
  // Reference: 2025~2026 1-person median income approx 2,392,000 KRW (approx 239만 원)
  switch (monthlyIncome) {
    case '50만 원 이하':
      return {
        referenceAmount: '50만 원 이하(평균 약 40만 원)',
        percentText: '약 17~21%',
        percentNumber: 20,
        fullGuide: '내 월 소득(50만 원 이하 기준)은 기준 중위소득 약 20%에 해당합니다. (최저 소득 구간으로 대부분의 청년 주거비 지원 1순위 자격에 해당합니다)'
      };
    case '50~100만 원':
      return {
        referenceAmount: '50~100만 원(평균 약 75만 원)',
        percentText: '약 31~42%',
        percentNumber: 35,
        fullGuide: '내 월 소득(50~100만 원 기준)은 기준 중위소득 약 35%에 해당합니다. (중위소득 50% 이하로 기초·차상위 및 청년월세 특별지원 혜택 대상에 매우 유리합니다)'
      };
    case '100~200만 원':
      return {
        referenceAmount: '100~200만 원(평균 약 150만 원)',
        percentText: '약 63~84%',
        percentNumber: 65,
        fullGuide: '내 월 소득(100~200만 원 기준)은 기준 중위소득 약 65%에 해당합니다. (청년월세지원 150% 이하 및 청년 임대주택 소득 요건을 넉넉히 충족합니다)'
      };
    case '200~300만 원':
      return {
        referenceAmount: '200~300만 원(평균 약 250만 원)',
        percentText: '약 105~125%',
        percentNumber: 110,
        fullGuide: '내 월 소득(200~300만 원 기준)은 기준 중위소득 약 110%에 해당합니다. (서울시 청년월세지원 150% 이하 및 버팀목 전세대출 요건을 충족합니다)'
      };
    case '300만 원 이상':
      return {
        referenceAmount: '300만 원 이상(평균 약 350만 원)',
        percentText: '약 145% 이상',
        percentNumber: 145,
        fullGuide: '내 월 소득(300만 원 이상 기준)은 기준 중위소득 약 145% 이상에 해당합니다. (청년 버팀목 대출(연 5천만 원 이하)은 가능하나, 일부 저소득 특화 정책은 조건 확인이 필요합니다)'
      };
    case '잘 모르겠어요':
    default:
      return {
        referenceAmount: '미확인',
        percentText: '확인 필요',
        percentNumber: 100,
        fullGuide: '내 월 소득(소득 미확인 기준)은 국민건강보험료 납부확인서를 통해 기준 중위소득 해당 비율을 정확히 확인하실 수 있습니다.'
      };
  }
}

// Income eligibility check badge: "✅ 내 조건에 해당" vs "⚠️ 조건 확인 필요"
export function checkIncomeEligibilityBadge(
  policy: Policy,
  user: UserProfile
): {
  badge: '✅ 내 조건에 해당' | '⚠️ 조건 확인 필요';
  reason: string;
  isHighMatch: boolean;
} {
  const income = user.monthlyIncome;
  const region = user.region;
  const housing = user.housingStatus;

  // Seoul-specific restriction
  if (policy.scope === '서울시' && region && region !== '서울') {
    return {
      badge: '⚠️ 조건 확인 필요',
      reason: '서울시 거주 청년 대상 정책입니다 (현재 선택 지역: ' + region + ')',
      isHighMatch: false
    };
  }

  // Seoul monthly rent: median income <= 150% (monthly <= 358만원)
  if (policy.id === 'seoul-monthly-rent') {
    if (region === '서울') {
      if (['50만 원 이하', '50~100만 원', '100~200만 원', '200~300만 원'].includes(income || '')) {
        return {
          badge: '✅ 내 조건에 해당',
          reason: '중위소득 150% 이하 조건을 안정적으로 충족합니다.',
          isHighMatch: true
        };
      }
    }
    return {
      badge: '⚠️ 조건 확인 필요',
      reason: '소득 300만 원 초과 시 기준 중위소득 150% 초과 여부 확인이 필요합니다.',
      isHighMatch: false
    };
  }

  // Gov monthly rent: separate youth median income <= 60% (approx 143만원) & original home <= 100%
  if (policy.id === 'gov-monthly-rent') {
    if (['50만 원 이하', '50~100만 원'].includes(income || '')) {
      return {
        badge: '✅ 내 조건에 해당',
        reason: '청년독립가구 소득 60% 이하 기준을 충족할 가능성이 매우 높습니다.',
        isHighMatch: true
      };
    }
    return {
      badge: '⚠️ 조건 확인 필요',
      reason: '원가구(부모님) 소득 100% 및 청년독립가구 60% 이하 여부 세밀 확인이 필요합니다.',
      isHighMatch: false
    };
  }

  // Youth Jeonse loan: annual income <= 50M KRW (approx monthly 4.16M KRW)
  if (policy.id === 'youth-jeonse-loan') {
    if (['50만 원 이하', '50~100만 원', '100~200만 원', '200~300만 원'].includes(income || '')) {
      return {
        badge: '✅ 내 조건에 해당',
        reason: '연소득 5천만 원(월 약 416만 원) 이하 자격 요건을 여유 있게 충족합니다.',
        isHighMatch: true
      };
    }
    if (income === '300만 원 이상') {
      return {
        badge: '⚠️ 조건 확인 필요',
        reason: '연봉 5,000만 원(세전) 초과 여부에 대한 확인이 필요합니다.',
        isHighMatch: false
      };
    }
    return {
      badge: '⚠️ 조건 확인 필요',
      reason: '소득 및 무주택 세대주 요건 확인이 필요합니다.',
      isHighMatch: false
    };
  }

  // Happy housing: median income <= 100~120% (monthly <= 4.1M KRW)
  if (policy.id === 'happy-housing') {
    if (['50만 원 이하', '50~100만 원', '100~200만 원', '200~300만 원'].includes(income || '')) {
      return {
        badge: '✅ 내 조건에 해당',
        reason: '도시근로자 월평균소득 120% 이하 기준을 만족합니다.',
        isHighMatch: true
      };
    }
    return {
      badge: '⚠️ 조건 확인 필요',
      reason: '소득 기준(120% 이하) 및 청약통장 납입 횟수 확인이 필요합니다.',
      isHighMatch: false
    };
  }

  // Seoul safe housing: public rental <= 100~120%, private rental open
  if (policy.id === 'seoul-safe-housing') {
    if (region === '서울' && ['50만 원 이하', '50~100만 원', '100~200만 원'].includes(income || '')) {
      return {
        badge: '✅ 내 조건에 해당',
        reason: '공공임대 우선공급 소득 조건(100% 이하)에 부합합니다.',
        isHighMatch: true
      };
    }
    return {
      badge: '⚠️ 조건 확인 필요',
      reason: '공공임대/민간임대 유형별 소득 기준 확인이 필요합니다.',
      isHighMatch: false
    };
  }

  // LH purchased housing: 1~3 tiers
  if (policy.id === 'lh-purchased-housing') {
    if (['50만 원 이하', '50~100만 원', '100~200만 원'].includes(income || '')) {
      return {
        badge: '✅ 내 조건에 해당',
        reason: '본인 소득 100% 이하로 2~3순위 이상 신청 자격을 갖추었습니다.',
        isHighMatch: true
      };
    }
    return {
      badge: '⚠️ 조건 확인 필요',
      reason: '순위별 부모 합산 소득 및 자산 요건 확인이 필요합니다.',
      isHighMatch: false
    };
  }

  // KOSAF student housing support: basic/next-tier low income students
  if (policy.id === 'kosaf-housing-support') {
    if (housing === '기숙사 거주 중' || housing === '자취 중 (월세)') {
      if (['50만 원 이하', '50~100만 원'].includes(income || '')) {
        return {
          badge: '✅ 내 조건에 해당',
          reason: '원거리 거주 및 저소득 장학 기준 충족 가능성이 높습니다.',
          isHighMatch: true
        };
      }
    }
    return {
      badge: '⚠️ 조건 확인 필요',
      reason: '대학생 여부 및 기초생활수급자/차상위계층(중위소득 50% 이하) 증빙이 필요합니다.',
      isHighMatch: false
    };
  }

  return {
    badge: '⚠️ 조건 확인 필요',
    reason: '세부 소득 및 거주 조건 확인이 필요합니다.',
    isHighMatch: false
  };
}
