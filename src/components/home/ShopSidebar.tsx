"use client";

import { SHOPS, Shop } from "@/lib/constants";
import { MapPin, Star, ChevronRight } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

interface ShopSidebarProps {
  selectedShopId: number | null;
  onSelectShop: (id: number) => void;
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
}: ShopSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-[420px] h-full bg-white border-r border-gray-200 z-30 shadow-xl overflow-hidden transition-all duration-300">
      {/* Header & Filters */}
      <div className="p-6 border-b border-gray-100 shrink-0">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          전국 리솔 전문점{" "}
          <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md text-sm">
            {SHOPS.length}
          </span>
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <FilterChip label="전체" active />
          <FilterChip label="비브람" />
          <FilterChip label="택배가능" />
          <FilterChip label="영업중" />
        </div>
      </div>

      {/* Shop List */}
      <div className="flex-1 overflow-y-auto bg-gray-50/30 p-4 space-y-4">
        {SHOPS.map((shop) => (
          <div
            key={shop.id}
            onClick={() => onSelectShop(shop.id)}
            className={clsx(
              "p-4 rounded-xl border transition-all cursor-pointer group",
              selectedShopId === shop.id
                ? "bg-white border-blue-500 shadow-md ring-1 ring-blue-500"
                : "bg-white border-gray-100 shadow-sm hover:border-blue-200 hover:shadow",
            )}
          >
            {/* Header: Title, Category, Status */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={clsx(
                      "font-bold text-lg transition-colors leading-tight",
                      selectedShopId === shop.id
                        ? "text-blue-600"
                        : "text-gray-900 group-hover:text-blue-600",
                    )}
                  >
                    {shop.name}
                  </h3>
                  <span className="text-xs text-blue-500 font-medium">
                    리솔
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span
                    className={clsx(
                      "font-bold",
                      shop.status === "영업중"
                        ? "text-green-600"
                        : "text-gray-400",
                    )}
                  >
                    {shop.status}
                  </span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center">
                    리뷰{" "}
                    <span className="font-bold ml-1 text-gray-700">
                      {shop.reviews.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-500 fill-current mr-0.5" />
                    <span className="font-bold text-gray-700">
                      {shop.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-xs text-gray-500 line-clamp-1 mb-3">
                  <MapPin className="w-3 h-3 mr-1 shrink-0" />
                  {shop.address}
                </div>
              </div>
            </div>

            {/* Photos (Naver Maps Style) */}
            <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden h-24 mb-3">
              {shop.images.slice(0, 3).map((img, idx) => (
                <div key={idx} className="relative aspect-square w-full">
                  <img
                    src={img}
                    alt={`${shop.name} photo ${idx}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {idx === 2 && shop.images.length > 3 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold">
                      +{shop.images.length - 3}
                    </div>
                  )}
                </div>
              ))}
              {shop.images.length < 3 &&
                Array.from({ length: 3 - shop.images.length }).map((_, idx) => (
                  <div
                    key={`empty-${idx}`}
                    className="bg-gray-100 flex items-center justify-center"
                  >
                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                  </div>
                ))}
            </div>

            {/* Step 2: Detail Button (Visible only when selected) */}
            {selectedShopId === shop.id && (
              <div className="mt-4 pt-4 border-t border-blue-100 flex gap-2">
                <Link
                  href={`/shop/${shop.id}`}
                  className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-1 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                >
                  상세보기
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
