# 🚗 렌팁(RENTIP) 렌터카 사이트 개발 계획

## 📋 프로젝트 개요
- **회사명**: 렌팁 (RENTIP)
- **목적**: 프리미엄 렌터카 홍보 원페이지 사이트
- **타겟**: 고급차 렌탈 고객
- **예산**: 연 1-2만원 (도메인만)
- **개발 기간**: 2-3주
- **도메인**: rentip.co.kr

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Design**: 글래스모피즘 + 라이트 테마 (다크 모드 지원)
- **Animation**: Framer Motion
- **Icons**: Lucide React

### Backend & Deployment
- **Hosting**: Vercel (무료)
- **Domain**: 가비아/후이즈
- **Analytics**: Google Analytics
- **SEO**: Next SEO

### Development
```bash
# 프로젝트 생성
npx create-next-app@latest rentcar-site --typescript --tailwind --app

# 필수 패키지 설치
npm install framer-motion lucide-react @radix-ui/react-dialog
npm install embla-carousel-react  # 슬라이더
npm install react-intersection-observer  # 스크롤 애니메이션
```

## 📱 모바일 우선 설계

### 반응형 브레이크포인트
- Mobile: 320px - 767px
- Tablet: 768px - 1023px  
- Desktop: 1024px+

### 모바일 최적화
- 최소 터치 영역: 44x44px
- 폰트 최소 크기: 16px
- 하단 고정 CTA 버튼
- 스와이프 제스처 지원

## 🎨 페이지 구조 (원페이지 스크롤)

### 1. 히어로 섹션 (100vh)
```jsx
// components/Hero.tsx
- 풀스크린 배경 (비디오/이미지)
- 글래스모피즘 타이틀 카드
- 3개 CTA 버튼 (전화, 카톡, 인스타)
- 스크롤 유도 애니메이션
```

### 2. 인기 차량 (6대)
```jsx
// components/FeaturedCars.tsx
- 3x2 그리드 (데스크탑) / 1열 (모바일)
- 글래스 카드 효과
- 호버시 블러 증가
- 차량명, 일일가격 표시
```

### 3. 서비스 특징
```jsx
// components/Services.tsx
- 3개 글래스 카드
- 아이콘 + 설명
- 보험대차 / VIP서비스 / 24시간 지원
```

### 4. 전체 차량 갤러리
```jsx
// components/Gallery.tsx
- 마소리 그리드 레이아웃
- 라이트박스 팝업
- 레이지 로딩
- "더보기" 버튼
```

### 5. 연락처/위치
```jsx
// components/Contact.tsx
- 좌측: 연락처 정보
- 우측: 네이버/구글 지도
- 글래스 카드 디자인
```

### 고정 요소
```jsx
// components/Navigation.tsx
- 상단 네비게이션 (스티키)
- 우측 하단 플로팅 버튼 (카톡, TOP)
```

## 🚀 개발 순서

### Phase 1: 기본 구조 (3일)
- [x] Next.js 프로젝트 생성
- [ ] 폴더 구조 설정
- [ ] 글래스모피즘 컴포넌트 라이브러리
- [ ] 반응형 레이아웃

### Phase 2: 핵심 기능 (5일)
- [ ] 히어로 섹션 구현
- [ ] 차량 카드 컴포넌트
- [ ] 갤러리 + 라이트박스
- [ ] 스크롤 애니메이션

### Phase 3: 최적화 (3일)
- [ ] 이미지 최적화 (WebP, srcset)
- [ ] 모바일 터치 최적화
- [ ] SEO 메타태그
- [ ] 성능 최적화

### Phase 4: 배포 (1일)
- [ ] Vercel 배포
- [ ] 도메인 연결
- [ ] Analytics 설정
- [ ] 최종 테스트

## 📝 차량 데이터 구조
```typescript
interface Car {
  id: string;
  name: string;
  brand: string;
  category: 'sports' | 'suv' | 'luxury';
  price: number;
  images: string[];
  featured: boolean;
}
```

## 🎯 성능 목표
- Lighthouse 점수: 90+
- 모바일 로딩: 3초 이내
- 이미지 최적화: WebP 포맷
- 코드 스플리팅: 라우트별

## 📞 연락처 정보
```javascript
const contactInfo = {
  phone: "1599-4826",
  kakao: "https://open.kakao.com/...",
  instagram: "@rentip_official",
  address: "서울시 강남구 논현로 553",
  email: "info@rentip.co.kr"
}
```

## 🔍 SEO 최적화
- 타이틀: "렌팁 | 프리미엄 수입차 렌탈"
- 설명: "람보르기니, 벤틀리, 포르쉐 등 최고급 수입차 렌탈"
- 키워드: 렌팁, 슈퍼카렌트, 외제차렌트, 스포츠카대여, RENTIP
- Open Graph 이미지 설정

## 💻 개발 명령어
```bash
# 개발 서버
npm run dev

# 빌드
npm run build

# 배포 (Vercel)
vercel --prod

# 타입 체크
npm run type-check

# 린트
npm run lint
```

## 📈 추후 개선사항
- [ ] 예약 시스템 추가
- [ ] 관리자 페이지
- [ ] 다국어 지원
- [ ] 실시간 채팅

---
*Last Updated: 2024*