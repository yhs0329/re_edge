import { useState } from "react";
import Image from "next/image";
import { Shop, AffiliateProduct } from "@/lib/constants";
import {
  X,
  MapPin,
  Star,
  Phone,
  Clock,
  ChevronRight,
  Package,
  ExternalLink,
  Info,
  BadgeCheck,
  CreditCard,
  Truck,
  Zap,
  Copy,
  AlertCircle,
  Globe,
  MessageCircle,
  Instagram,
  RefreshCw,
} from "lucide-react";
import clsx from "clsx";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ShopReview } from "@/lib/constants";

interface ShopDetailViewProps {
  shop: Shop;
  onClose: () => void;
  isMobile?: boolean;
}

export default function ShopDetailView({
  shop,
  onClose,
  isMobile = false,
}: ShopDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("info");
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isPricesModalOpen, setIsPricesModalOpen] = useState(false);
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false);
  const [reviewsData, setReviewsData] = useState<ShopReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [sidebarBanner, setSidebarBanner] = useState<AffiliateProduct | null>(
    null,
  );
  const [leftBanner, setLeftBanner] = useState<AffiliateProduct | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Sidebar banner (iframe)
        const { data: sidebarData, error: sidebarError } = await supabase
          .from("affiliate_products")
          .select("*")
          .eq("location_key", "sidebar_dynamic_vertical")
          .eq("is_active", true)
          .single();

        if (sidebarError) {
          if (sidebarError.code !== "PGRST116") throw sidebarError;
        } else if (sidebarData) {
          setSidebarBanner(sidebarData as AffiliateProduct);
        }

        // Left banner (Native style)
        const { data: leftData, error: leftError } = await supabase
          .from("affiliate_products")
          .select("*")
          .eq("location_key", "shop_detail_left_banner")
          .eq("is_active", true)
          .single();

        if (leftError) {
          if (leftError.code !== "PGRST116") throw leftError;
        } else if (leftData) {
          setLeftBanner(leftData as AffiliateProduct);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };

    fetchBanners();
  }, []);

  // Utility to parse HTML from DB
  const parseAffiliateHtml = (html: string) => {
    const hrefMatch = html.match(/href="([^"]*)"/);
    const srcMatch = html.match(/src="([^"]*)"/);
    return {
      href: hrefMatch ? hrefMatch[1] : "#",
      src: srcMatch ? srcMatch[1] : "",
    };
  };

  useEffect(() => {
    if (activeTab === "reviews" && reviewsData.length === 0) {
      const fetchReviews = async () => {
        setIsLoadingReviews(true);
        try {
          const { data, error } = await supabase
            .from("shop_reviews")
            .select("*")
            .eq("shop_id", shop.id)
            .order("created_at", { ascending: false });

          if (error) throw error;
          if (data) setReviewsData(data as ShopReview[]);
        } catch (err) {
          console.error("Error fetching reviews:", err);
        } finally {
          setIsLoadingReviews(false);
        }
      };
      fetchReviews();
    }
  }, [activeTab, shop.id, reviewsData.length]);

  const copyAddress = () => {
    navigator.clipboard.writeText(shop.address);
    alert("주소가 복사되었습니다.");
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(shop.phone);
    alert("전화번호가 복사되었습니다.");
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* 
        Zone 0: Top Navigation (PC close only, Mobile might need back) 
        On PC, this is the sticky header we had.
      */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate"></div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide text-slate-900">
        {/* Zone 1: Hero Section (Compact Slider) */}
        <div className="relative w-full overflow-hidden bg-gray-50 border-b border-gray-100">
          {shop.images && shop.images.length > 0 ? (
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-[200px] md:h-[180px]">
              {shop.images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="flex-none w-full snap-start relative group"
                >
                  <Image
                    src={img}
                    alt={`${shop.name} view ${idx}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={idx === 0}
                  />
                  <div className="absolute bottom-3 right-4 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md font-bold z-10">
                    {idx + 1} / {shop.images.length}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[180px] flex items-center justify-center text-gray-400 font-bold flex-col gap-2 bg-gray-50">
              <Info className="w-8 h-8 opacity-20" />
              준비된 사진이 없습니다
            </div>
          )}
        </div>

        {/* Affiliate Disclosure Line */}
        <div className="px-5 md:px-8 pt-4 -mb-2">
          <p className="text-xs text-gray-500 font-bold leading-relaxed opacity-60">
            본 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의
            수수료를 제공받습니다.
          </p>
        </div>

        {/* Content Container */}
        <div
          className={clsx("p-5", !isMobile && "grid grid-cols-12 gap-8 px-8")}
        >
          {/* Main Column */}
          <div className={clsx(!isMobile ? "col-span-9" : "w-full")}>
            {/* Title & Tags */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    {shop.name}
                  </h1>
                  {shop.is_verified && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black rounded flex items-center gap-1 border border-green-200/50 shrink-0">
                      <BadgeCheck className="w-3 h-3" /> 사업주 인증됨
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {shop.tags.map((tag) => (
                  <span key={tag} className="text-sm font-bold text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Social Links Buttons */}
              {shop.social_links &&
                Object.keys(shop.social_links).length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {shop.social_links.website && (
                      <a
                        href={shop.social_links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-xl text-xs font-black hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                      >
                        <Globe className="w-3 h-3 text-blue-500" />
                        공식 홈페이지
                      </a>
                    )}
                    {shop.social_links.kakao && (
                      <a
                        href={shop.social_links.kakao}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-xl text-xs font-black hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                      >
                        <MessageCircle className="w-3 h-3 text-yellow-500 fill-current" />
                        카카오톡
                      </a>
                    )}
                    {shop.social_links.instagram && (
                      <a
                        href={shop.social_links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-xl text-xs font-black hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                      >
                        <Instagram className="w-3 h-3 text-pink-500" />
                        인스타그램
                      </a>
                    )}
                    {shop.social_links.blog && (
                      <a
                        href={shop.social_links.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-xl text-xs font-black hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                      >
                        <span className="w-3 h-3 font-black italic flex items-center justify-center text-[#03C75A]">
                          B
                        </span>
                        블로그
                      </a>
                    )}
                    {shop.social_links.naver && (
                      <a
                        href={shop.social_links.naver}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-xl text-xs font-black hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                      >
                        <MapPin className="w-3 h-3 text-[#03C75A]" />
                        네이버 지도
                      </a>
                    )}
                  </div>
                )}
            </div>

            {/* Zone 2: Quick Specs Grid (2x2) */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-400/30 hover:bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2 text-gray-500 group-hover:text-blue-500 transition-colors">
                  <CreditCard className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    가격
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900 line-clamp-1">
                  {shop.prices && shop.prices.length > 0 ? (
                    <span>{shop.prices[0].price}</span>
                  ) : (
                    "별도 문의"
                  )}
                </div>
                {shop.prices && shop.prices.length > 0 && (
                  <button
                    onClick={() => setIsPricesModalOpen(true)}
                    className="mt-2 text-sm font-bold text-blue-500 hover:text-blue-700 transition-colors flex items-center gap-0.5 cursor-pointer"
                  >
                    {shop.prices.length > 1
                      ? `외 ${shop.prices.length - 1}개 수선 항목 보기`
                      : "수선 상세 정보 및 출처 확인"}
                    <ChevronRight className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-400/30 hover:bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2 text-gray-500 group-hover:text-blue-500 transition-colors">
                  <Clock className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    소요 기간
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {shop.turnaround?.text || "약 2주"}
                </div>
                {shop.turnaround?.source_url && (
                  <a
                    href={shop.turnaround.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {shop.turnaround.source_text || "출처 확인"}
                  </a>
                )}
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-400/30 hover:bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2 text-gray-500 group-hover:text-blue-500 transition-colors">
                  <Zap className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    수선 절차
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900 line-clamp-1">
                  {shop.process?.steps?.[0] || "택배/방문 가능"}
                </div>
                {shop.process?.steps && shop.process.steps.length > 1 && (
                  <button
                    onClick={() => setIsProcessModalOpen(true)}
                    className="mt-2 text-sm font-bold text-blue-500 hover:text-blue-700 transition-colors flex items-center gap-0.5 cursor-pointer"
                  >
                    외 {shop.process.steps.length - 1}단계 (자세히 보기)
                    <ChevronRight className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-400/30 hover:bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2 text-gray-500 group-hover:text-blue-500 transition-colors">
                  <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    영업시간
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900 line-clamp-1">
                  {shop.business_hours?.text || "별도 문의"}
                </div>
                {shop.business_hours && (
                  <button
                    onClick={() => setIsHoursModalOpen(true)}
                    className="mt-2 text-sm font-bold text-blue-500 hover:text-blue-700 transition-colors flex items-center gap-0.5 cursor-pointer"
                  >
                    상세 영업시간 보기
                    <ChevronRight className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Zone 3: Native Affiliate Card (Soft style) */}
            {(() => {
              const bannerInfo = leftBanner
                ? parseAffiliateHtml(leftBanner.html_code)
                : {
                    href: "https://link.coupang.com/a/dPySn0",
                    src: "https://images.unsplash.com/photo-1556228578-8c7c2f971c91",
                  };

              return (
                <a
                  href={bannerInfo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-10 bg-linear-to-br from-[#FFF8F3] to-white rounded-[32px] p-7 border border-orange-200/50 flex gap-6 items-center group cursor-pointer hover:shadow-2xl hover:shadow-orange-200/40 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
                        <Zap className="w-4 h-4 text-white fill-current" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest leading-none mb-1">
                          Editor's Pick
                        </span>
                        <span className="text-xl font-black text-gray-900 tracking-tight">
                          리엣지 강력 추천 아이템
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1 mb-5">
                      <p className="text-base font-normal text-slate-700 leading-snug">
                        암벽화에 사탄 들리기 전에 관리하세요 👿
                      </p>
                      <p className="text-base font-normal text-slate-700 leading-snug">
                        클라이머 필수템, 할머니 가루 보러가기
                      </p>
                    </div>
                    <div className="inline-flex items-center text-sm font-black bg-gray-900 text-white px-5 py-2.5 rounded-2xl shadow-xl shadow-gray-200 group-hover:bg-orange-600 group-hover:shadow-orange-100 transition-all duration-300">
                      추천 제품 바로보기
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                  <div className="w-32 h-32 bg-white rounded-[24px] overflow-hidden shadow-xl shadow-orange-100/50 shrink-0 p-3 relative border border-orange-50/50">
                    <div className="absolute inset-0 bg-linear-to-tr from-orange-50/30 to-transparent pointer-events-none" />
                    <Image
                      src={bannerInfo.src}
                      fill
                      className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                      alt="Product"
                    />
                  </div>
                </a>
              );
            })()}

            {/* Zone 4: Details & Actions */}
            <div>
              {/* Tab Navigation (Pill Style) */}
              <div className="flex p-1.5 bg-gray-100/50 rounded-2xl mb-8 sticky top-[53px] z-20 backdrop-blur-xl border border-gray-100">
                <button
                  onClick={() => setActiveTab("info")}
                  className={clsx(
                    "flex-1 py-3 text-sm font-bold transition-all duration-300 rounded-xl flex items-center justify-center gap-2",
                    activeTab === "info"
                      ? "bg-white text-blue-600 shadow-sm shadow-blue-500/5 ring-1 ring-gray-100"
                      : "text-gray-400 hover:text-gray-600",
                  )}
                >
                  <Info
                    className={clsx(
                      "w-4 h-4",
                      activeTab === "info" ? "text-blue-500" : "text-gray-300",
                    )}
                  />
                  상세 정보
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={clsx(
                    "flex-1 py-3 text-sm font-bold transition-all duration-300 rounded-xl flex items-center justify-center gap-2",
                    activeTab === "reviews"
                      ? "bg-white text-blue-600 shadow-sm shadow-blue-500/5 ring-1 ring-gray-100"
                      : "text-gray-400 hover:text-gray-600",
                  )}
                >
                  <MessageCircle
                    className={clsx(
                      "w-4 h-4",
                      activeTab === "reviews"
                        ? "text-blue-500"
                        : "text-gray-300",
                    )}
                  />
                  리뷰 모아보기 ({shop.reviews})
                </button>
              </div>

              {activeTab === "info" ? (
                <div className="space-y-1 pt-2">
                  {[
                    {
                      label: "주소",
                      value: shop.address,
                      icon: MapPin,
                      action: copyAddress,
                      actionIcon: Copy,
                    },
                    {
                      label: "연락처",
                      value: shop.phone,
                      icon: Phone,
                      action: copyPhone,
                      actionIcon: Copy,
                      isTel: true,
                    },
                    {
                      label: "특징",
                      value: shop.tags.join(", "),
                      icon: Star,
                    },
                    {
                      label: "정보 확인일",
                      value: `✅ ${new Date(shop.last_verified_at).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })}`,
                      icon: RefreshCw,
                      isSpecial: true,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center py-5 border-b border-slate-50 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-slate-50/50 rounded-xl flex items-center justify-center shrink-0 mr-4 group-hover:bg-blue-50 transition-colors">
                        <item.icon className="w-4.5 h-4.5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                          {item.label}
                        </span>
                        {item.isTel ? (
                          <a
                            href={`tel:${item.value}`}
                            className="text-l font-bold text-slate-800 hover:text-blue-600 transition-colors block w-fit"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span
                            className={clsx(
                              "text-l font-bold block truncate",
                              item.isSpecial
                                ? "text-blue-600/80"
                                : "text-slate-800",
                            )}
                          >
                            {item.value}
                          </span>
                        )}
                      </div>
                      {item.action && (
                        <button
                          onClick={item.action}
                          className="p-2.5 ml-2 hover:bg-slate-50 rounded-xl text-slate-300 hover:text-blue-600 transition-all active:scale-90"
                        >
                          <item.actionIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {isLoadingReviews ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      <p className="text-sm font-bold">
                        리뷰를 불러오고 있습니다...
                      </p>
                    </div>
                  ) : reviewsData.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 py-2">
                      {reviewsData.map((review) => (
                        <a
                          key={review.id}
                          href={review.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-white border border-gray-100 p-6 rounded-[24px] hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex justify-between items-start mb-4">
                            <div className="space-y-2 flex-1 pr-4">
                              <h6 className="text-lg font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                {review.title}
                              </h6>
                              <div className="flex items-center gap-2">
                                <div className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-md border border-blue-100/50">
                                  {review.source}
                                </div>
                                <span className="text-[11px] font-bold text-gray-400 tracking-tight">
                                  {new Date(
                                    review.created_at,
                                  ).toLocaleDateString("ko-KR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-400 transition-all shrink-0">
                              <ExternalLink className="w-5 h-5" />
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-500">
                              {review.author[0]}
                            </div>
                            <span className="text-sm font-bold text-gray-600">
                              {review.author}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-24 text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="text-sm font-bold opacity-60 mb-1">
                        아직 작성된 리뷰가 없습니다.
                      </p>
                      <p className="text-[11px]">
                        첫 후기의 주인공이 되어보세요!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Side Affiliate (PC Only) */}
          {!isMobile && (
            <div className="col-span-3 space-y-6">
              <div className="sticky top-40 space-y-6">
                {sidebarBanner ? (
                  <div className="space-y-3">
                    <div className="w-[200px] ml-auto flex justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm p-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: sidebarBanner.html_code,
                        }}
                        className="w-full flex justify-center"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <h4 className="font-black text-gray-900 mb-6 flex items-center justify-between">
                      함께 구매하면 좋은 장비
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </h4>
                    <div className="space-y-5">
                      {[
                        {
                          name: "그랜즈 레미디 (냄새 제거)",
                          price: "18,000원",
                          img: "https://images.unsplash.com/photo-1556228578-8c7c2f971c91?q=80&w=200",
                        },
                        {
                          name: "라 스포르티바 초크백",
                          price: "25,000원",
                          img: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=200",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-4 group cursor-pointer"
                        >
                          <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden shrink-0 group-hover:bg-blue-50 transition-colors relative">
                            <Image
                              src={item.img}
                              fill
                              className="object-contain p-2"
                              alt={item.name}
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <div className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[11px] font-bold text-gray-400 mt-1">
                              {item.price}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 text-center">
                  <p className="text-[11px] text-gray-500 font-black mb-3 italic">
                    "리솔을 기다리는 동안 실력을 키우세요!"
                  </p>
                  <button className="w-full py-3 bg-orange-500 text-white rounded-xl text-xs font-black shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <Zap className="w-3.5 h-3.5" />
                    클라이밍 트레이닝 가이드 보기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Footer CTA ( 행동 영역 ) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 flex gap-3 z-30">
        <a
          href={`tel:${shop.phone}`}
          className="flex-1 bg-gray-900 text-white h-14 rounded-2xl flex items-center justify-center gap-2 font-black shadow-xl hover:bg-black transition-all active:scale-95"
        >
          <Phone className="w-5 h-5 fill-current" />
          상세 상담 전화하기
        </a>
      </div>

      {/* Process Detail Modal */}
      {isProcessModalOpen && shop.process && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsProcessModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 pb-6 border-b border-gray-100 flex items-start justify-between bg-white sticky top-0 z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                    절차 안내
                  </h3>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-black uppercase tracking-widest leading-none">
                    PROCESS
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-400">
                  {shop.name}의 수선 접수 및 진행 절차
                </p>
              </div>
              <button
                onClick={() => setIsProcessModalOpen(false)}
                className="p-2.5 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all active:scale-95"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            <div className="px-8 py-8 overflow-y-auto max-h-[60vh] scrollbar-hide">
              <div className="space-y-6">
                {shop.process.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex-none w-7 h-7 bg-gray-900 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <p className="text-base font-bold text-gray-800 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-gray-100 space-y-6 rounded-b-3xl">
              {shop.process.source_url && (
                <a
                  href={shop.process.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-2 font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98] group"
                >
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                  {shop.process.source_text || "공식 접수 가이드 확인"}
                </a>
              )}

              <div className="pt-2">
                <p className="text-sm text-gray-400 font-bold leading-relaxed text-center opacity-80">
                  * 위 정보는 수선 업체의 공지 및 사용자 제보 등을 바탕으로
                  작성되었습니다.
                  <br />
                  업체 상황에 따라 절차가 변경될 수 있으니 접수 전 확인을
                  바랍니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prices Detail Modal */}
      {isPricesModalOpen && shop.prices && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsPricesModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 pb-6 border-b border-gray-100 flex items-start justify-between bg-white sticky top-0 z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                    수선 가격표
                  </h3>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-black uppercase tracking-widest leading-none">
                    PRICES
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-400">
                  {shop.name}의 상세 수선 항목 및 예상 비용
                </p>
              </div>
              <button
                onClick={() => setIsPricesModalOpen(false)}
                className="p-2.5 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all active:scale-95"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            <div className="px-8 py-4 overflow-y-auto max-h-[60vh] scrollbar-hide">
              <div className="divide-y divide-gray-100">
                {shop.prices.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-5 group"
                  >
                    <span className="text-base font-bold text-gray-700 tracking-tight group-hover:text-gray-900 transition-colors">
                      {item.service_name}
                    </span>
                    <span className="text-xl font-black text-blue-600 shrink-0 tabular-nums">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-gray-100 space-y-6 rounded-b-3xl">
              {/* 중복 제거된 출처 버튼들 */}
              <div className="space-y-3">
                {Array.from(
                  new Set(
                    shop.prices.map((p) => p.description).filter(Boolean),
                  ),
                ).map((desc, idx) => {
                  const urlMatch = desc?.match(/https?:\/\/[^\s\)\]]+/);
                  const url = urlMatch ? urlMatch[0] : null;
                  const label = desc
                    ?.replace(/[\(\[]?https?:\/\/[^\s\)\]]+[\)\]]?/g, "")
                    .trim();

                  return url ? (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-2 font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98] group"
                    >
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                      {label || "공식 사이트"}
                    </a>
                  ) : (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-100 shadow-sm"
                    >
                      <Info className="w-3.5 h-3.5 text-blue-500" />
                      <p className="text-[11px] text-gray-500 font-bold leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <p className="text-sm text-gray-400 font-bold leading-relaxed text-center opacity-80">
                  * 위 가격은 수선 업체의 공지 및 사용자 제보를 바탕으로
                  작성되었습니다.
                  <br />
                  실제 수선 부위나 신발 상태에 따라 차이가 발생할 수 있으므로,
                  <br />
                  정확한 견적은 업체 상담을 통해 확인해 주세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Business Hours Detail Modal */}
      {isHoursModalOpen && shop.business_hours && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsHoursModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 pb-6 border-b border-gray-100 flex items-start justify-between bg-white sticky top-0 z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                    영업시간 상세
                  </h3>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-black uppercase tracking-widest leading-none">
                    HOURS
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-400">
                  {shop.name}의 운영 시간 및 휴게 안내
                </p>
              </div>
              <button
                onClick={() => setIsHoursModalOpen(false)}
                className="p-2.5 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all active:scale-95"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            <div className="px-8 py-8 overflow-y-auto max-h-[60vh] scrollbar-hide">
              <div className="space-y-8">
                {/* 메인 영업시간 */}
                <div>
                  <h5 className="text-[11px] font-black text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    운영 시간
                  </h5>
                  <p className="text-xl font-black text-gray-900 leading-tight whitespace-pre-wrap">
                    {shop.business_hours.text}
                  </p>
                </div>

                {/* 휴게시간 */}
                {shop.business_hours.break_time && (
                  <div>
                    <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5" />
                      휴게 시간 (BREAK)
                    </h5>
                    <p className="text-base font-bold text-gray-700">
                      {shop.business_hours.break_time}
                    </p>
                  </div>
                )}

                {/* 특이사항 */}
                {shop.business_hours.details && (
                  <div>
                    <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Info className="w-3.5 h-3.5" />
                      안내 및 특이사항
                    </h5>
                    <p className="text-sm font-bold text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {shop.business_hours.details}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-gray-100 space-y-4 rounded-b-3xl">
              {shop.business_hours.link && (
                <a
                  href={shop.business_hours.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-2 font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98] group"
                >
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                  {shop.business_hours.link_text ||
                    "공식 안내 확인하기 (영업 공지)"}
                </a>
              )}

              <div className="pt-2">
                <p className="text-sm text-gray-400 font-bold leading-relaxed text-center opacity-80">
                  * 위 정보는 수선 업체의 공지 및 사용자 제보 등을 바탕으로
                  작성되었습니다.
                  <br />
                  정기 휴무 및 공휴일 운영 여부는 방문 전 확인을 바랍니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
