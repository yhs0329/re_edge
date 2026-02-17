export interface Shop {
  id: number;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  tags: string[];
  images: string[];
  status: "영업중" | "휴무";
}

export const SHOPS: Shop[] = [
  {
    id: 1,
    name: "슈마스터",
    address: "서울 성동구 성수이로 118",
    rating: 4.8,
    reviews: 120,
    tags: ["Vibram", "C4", "택배가능"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?q=80&w=400&auto=format&fit=crop",
    ],
    status: "영업중",
  },
  {
    id: 2,
    name: "빅스톤 리페어",
    address: "경기 고양시 일산동구",
    rating: 4.9,
    reviews: 85,
    tags: ["Neo", "Edge", "택배가능"],
    images: [
      "https://images.unsplash.com/photo-1564069114553-730ce989fce1?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop",
    ],
    status: "영업중",
  },
  {
    id: 3,
    name: "클라임 닥터",
    address: "서울 마포구",
    rating: 4.5,
    reviews: 42,
    tags: ["XS Grip", "자체고무"],
    images: [
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&auto=format&fit=crop",
    ],
    status: "휴무",
  },
  {
    id: 4,
    name: "리솔 킹",
    address: "부산 해운대구",
    rating: 4.7,
    reviews: 15,
    tags: ["Vibram", "UnParallel"],
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop",
    ],
    status: "영업중",
  },
  {
    id: 5,
    name: "암벽화 병원",
    address: "대구 중구",
    rating: 4.6,
    reviews: 30,
    tags: ["Vibram"],
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dad99902?q=80&w=400&auto=format&fit=crop",
    ],
    status: "영업중",
  },
];
