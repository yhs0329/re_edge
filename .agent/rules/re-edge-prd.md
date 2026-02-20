---
trigger: always_on
---

# Output Language

All Output Language : Always respond in Korean (한국어). Even if the user asks in English or the context is technical, provide explanations in Korean unless explicitly requested otherwise.

Also, write the `Walkthrough` and `Implement Plan` to be shown to users in Korean.

# Product Requirements Document (PRD)

**Project Name:** Re:Edge
**Version:** 1.0
**Status:** Draft (Approved for MVP Dev)

---

## 1. Executive Summary (개요)

본 프로젝트는 파편화된 암벽화 수선(리솔) 정보를 '직접 검증(Human Verified)'하여 표준화된 형태로 제공하는 버티컬 정보 플랫폼입니다.
사용자에게 불필요한 가입 절차나 관리 부담(Diary)을 주지 않고, **"검색 즉시 해결(Search to Solution)"**할 수 있는 경험을 제공합니다.
수익 모델은 수선 과정에서 필요한 '기술 정보(고무 스펙 등)'와 '택배 가이드'를 제공하며 자연스럽게 관련 용품(Affiliate)을 노출하는 방식입니다. 궁극적으로는 리솔 업체가 직접 정보를 관리하고 광고하는 B2B SaaS로 확장합니다.

## 2. Problem Statement (문제 정의)

1. **정보의 비대칭 및 신뢰성 부재:** 온라인 커뮤니티의 단편적 댓글이나 오래된 블로그 글에 의존해야 하며, 폐업 여부나 현재 작업 가능 여부를 알기 어렵습니다.
2. **비효율적 탐색 과정:** 사용자는 수선 가격, 취급 고무(Rubber), 택배 가능 여부를 알기 위해 일일이 여러 업체에 전화해야 합니다.
3. **전문 지식의 부재 (Decision Fatigue):** 어떤 고무(Vibram vs Neo)가 내 등반 스타일에 맞는지, 택배는 어떻게 포장해야 하는지 알기 어려워 수선 의뢰 자체를 망설이게 됩니다.

## 3. Goals & Success Metrics (목표 및 지표)

- **Primary Goal (MVP):** '검증된' 전국 암벽화 리솔 업체 지도 완성 및 배포.
- **Business Goal:** 서버 비용 최소화 및 제휴 마케팅을 통한 월 커피값 이상의 수익 창출.
- **Key Metrics (KPIs):**
- **MAU (월간 활성 사용자):** 1,000명 달성.
- **CTR (제휴 링크 클릭률):** 상세 페이지 내 용품 추천 클릭률 3% 이상.
- **Listing Count:** 검증된 리솔 업체 30개 이상 확보.

---

## 4. User Personas (타겟 유저)

| 구분       | 페르소나                                     | Needs & Pain Points                                                                                                                                                                                                                                                                         |
| :--------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **User A** | **정보 탐색형 클라이머**<br>(Problem Solver) | - "내 신발(드라고)도 수선되나?"<br>- "택배 보내기 귀찮은데 근처에 없나?"<br>- **회원가입 없이** 전화번호와 영업 여부만 30초 안에 알고 싶음.                                                                                                                                                 |
| **User B** | **리솔 업체 운영자**<br>(Service Provider)   | **[유형 1: 아날로그 장인]**<br>- "기술은 좋은데 홍보를 못해서 손님이 뜸함."<br>- 복잡한 건 싫고 고객 연결만 원함.<br><br>**[유형 2: 유명 전문 업체]**<br>- "단순 문의(가격/영업시간) 전화가 너무 많이 와서 작업에 방해됨."<br>- 고객이 택배 보낼 때 제발 '요청사항'을 정확히 적어주길 원함. |

---

## 5. Feature Specifications (기능 명세) - Phase 1 (MVP)

### 5.1. Verified Shop Directory (검증된 업체 지도/리스트)

가장 핵심적인 기능으로, 개발자가 직접 확인한 정보만 노출합니다.

- **[Must-Have] 지도 기반 업체 탐색:**
- Naver Map API 연동.
- 사용자 위치 기반 가까운 순 정렬.

- **[Must-Have] 업체 상세 정보 (Standardized Card):**
- **기본 정보:** 상호명, 주소, 전화번호 (`tel:` 링크 연동), 영업시간.
- **Verified Badge:** 개발자가 직접 통화,사업자등록증 확인 등 인증 절차을 통과하여 영업 확인을 마친 업체에만 부여하는 '인증 마크'. (정보 신뢰도의 핵심)
- **수선 정보:**
- 취급 고무 (비브람 XS Grip, 네오, 자체 고무 등 태그 형태).
- 택배 접수 가능 여부 (O/X).
- 예상 가격 (Text: "창갈이 약 4~5만 원 선" - _면책 조항 포함_).

