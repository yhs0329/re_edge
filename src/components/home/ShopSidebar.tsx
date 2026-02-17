"use client";

import { SHOPS, Shop } from "@/lib/constants";
import { MapPin, Star, ChevronLeft, Search } from "lucide-react";
import clsx from "clsx";
import ShopDetailView from "@/components/shop/ShopDetailView";

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
  const selectedShop = SHOPS.find((s) => s.id === selectedShopId);

  return (
    <aside
      className={clsx(
        "hidden md:flex flex-col h-full bg-white border-r border-gray-200 z-30 shadow-xl overflow-visible transition-all duration-500 ease-in-out relative",
        selectedShopId ? "w-[50%]" : "w-[30%] min-w-[380px] max-w-[500px]",
      )}
    >
      {/* Collapse Button (Expanded View Only) */}
      {selectedShopId && (
        <button
          onClick={() => onSelectShop(0)}
          className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-gray-50 transition-all z-50 group active:scale-95 cursor-pointer"
          title="목록으로 돌아가기"
        >
          <ChevronLeft className="w-7 h-7 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {selectedShop ? (
        <ShopDetailView
          shop={selectedShop}
          onClose={() => onSelectShop(0)}
          isMobile={false}
        />
      ) : (
        <>
          {/* Header & Filters */}
          <div className="p-6 border-b border-gray-100 shrink-0">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              전국 리솔 전문점{" "}
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md text-sm">
                {SHOPS.length}
              </span>
            </h2>

            {/* Search Bar */}
            <div className="relative group mb-4">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="이름, 지역으로 검색"
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all"
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

          {/* Shop List */}
          <div className="flex-1 overflow-y-auto bg-gray-50/30 p-4 space-y-4 scrollbar-hide">
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
                    Array.from({ length: 3 - shop.images.length }).map(
                      (_, idx) => (
                        <div
                          key={`empty-${idx}`}
                          className="bg-gray-100 flex items-center justify-center"
                        >
                          <div className="w-4 h-4 rounded-full bg-gray-200" />
                        </div>
                      ),
                    )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
