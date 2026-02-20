"use client";

import { MapPin, Star, ChevronLeft, Search, Check } from "lucide-react";
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
      "px-4 py-2 rounded-xl text-[11px] font-bold transition-all duration-300 border shrink-0 active:scale-95",
      active
        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
        : "bg-white text-slate-500 border-slate-100 hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50/50",
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
        <div className="p-5 border-b border-slate-100 shrink-0 bg-linear-to-b from-white to-slate-50/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              전국 리솔 전문점
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg text-[10px] font-black border border-blue-100/50 shadow-sm shadow-blue-500/5">
                {shops.length}
              </span>
            </h2>
          </div>

          {/* Search Bar (Premium Style) */}
          <div className="relative group mb-4">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="이름, 지역 검색"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-xs text-slate-800 placeholder-slate-400 shadow-sm shadow-slate-200/50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
              readOnly
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <FilterChip label="전체" active />
            <FilterChip label="비브람" />
            <FilterChip label="택배가능" />
            <FilterChip label="영업중" />
          </div>
        </div>

        {/* Shop List Items */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 space-y-4 scrollbar-hide">
          {shops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => onSelectShop(shop.slug)}
              className={clsx(
                "p-4 rounded-[24px] border transition-all duration-300 cursor-pointer group relative overflow-hidden",
                selectedShopId === shop.slug
                  ? "bg-white border-blue-500 shadow-xl shadow-blue-500/10 -translate-y-1"
                  : "bg-white border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5",
              )}
            >
              {selectedShopId === shop.slug && (
                <div className="absolute top-0 right-0 p-1.5 bg-blue-500 rounded-bl-xl text-white">
                  <Check className="w-3 h-3 stroke-3" />
                </div>
              )}

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3
                    className={clsx(
                      "font-black text-xl tracking-tight transition-colors truncate max-w-[150px]",
                      selectedShopId === shop.slug
                        ? "text-blue-600"
                        : "text-slate-900 group-hover:text-blue-600",
                    )}
                  >
                    {shop.name}
                  </h3>
                  <div className="px-1.5 py-0.5 bg-slate-50 text-slate-400 text-[10px] font-black rounded-md border border-slate-100">
                    리솔
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs mb-4">
                  {shop.is_verified && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 font-bold rounded-md border border-green-100/50">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      사업주 인증됨
                    </span>
                  )}
                </div>

                {/* Photos or Premium Placeholder */}
                <div className="grid grid-cols-2 gap-1.5 rounded-2xl overflow-hidden h-24 border border-slate-50/50 shadow-inner">
                  {shop.images && shop.images.length > 0 ? (
                    shop.images.slice(0, 2).map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="relative aspect-square w-full bg-slate-100"
                      >
                        <Image
                          src={img}
                          alt={`${shop.name} photo ${idx}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 150px"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 bg-linear-to-tr from-slate-50 to-slate-100/50 flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-50" />
                      <div className="w-8 h-8 rounded-full bg-white/80 shadow-sm flex items-center justify-center mb-1 shadow-slate-200">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 text-slate-200 fill-current"
                        >
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                      </div>
                      <p className="text-[10px] text-slate-300 font-black tracking-widest uppercase">
                        Preparing Photos
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
