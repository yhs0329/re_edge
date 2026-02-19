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
import { SHOPS } from "@/lib/constants";
import ShopDetailView from "@/components/shop/ShopDetailView";

interface ShopBottomSheetProps {
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
      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
      active
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
    )}
  >
    {label}
  </button>
);

export default function ShopBottomSheet({
  selectedShopId,
  onSelectShop,
  shops,
}: ShopBottomSheetProps & { shops: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const dragControls = useDragControls();
  const listRef = useRef<HTMLDivElement>(null);

  // Sort shops so selected one appears first
  const sortedShops = useMemo(() => {
    if (!selectedShopId) return shops;
    return [...shops].sort((a, b) => {
      if (a.id === selectedShopId) return -1;
      if (b.id === selectedShopId) return 1;
      return 0;
    });
  }, [selectedShopId, shops]);

  const selectedShop = shops.find((s) => s.id === selectedShopId);

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
      controls.start({ y: SNAP_POINTS.COLLAPSED });
    }
  }, [selectedShopId, controls, SNAP_POINTS.PEEK, SNAP_POINTS.COLLAPSED]);

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
      className="md:hidden absolute bottom-0 left-0 right-0 z-40 flex h-[85vh] flex-col rounded-t-3xl bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.1)] overflow-hidden will-change-transform"
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
        <div className="px-5 pb-4 border-b border-gray-100 shrink-0 bg-white relative">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">
              내 주변 리솔샵{" "}
              <span className="text-blue-600">{shops.length}</span>
            </h2>
            {/* Close Button (Visible when open) */}
            {isOpen && (
              <button
                onClick={toggleSheet}
                className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                aria-label="Close List"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <FilterChip label="전체" active />
            <FilterChip label="비브람" />
            <FilterChip label="택배가능" />
            <FilterChip label="영업중" />
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-hidden bg-gray-50/50">
        {selectedShop ? (
          <ShopDetailView
            shop={selectedShop}
            onClose={() => onSelectShop(0)}
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
                  onClick={() => onSelectShop(shop.id)}
                  className={clsx(
                    "bg-white p-5 rounded-2xl border transition-all active:scale-[0.98] duration-200",
                    selectedShopId === shop.id
                      ? "border-blue-500 shadow-md ring-1 ring-blue-500 bg-blue-50/10"
                      : "border-gray-100 shadow-sm",
                  )}
                >
                  {/* Header: Title, Category, Status */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900 leading-tight truncate max-w-[180px]">
                          {shop.name}
                        </h3>
                        <span className="text-[10px] text-blue-500 font-bold border border-blue-100 px-1 rounded whitespace-nowrap">
                          리솔
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span
                          className={clsx(
                            "font-bold",
                            shop.is_verified
                              ? "text-green-600"
                              : "text-gray-400",
                          )}
                        >
                          {shop.is_verified ? "영업중" : "준비중"}
                        </span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center">
                          리뷰{" "}
                          <span className="font-bold ml-1 text-gray-700">
                            0
                          </span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 fill-current mr-0.5" />
                          <span className="font-bold text-gray-700">0.0</span>
                        </div>
                      </div>

                      <div className="flex items-center text-xs text-gray-500 line-clamp-1 mb-3">
                        <MapPin className="w-3 h-3 mr-1 shrink-0" />
                        <span className="truncate">{shop.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Photos Grid */}
                  <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden h-24 mb-3">
                    {shop.images && shop.images.length > 0 ? (
                      shop.images
                        .slice(0, 3)
                        .map((img: string, idx: number) => (
                          <div
                            key={idx}
                            className="relative aspect-square w-full"
                          >
                            <img
                              src={img}
                              alt={`${shop.name} photo ${idx}`}
                              className="w-full h-full object-cover"
                            />
                            {idx === 2 && shop.images.length > 3 && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[10px] font-bold">
                                +{shop.images.length - 3}
                              </div>
                            )}
                          </div>
                        ))
                    ) : (
                      <div className="col-span-3 bg-gray-100 flex items-center justify-center rounded-xl">
                        <p className="text-[10px] text-gray-400 font-bold">
                          준비된 사진이 없습니다
                        </p>
                      </div>
                    )}
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
