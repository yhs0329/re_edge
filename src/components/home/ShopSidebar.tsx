"use client";

import { MapPin, Star, ChevronLeft, Search } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import ShopDetailView from "@/components/shop/ShopDetailView";
import { Shop } from "@/lib/constants";

interface ShopSidebarProps {
  selectedShopId: string | null; // 실제로는 슬러그가 전달됨
  onSelectShop: (slug: string | null) => void;
}

const FilterChip = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => (
  <button
    className={clsx(
      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border shrink-0",
      active
        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
    )}
  >
    {label}
  </button>
);

export default function ShopSidebar({
  selectedShopId,
  onSelectShop,
  shops,
}: ShopSidebarProps & { shops: Shop[] }) {
  // ID 대신 slug로 검색
  const selectedShop = shops.find((s) => s.slug === selectedShopId);

  return (
    <aside className="hidden md:flex h-full w-[20%] min-w-[320px] max-w-[400px] bg-white border-r border-gray-200 z-30 shadow-xl overflow-visible relative">
      {/* List Panel (Always visible, fixed 20% area ratio equivalent) */}
      <div className="flex flex-col h-full w-full">
        {/* Header & Filters */}
        <div className="p-4 border-b border-gray-100 shrink-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            전국 리솔 전문점
            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md text-xs">
              {shops.length}
            </span>
          </h2>

          {/* Search Bar */}
          <div className="relative group mb-3">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="이름, 지역 검색"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all"
              readOnly
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            <FilterChip label="전체" active />
            <FilterChip label="비브람" />
            <FilterChip label="택배가능" />
            <FilterChip label="영업중" />
          </div>
        </div>

        {/* Shop List Items */}
        <div className="flex-1 overflow-y-auto bg-gray-50/20 p-3 space-y-3 scrollbar-hide">
          {shops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => onSelectShop(shop.slug)}
              className={clsx(
                "p-3 rounded-lg border transition-all cursor-pointer group",
                selectedShopId === shop.slug
                  ? "bg-white border-blue-500 shadow-md ring-1 ring-blue-500"
                  : "bg-white border-gray-100 shadow-sm hover:border-blue-200 hover:shadow",
              )}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3
                    className={clsx(
                      "font-bold text-2xl transition-colors truncate max-w-[140px]",
                      selectedShopId === shop.slug
                        ? "text-blue-600"
                        : "text-gray-900 group-hover:text-blue-600",
                    )}
                  >
                    {shop.name}
                  </h3>
                  <span className="text-sm text-blue-500 font-medium">
                    리솔
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                  <span
                    className={clsx(
                      "font-bold",
                      shop.is_verified ? "text-green-600" : "text-gray-400",
                    )}
                  >
                    {shop.is_verified ? "사업주 인증됨" : ""}
                  </span>
                </div>

                {/* Narrow photos (2 cols) */}
                <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden h-20">
                  {shop.images && shop.images.length > 0 ? (
                    shop.images.slice(0, 2).map((img: string, idx: number) => (
                      <div key={idx} className="relative aspect-square w-full">
                        <Image
                          src={img}
                          alt={`${shop.name} photo ${idx}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 150px"
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 bg-gray-100 flex items-center justify-center rounded-lg">
                      <p className="text-[9px] text-gray-400 font-bold">
                        사진 준비중
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel (50% area) */}
      <div
        className={clsx(
          "absolute top-16 bottom-4 left-[calc(100%+12px)] w-[50vw] bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-500 overflow-hidden",
          selectedShopId
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4 pointer-events-none",
        )}
      >
        {selectedShop && (
          <ShopDetailView
            shop={selectedShop}
            onClose={() => onSelectShop(null)}
            isMobile={false}
          />
        )}
      </div>
    </aside>
  );
}