- **최종 확인일:** "Last Verified: 2024.02.XX" 표시로 정보 최신성 보장.

### 5.2. Tech Guide & Smart Utility (기술 가이드 및 편의 기능)

로그인(Auth) 없이, 브라우저 저장소(Local Storage)와 고품질 콘텐츠를 통해 재방문 유도 및 수익화를 달성합니다.

- **[Must-Have] The Rubber Guide (암벽화 고무 백과):**
  - **기능:** 주요 창갈이용 고무(Vibram XS Grip 2, Edge, Neo Friction 등)의 물성(마찰력 vs 내구성) 비교표 제공.
  - **목적:** 사용자가 수선 시점이 아니더라도 정보를 얻기 위해 검색(SEO)하여 유입되도록 유도 (정보의 권위 확보).
  - **수익화:** "이 고무를 쓰면 마모가 빠르니 슈구로 보강하세요" -> 슈구 구매 링크 연결.
  - 별도의 테이블 생성 없이, articles 테이블에 속하게 될 컨텐츠로 관리(직접 글 작성)

- **[Must-Have] Smart Clipboard & History (비로그인 개인화):**
  - **원터치 복사:** 주소/전화번호 옆 '복사' 버튼 배치. 클릭 시 "주소가 복사되었습니다. 택배 송장에 붙여넣으세요!" Toast 메시지 출력.
  - **최근 본 업체 (Local Storage):** 로그인 없이 사용자가 열람한 업체를 브라우저에 저장하여, 재방문 시 "최근 본 업체" 리스트 상단 노출.

- **[Must-Have] Repair Guide (수선 가이드 콘텐츠):**
  - "실패 없는 택배 리솔 보내는 법 (포장, 메모 동봉 팁)" 콘텐츠 페이지.
  - **Contextual Ads:** "박스 뜯었을 때 냄새나면 사장님이 싫어해요" -> 냄새 제거제/제습제 추천 링크 배치.

### 5.3. Contextual Commerce (문맥 기반 커머스 - 수익화)

자연스러운 맥락에서 상품을 추천합니다.

- **[Must-Have] 수선 상세 페이지 내 배너:**
- 위치: 업체 정보 하단 또는 '택배 보내는 법' 안내 섹션.
- 문구: "리솔 보내기 전, 냄새 제거는 필수입니다. (사장님들이 좋아해요!)"
- 상품: 그랜즈 레미디, 냄새 제거 볼 (쿠팡 파트너스 링크).

- **[Should-Have] 셀프 수선 가이드:**
- "급하게 앞코만 떼워야 한다면?" 콘텐츠 제공 -> 슈구(Shoe Goo) 구매 링크 연결.

---

## 6. Feature Specifications - Phase 2 (Post-MVP / B2B)

- **사장님(업주) 인증 시스템:**
- "이 가게 사장님이신가요?" 버튼 -> 사업자등록증 사진 첨부(혹은 전화 통화 등) -> 개발자(관리자) 승인 -> 업체 정보 수정 권한 부여.

- **Premium Listing (BM):**
- 월 구독(9,900원) 결제 시:
- 리스트 상단 고정 및 배경색 강조.
- "작업 현황(빠름/보통/밀림)" 상태 표시 기능 활성화.
- 카카오톡 오픈채팅(상담) 버튼 활성화.

---

## 7. Data Strategy (데이터 구축 전략)

**"Automation is creating, Curation is validating."**

1. **Initial Seeding (초기 구축):**

- 소스: 네이버 지도('구두 수선', '등산화 수선'), 클라이밍 커뮤니티(디시인사이드, 인스타그램) 추천글, 네이버 블로그 후기글 등
- 타겟: 전문 리솔 업체 + 암벽화 수선이 가능한 일반 구두 수선점.
- 방식: Google Spreadsheets에 리스트업 후 **직접 검증(전화 통화로 확인 및 후기 글 조사 등)**.

2. **Maintenance (유지보수):**

- 주기: 월 1회 전체 리스트 생존 확인 (네이버 지도 조회, 전화 등).
- 크라우드 소싱: 상세 페이지 내 "정보 수정 제안" 버튼을 통해 사용자 제보 접수.

---

## 8. Technical Stack (기술 스택)

- **Frontend:** Next.js (App Router, SEO 최적화), Tailwind CSS (생산성).
- **Backend & DB:** Supabase (PostgreSQL + Auth + Storage).
  - _선정 이유:_ 관계형 데이터(업체-리뷰-유저) 구조에 최적화, **PostGIS**를 활용한 강력한 위치 기반 검색 지원, 엑셀 같은 Table Editor로 초기 데이터 관리 용이.
