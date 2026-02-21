"use client";

import {
  AnimatePresence,
  motion,
  PanInfo,
  useAnimation,
  useDragControls,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Star,
  List,
  X,
  ChevronRight,
  Search,
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { Shop, SHOPS } from "@/lib/constants";
import ShopDetailView from "@/components/shop/ShopDetailView";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface ShopBottomSheetProps {
  selectedShopId: string | null; // 실제로는 슬러그가 전달됨
  onSelectShop: (slug: string | null) => void;
}

const REGIONS = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

const FilterChip = ({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
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

export default function ShopBottomSheet({
  selectedShopId,
  onSelectShop,
  shops,
}: ShopBottomSheetProps & { shops: Shop[] }) {
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedRegion = searchParams.get("region");
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const timerRef = useRef<NodeJS.Timeout>(null);

  // URL 파라미터가 변경될 때 로컬 검색어 상태 동기화
  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // 즉시 검색 실행 함수
  const handleSearch = (value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const params = new URLSearchParams(searchParams.toString());
    const currentQuery = searchParams.get("q") || "";

    if (value === currentQuery) return;

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // 검색어 데바운스 처리
  useEffect(() => {
    if (searchQuery === (searchParams.get("q") || "")) return;

    timerRef.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchQuery, pathname, router, searchParams]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  const handleRegionSelect = (region: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (region) {
      params.set("region", region);
    } else {
      params.delete("region");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsRegionOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsRegionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sort shops so selected one appears first
  const sortedShops = useMemo(() => {
    if (!selectedShopId) return shops;
    return [...shops].sort((a, b) => {
      if (a.slug === selectedShopId) return -1;
      if (b.slug === selectedShopId) return 1;
      return 0;
    });
  }, [selectedShopId, shops]);

  const selectedShop = shops.find((s) => s.slug === selectedShopId);

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* 1. Mobile Sticky Header Area */}
      {!selectedShop && (
        <div className="sticky top-0 z-50 bg-white border-b border-slate-100 px-5 pt-4 pb-4">
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              Re:<span className="text-blue-600">Edge</span>
            </h1>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              전국 리솔 전문점{" "}
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg text-xs font-black border border-blue-100/50">
                {shops.length}
              </span>
            </h2>
          </div>

          {/* Search Bar (Mobile Style) */}
          <div className="relative group mb-4">
            <button
              onClick={() => handleSearch(searchQuery)}
              className="absolute inset-y-0 left-3.5 flex items-center"
            >
              <Search className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </button>
            <input
              type="text"
              placeholder="이름, 지역 검색"
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-100 rounded-xl text-xs text-slate-800 placeholder-slate-400 shadow-sm shadow-slate-200/50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleSearch("");
                }}
                className="absolute inset-y-0 right-3 flex items-center text-slate-300 hover:text-slate-500 transition-colors"
                aria-label="검색어 초기화"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2 relative">
            <FilterChip
              label="전체"
              active={!selectedRegion}
              onClick={() => handleRegionSelect(null)}
            />

            {/* Region Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsRegionOpen(!isRegionOpen)}
                className={clsx(
                  "px-4 py-2 rounded-xl text-[11px] font-bold transition-all duration-300 border shrink-0 flex items-center gap-1 active:scale-95",
                  isRegionOpen || selectedRegion
                    ? "bg-blue-50 text-blue-600 border-blue-200 shadow-sm"
                    : "bg-white text-slate-500 border-slate-100 hover:border-blue-200 hover:text-blue-500",
                  selectedRegion &&
                    "bg-blue-600 text-white! border-blue-600 shadow-lg shadow-blue-500/20",
                )}
              >
                {selectedRegion || "지역별"}
                <ChevronDown
                  className={clsx(
                    "w-3 h-3 transition-transform duration-300",
                    isRegionOpen && "rotate-180",
                  )}
                />
              </button>

              {isRegionOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-2xl p-3 z-50 grid grid-cols-4 gap-1 animate-in fade-in zoom-in duration-200">
                  {REGIONS.map((region) => (
                    <button
                      key={region}
                      className={clsx(
                        "py-2 text-[10px] font-bold rounded-lg transition-colors",
                        selectedRegion === region
                          ? "bg-blue-500 text-white"
                          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600",
                      )}
                      onClick={() => handleRegionSelect(region)}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50/50">
        {selectedShop ? (
          <ShopDetailView
            shop={selectedShop}
            onClose={() => onSelectShop(null)}
            isMobile={true}
          />
        ) : (
          <div ref={listRef} className="px-4 py-4 space-y-3 pb-24">
            {sortedShops.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm border-dashed">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-900 font-black text-lg mb-2">
                  검색 결과가 없습니다
                </p>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                  검색어나 지역 필터를 변경하거나
                  <br />
                  모든 필터를 초기화해 보세요.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    handleRegionSelect(null);
                    handleSearch("");
                  }}
                  className="px-8 py-3 bg-blue-600 text-white text-xs font-black rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                >
                  검색 초기화
                </button>
              </div>
            ) : (
              sortedShops.map((shop) => (
                <div
                  key={shop.id}
                  onClick={() => onSelectShop(shop.slug)}
                  className={clsx(
                    "bg-white p-5 rounded-[28px] border transition-all duration-300 active:scale-[0.97]",
                    selectedShopId === shop.slug
                      ? "border-blue-500 shadow-xl shadow-blue-500/10 bg-blue-50/5 ring-1 ring-blue-500/20"
                      : "border-slate-100 shadow-sm shadow-slate-200/50",
                  )}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <h3 className="font-black text-xl text-slate-900 tracking-tight truncate">
                          {shop.name}
                        </h3>
                        {shop.is_verified && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-md border border-green-100/50 whitespace-nowrap">
                            <svg
                              viewBox="0 0 24 24"
                              className="w-2.5 h-2.5 fill-current"
                            >
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                            인증됨
                          </span>
                        )}
                        <div className="px-1.5 py-0.5 bg-slate-50 text-slate-400 text-[10px] font-black rounded-md border border-slate-100 uppercase">
                          리솔
                        </div>
                      </div>

                      <div className="flex items-center text-xs text-slate-700 font-bold mb-3">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-500/50" />
                        <span className="truncate">{shop.address}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {shop.tags &&
                          shop.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[9px] font-black rounded-md border border-slate-100 uppercase tracking-tighter"
                            >
                              {tag}
                            </span>
                          ))}
                        {shop.tags && shop.tags.length > 3 && (
                          <span className="text-[9px] text-slate-300 font-black ml-0.5 self-center">
                            +{shop.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="text-center py-4 text-xs text-gray-400">
              모든 업체를 불러왔습니다.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
