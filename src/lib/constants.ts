export interface Shop {
  id: string;
  slug: string;
  name: string;
  address: string;
  phone: string;
  images: string[];
  tags: string[];
  is_verified: boolean;
  last_verified_at: string;
  lat: number;
  lng: number;
  notice: string;
  business_hours?: {
    text: string;
    break_time?: string;
    details?: string;
    link?: string;
    [key: string]: any;
  };
  delivery_available?: boolean;
  turnaround?: {
    text: string;
    source_text: string;
    source_url: string;
  };
  process?: {
    steps: string[];
    source_text: string;
    source_url: string;
  };
  prices?: {
    service_name: string;
    price: string;
    description: string;
  }[];
  social_links?: {
    website?: string;
    instagram?: string;
    kakao?: string;
    blog?: string;
    naver?: string;
    [key: string]: string | undefined;
  };
  // UI 호환성을 위한 선택적 필드 (추후 삭제 가능)
  rating?: number;
  reviews?: number;
}

export interface ShopReview {
  id: string;
  shop_id: string;
  title: string;
  author: string;
  url: string;
  source: string;
  created_at: string;
}

export interface AffiliateProduct {
  id: string;
  location_key: string;
  is_active: boolean;
  click_count: number;
  html_code: string;
}

export const SHOPS: Shop[] = [
  {
    id: "1",
    slug: "shumaster",
    name: "슈마스터",
    address: "서울 성동구 성수이로 118",
    phone: "02-1234-5678",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop",
    ],
    tags: ["비브람공식", "택배전문", "성수동"],
    is_verified: true,
    last_verified_at: new Date().toISOString(),
    lat: 37.5445,
    lng: 127.0559,
    notice: "수십 년 경력의 장인이 직접 정성을 다해 수선합니다.",
    delivery_available: true,
  },
];
