"use client";

import { useState } from "react";
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

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {/* Zone 1: Hero Section (Slider Concept) */}
        <div className="relative w-full overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {shop.images.map((img, idx) => (
              <div
                key={idx}
                className="flex-none w-full snap-start aspect-4/3 max-h-[400px]"
              >
                <img
                  src={img}
                  alt={`${shop.name} view ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Hero Overlay */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full shadow-lg flex items-center gap-1">
              <BadgeCheck className="w-3 h-3" /> VERIFIED
            </span>
          </div>
          {/* Photo Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md font-bold">
            1 / {shop.images.length}
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
                  <span
                    key={tag}
                    className="text-[11px] font-bold text-gray-400"
                  >
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
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Prices
                  </span>
                </div>
                <div className="text-lg font-black text-gray-900">
                  {shop.priceInfo || "별도 문의"}
                </div>
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Turnaround
                  </span>
                </div>
                <div className="text-lg font-black text-gray-900">
                  {shop.duration || "약 2주"}
                </div>
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <Zap className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Rubber
                  </span>
                </div>
                <div className="text-sm font-black text-gray-900 line-clamp-1">
                  {shop.rubberInfo || "Vibram 전문"}
                </div>
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <Truck className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Delivery
                  </span>
                </div>
                <div className="text-sm font-black text-gray-900">
                  {shop.deliveryInfo || "택배 가능"}
                </div>
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
                    사장님의 리솔 꿀팁
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
              <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden shadow-sm shrink-0 p-2">
                <img
                  src="https://images.unsplash.com/photo-1556228578-8c7c2f971c91?q=80&w=200&auto=format&fit=crop"
                  className="w-full h-full object-contain"
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
                      사장님 한마디
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
                            shop.status === "영업중"
                              ? "text-green-600"
                              : "text-red-500",
                          )}
                        >
                          {shop.status}
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
                        <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden p-2 shrink-0 group-hover:bg-blue-50 transition-colors">
                          <img
                            src={item.img}
                            className="w-full h-full object-contain"
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
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 flex gap-3 z-50">
        <button
          onClick={copyAddress}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-gray-900 py-4 rounded-2xl text-sm font-black active:scale-95 transition-all border border-gray-100"
        >
          <Copy className="w-4 h-4" />
          주소 복사
        </button>
        <a
          href={`tel:02-1234-5678`}
          className="flex-[1.5] flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl text-sm font-black shadow-xl shadow-blue-100 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 fill-current" />
          전화 상담하기
        </a>
      </div>
    </div>
  );
}
