import { useState } from "react";
import Image from "next/image";
import { Shop } from "@/lib/constants";
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
} from "lucide-react";
import clsx from "clsx";

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

  const copyAddress = () => {
    navigator.clipboard.writeText(shop.address);
    alert("주소가 복사되었습니다.");
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* 
        Zone 0: Top Navigation (PC close only, Mobile might need back) 
        On PC, this is the sticky header we had.
      */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <h2 className="text-lg font-bold text-gray-900 truncate">
            {shop.name}
          </h2>
          <BadgeCheck className="w-5 h-5 text-blue-500 shrink-0" />
        </div>
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
          {/* Hero Overlay */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {shop.is_verified && (
              <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full shadow-lg flex items-center gap-1">
                <BadgeCheck className="w-3 h-3" /> VERIFIED
              </span>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div
          className={clsx("p-5", !isMobile && "grid grid-cols-12 gap-8 px-8")}
        >
          {/* Main Column */}
          <div className={clsx(!isMobile ? "col-span-7" : "w-full")}>
            {/* Title & Tags */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                  {shop.name}
                </h1>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-black text-yellow-700">
                    {shop.rating}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {shop.tags.map((tag) => (
                  <span key={tag} className="text-sm font-bold text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Zone 2: Quick Specs Grid (2x2) */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    가격
                  </span>
                </div>
                <div className="text-lg font-black text-gray-900 line-clamp-1">
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
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    소요 기간
                  </span>
                </div>
                <div className="text-lg font-black text-gray-900">
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
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    수선 절차
                  </span>
                </div>
                <div className="text-sm font-black text-gray-900 line-clamp-1">
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
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    영업시간
                  </span>
                </div>
                <div className="text-sm font-black text-gray-900 line-clamp-1">
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
            <div className="mb-10 bg-[#f8f7f2] rounded-3xl p-6 border border-[#eceae0] flex gap-5 items-center group cursor-pointer hover:shadow-md transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <span className="text-xs font-black text-amber-700">
                    리엣지의 추천 꿀팁
                  </span>
                </div>
                <h4 className="text-base font-bold text-gray-900 leading-snug mb-1">
                  "보내시기 전, 마법의 가루 한 번이면 사장님이 감동합니다."
                </h4>
                <p className="text-xs text-gray-500 mb-4 tracking-tight">
                  냄새 싹 사라지는 마법의 가루 확인하기
                </p>
                <div className="inline-flex items-center text-[11px] font-black text-gray-900 group-hover:gap-2 transition-all">
                  추천 제품 보기 <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </div>
              <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden shadow-sm shrink-0 p-2 relative">
                <Image
                  src="https://images.unsplash.com/photo-1556228578-8c7c2f971c91"
                  fill
                  className="object-contain p-2"
                  alt="Product"
                />
              </div>
            </div>

            {/* Zone 4: Details & Actions */}
            <div>
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-100 mb-6 sticky top-[53px] bg-white/95 z-20">
                <button
                  onClick={() => setActiveTab("info")}
                  className={clsx(
                    "flex-1 py-4 text-sm font-black transition-all",
                    activeTab === "info"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-400",
                  )}
                >
                  상세 정보
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={clsx(
                    "flex-1 py-4 text-sm font-black transition-all",
                    activeTab === "reviews"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-400",
                  )}
                >
                  리뷰 ({shop.reviews})
                </button>
              </div>

              {activeTab === "info" ? (
                <div className="space-y-8">
                  <div>
                    <h5 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                      업체 정보 요약
                    </h5>
                    <div className="bg-gray-50 p-5 rounded-2xl text-sm text-gray-600 leading-relaxed italic border-l-4 border-gray-200">
                      "수십 년 경력의 장인이 직접 정성을 다해 수선합니다. 비브람
                      창갈이 전문이며, 택배 접수도 환영합니다. 언제든 문의
                      주세요!"
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                      영업 정보
                    </h5>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-50">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">
                          Address
                        </span>
                        <span className="text-xs font-black text-gray-900">
                          {shop.address}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-gray-50">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">
                          Status
                        </span>
                        <span
                          className={clsx(
                            "text-xs font-black",
                            shop.is_verified
                              ? "text-green-600"
                              : "text-gray-400",
                          )}
                        >
                          {shop.is_verified ? "영업중" : "준비중"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-gray-400 text-sm font-bold">
                  아직 작성된 리뷰가 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* Side Affiliate (PC Only) */}
          {!isMobile && (
            <div className="col-span-5 space-y-6">
              <div className="sticky top-40 space-y-6">
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
                      <div key={i} className="flex gap-4 group cursor-pointer">
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

                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 text-center">
                  <p className="text-[11px] text-gray-500 font-black mb-3 italic">
                    "리솔을 기다리는 동안 실력을 키우세요!"
                  </p>
                  <button className="w-full py-3 bg-white text-gray-900 rounded-xl text-xs font-black border border-gray-200 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
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
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black mb-2 text-gray-900">
                  절차 안내(PROCESS)
                </h3>
                <p className="text-xl text-gray-400 font-bold uppercase tracking-wider">
                  {shop.name}
                </p>
              </div>
              <button
                onClick={() => setIsProcessModalOpen(false)}
                className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {shop.process.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-none w-6 h-6 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xs font-black">
                      {idx + 1}
                    </div>
                    <p className="text-sm font-bold text-gray-800 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50">
                <a
                  href={shop.process.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center gap-2 font-black text-sm hover:bg-blue-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {shop.process.source_text || "공식 접수 가이드 확인"}
                </a>
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
                      출처: {label || "공식 사이트"}
                    </a>
                  ) : (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-100 shadow-sm"
                    >
                      <Info className="w-3.5 h-3.5 text-blue-500" />
                      <p className="text-[11px] text-gray-500 font-bold leading-relaxed">
                        출처 : {desc}
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
