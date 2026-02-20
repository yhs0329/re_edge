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
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { Shop, SHOPS } from "@/lib/constants";
import ShopDetailView from "@/components/shop/ShopDetailView";

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

export default function ShopBottomSheet({
  selectedShopId,
  onSelectShop,
  shops,
}: ShopBottomSheetProps & { shops: Shop[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const controls = useAnimation();
  const dragControls = useDragControls();
  const listRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Snap points
  const SNAP_POINTS = {
    COLLAPSED: "calc(100% - 140px)",
    PEEK: "calc(100% - 500px)",
    EXPANDED: "15%",
    FULL: "0%",
  };

  const toggleSheet = () => {
    if (isOpen) {
      controls.start({ y: SNAP_POINTS.COLLAPSED });
      setIsOpen(false);
    } else {
      controls.start({ y: SNAP_POINTS.EXPANDED });
      setIsOpen(true);
    }
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 100; // Drag distance to trigger snap
    if (info.offset.y < -threshold) {
      // Dragged up
      controls.start({ y: SNAP_POINTS.EXPANDED });
      setIsOpen(true);
    } else if (info.offset.y > threshold) {
      // Dragged down
      controls.start({ y: SNAP_POINTS.COLLAPSED });
      setIsOpen(false);
    } else {
      // Return to nearest state based on current velocity or position if needed
      // For simplicity, snap back to current state if threshold not met,
      // or toggle if clicked (can be handled separately)
    }
  };

  useEffect(() => {
    if (selectedShopId) {
      controls.start({ y: SNAP_POINTS.FULL });
      setIsOpen(true);
      // Scroll list to top so selected card is visible
      if (listRef.current) {
        listRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // 업체를 닫을 때는 완전히 닫지 않고 목록(EXPANDED) 상태로 유지
      // 만약 isOpen이 false인 상태에서 처음 로드되는 경우라면 COLLAPSED 유지
      if (isOpen) {
        controls.start({ y: SNAP_POINTS.EXPANDED });
        setIsOpen(true);
      } else {
        controls.start({ y: SNAP_POINTS.COLLAPSED });
      }
    }
  }, [
    selectedShopId,
    controls,
    SNAP_POINTS.PEEK,
    SNAP_POINTS.COLLAPSED,
    SNAP_POINTS.EXPANDED,
    SNAP_POINTS.FULL,
  ]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={controls}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="md:hidden absolute bottom-0 left-0 right-0 z-40 flex h-[85vh] flex-col rounded-t-3xl bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.1)] will-change-transform"
    >
      {/* Floating Trigger Button (Visible when collapsed) */}
      <motion.button
        onClick={toggleSheet}
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: isOpen ? 0 : 1,
          y: isOpen ? 20 : -60, // Move up when collapsed, hide down when open
          scale: isOpen ? 0.8 : 1,
          pointerEvents: isOpen ? "none" : "auto",
        }}
        transition={{ duration: 0.3 }}
        className="absolute left-1/2 -translate-x-1/2 z-50 bg-white px-5 py-3 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 text-sm font-bold text-gray-800 hover:bg-gray-50 active:scale-95"
      >
        <List className="w-4 h-4 text-blue-600" />
        <span>리솔샵 목록 보기</span>
        <ChevronUp className="w-4 h-4 text-gray-400" />
      </motion.button>

      {/* Handle Bar & Clickable Area */}
      <div
        className="flex w-full cursor-grab flex-col items-center pb-2 pt-3 active:cursor-grabbing touch-none"
        onClick={toggleSheet}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="h-1.5 w-12 rounded-full bg-gray-200" />
      </div>

      {/* Internal Close Button (Pill Shape) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="flex justify-center overflow-hidden pb-2"
          >
            <button
              onClick={toggleSheet}
              className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
            >
              <span>목록 닫기</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Filters */}
      {!selectedShop && (
        <div className="px-5 pb-5 border-b border-slate-100 shrink-0 bg-white relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              내 주변 리솔샵{" "}
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg text-xs font-black border border-blue-100/50">
                {shops.length}
              </span>
            </h2>
          </div>
          <div className="flex gap-2 pb-1 relative">
            <button onClick={() => setSelectedRegion(null)}>
              <FilterChip label="전체" active={!selectedRegion} />
            </button>

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
                      onClick={() => {
                        setSelectedRegion(region);
                        setIsRegionOpen(false);
                      }}
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

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-hidden bg-gray-50/50">
        {selectedShop ? (
          <ShopDetailView
            shop={selectedShop}
            onClose={() => onSelectShop(null)}
            isMobile={true}
          />
        ) : (
          <div
            ref={listRef}
            className="h-full overflow-y-auto overflow-x-hidden px-4 py-2 scrollbar-hide"
          >
            <div
              className={clsx(
                "space-y-3",
                isOpen ? "pb-24" : "pb-[calc(85vh-500px+120px)]",
              )}
            >
              {/* Bottom padding for FAB */}
              {sortedShops.map((shop) => (
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
                  {/* Header: Title, Category */}
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

                      {/* Row 3: 특징 태그 (최대 3개) */}
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
              ))}
              {/* Loading / End of list */}
              <div className="text-center py-4 text-xs text-gray-400">
                모든 업체를 불러왔습니다.
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