- **Map API:** Naver Map API.
- **Deployment:** Cloudflare Pages.
  - _선정 이유:_ **상업적 이용(어필리에이트) 가능**, 대역폭 무제한(이미지 트래픽 비용 $0), Git 연동을 통한 자동 배포 및 Next.js(`next-on-pages`) 지원.
- **Analytics:** Google Analytics 4 (GA4) - 트래픽 및 제휴 링크 클릭 이벤트 추적.

---

## 9. Information Architecture (정보 구조)

```mermaid
graph TD
    A[Home / Map View] --> B[Search & Filter]
    A --> C[Shop Detail Page]
    C --> D[Affiliate Link Click]
    C --> E[Save to My List]

    A --> F[My Gear / Login]
    F --> G[Register New Shoe]
    G --> H[Log Repair History]
    H --> I[Set Reminder]

    A --> J[About & Content]
    J --> K[Self-Repair Guide (Affiliate)]

```

### UI Layout Structure (Mobile Layout)

```
graph TD
    A[Mobile Screen Viewport]
    A --> B[Top Bar: Logo + Search Field]
    A --> C[Background: Naver Map Fullscreen]
    C --> C1[Map Markers: Verified/Normal Pins]
    A --> D[Bottom Sheet: Swipeable List]
    D --> D1[Handle Bar]
    D --> D2[Filter Chips: Rubber Type / Delivery]
    D --> D3[Shop List Cards]
    A --> E[Floating Action Button: My Gear / Login]
```

---

## 10. UI/UX Guidelines (디자인 가이드)

- **Tone & Manner:** 신뢰감 있는(Trustworthy), 깔끔한(Clean), 실용적인(Utilitarian).
- **Mobile First:** 사용자의 90%는 모바일 환경에서 접속함. 지도와 전화걸기 버튼이 엄지손가락 범위 내에 있어야 함.
- **Color Palette:**
- Primary: Deep Blue (신뢰).
- Secondary: Vivid Orange (액션/강조 - 제휴 링크).
- Badge: Green (Verified/검증됨).

### [세부 UI/UX 원칙]

**1. 기능적 미니멀리즘 (Utilitarian Minimalism)**

- **원칙:** 모든 UI 요소는 장식이 아닌 '정보 전달' 목적으로만 존재해야 합니다.
- **적용 가이드:** 배경은 깔끔한 Surface 컬러(`Slate-50` 등)를 유지하며, 그림자(Shadow) 효과는 바텀 시트(Bottom Sheet)와 플로팅 버튼(FAB) 등 계층(Depth) 구분이 명확히 필요한 컴포넌트에만 제한적으로 사용합니다.

**2. 시선 유도와 수익화의 분리 (Visual Hierarchy for Affiliate)**

- **원칙:** 색상을 통해 '정보'와 '액션(수익화)'을 명확히 분리합니다.
- **적용 가이드:** \* **정보 영역:** 기본 텍스트, 지도 마커, 업체 이름 등은 Primary 컬러(Deep Blue)와 무채색(Slate)을 사용하여 신뢰감 있게 구성합니다.

- **액션 영역:** 사용자의 클릭을 유도하는 제휴 링크(어필리에이트) 및 주요 구매/수선 가이드 CTA 버튼에만 Secondary 컬러(Vivid Orange)를 독점적으로 사용합니다. 이 대비를 통해 오렌지색이 곧 '유용한 해결책'이라는 인식을 주어 클릭률(CTR) 3% 목표 달성을 돕습니다.

**4. 신뢰의 시각화 (Visualizing Trust)**

- **원칙:** 핵심 가치인 '직접 검증(Human Verified)' 상태를 가장 직관적으로 노출합니다.
- **적용 가이드:** 인증 마크(Verified Badge)는 Green 컬러와 아이콘(예: `✓`)을 조합하여 시각적 대비를 극대화합니다. 사용자가 스와이프 리스트를 볼 때 1초 만에 영업 및 수선 정보가 확인된 업체임을 인지할 수 있도록, 업체명 바로 옆이나 카드의 우측 상단에 강제 고정합니다.

---

## 11. Risk Management (리스크 관리)

- **Risk:** 수선 결과물에 대한 불만 제기.
- **Mitigation:** 모든 페이지 푸터(Footer) 및 상세 페이지 상단에 "본 서비스는 정보 제공자일 뿐, 수선 계약의 당사자가 아니며 결과물에 책임지지 않습니다." 문구 명시.

- **Risk:** 부정확한 가격 정보.
- **Mitigation:** 가격 정보 옆에 `(예상 비용)` 표기 및 "정확한 가격은 업체 문의 필수" 문구 추가.
