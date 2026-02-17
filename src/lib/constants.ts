export interface Shop {
  id: number;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  tags: string[];
  images: string[];
  status: "영업중" | "휴무";
  priceInfo?: string;
  duration?: string;
  rubberInfo?: string;
  deliveryInfo?: string;
}

export const SHOPS: Shop[] = [
  {
    id: 1,
    name: "슈마스터",
    address: "서울 성동구 성수이로 118",
    rating: 4.8,
    reviews: 120,
    tags: ["비브람공식", "택배전문", "성수동"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?q=80&w=600&auto=format&fit=crop",
    ],
    status: "영업중",
    priceInfo: "4.5만 원 ~",
    duration: "약 2주 소요",
    rubberInfo: "Vibram, C4, Stealth",
    deliveryInfo: "우체국, 편의점 가능",
  },
  {
    id: 2,
    name: "빅스톤 리페어",
    address: "경기 고양시 일산동구",
    rating: 4.9,
    reviews: 85,
    tags: ["일산맛집", "꼼꼼함", "장인"],
    images: [
      "https://images.unsplash.com/photo-1564069114553-730ce989fce1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    ],
    status: "영업중",
    priceInfo: "4.0만 원 ~",
    duration: "약 10일 (보통)",
    rubberInfo: "Neo, Edge, Grip2",
    deliveryInfo: "택배 접수 전용 매장",
  },
  {
    id: 3,
    name: "클라임 닥터",
    address: "서울 마포구",
    rating: 4.5,
    reviews: 42,
    tags: ["마포", "빠른수선", "친절"],
    images: [
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=600&auto=format&fit=crop",
    ],
    status: "휴무",
    priceInfo: "4.8만 원 ~",
    duration: "약 3주 (밀림)",
    rubberInfo: "XS Grip 2 전문",
    deliveryInfo: "방문/택배 병행",
  },
  {
    id: 4,
    name: "리솔 킹",
    address: "부산 해운대구",
    rating: 4.7,
    reviews: 15,
    tags: ["부산", "해운대", "최고의기술"],
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
    ],
    status: "영업중",
    priceInfo: "5.0만 원 ~",
    duration: "약 2주 (보통)",
    rubberInfo: "UnParallel 전문",
    deliveryInfo: "부산 지역 픽업 가능",
  },
  {
    id: 5,
    name: "암벽화 병원",
    address: "대구 중구",
    rating: 4.6,
    reviews: 30,
    tags: ["대구", "전국택배", "정찰제"],
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dad99902?q=80&w=600&auto=format&fit=crop",
    ],
    status: "영업중",
    priceInfo: "4.2만 원 ~",
    duration: "약 12일 소요",
    rubberInfo: "Vibram 전품목",
    deliveryInfo: "GS25 반값택배 지원",
  },
];
