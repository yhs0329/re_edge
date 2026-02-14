"use client";

import { motion, PanInfo, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, Phone, Star } from "lucide-react";
import clsx from "clsx";

// Dummy Data
const SHOPS = [
  {
    id: 1,
    name: "슈마스터",
    address: "서울 성동구 성수이로 118",
    rating: 4.8,
    reviews: 120,
    tags: ["Vibram", "C4", "택배가능"],
    status: "영업중",
  },
  {
    id: 2,
    name: "빅스톤 리페어",
    address: "경기 고양시 일산동구",
    rating: 4.9,
    reviews: 85,
    tags: ["Neo", "Edge", "택배가능"],
    status: "영업중",
  },
  {
    id: 3,
    name: "클라임 닥터",
    address: "서울 마포구",
    rating: 4.5,
    reviews: 42,
    tags: ["XS Grip", "자체고무"],
    status: "휴무",
  },
  {
    id: 4,
    name: "리솔 킹",
    address: "부산 해운대구",
    rating: 4.7,
    reviews: 15,
    tags: ["Vibram", "UnParallel"],
    status: "영업중",
  },
  {
    id: 5,
    name: "암벽화 병원",
    address: "대구 중구",
    rating: 4.6,
    reviews: 30,
    tags: ["Vibram"],
    status: "영업중",
  },
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
      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
      active
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
    )}
  >
    {label}
  </button>
);

export default function ShopBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  // Snap points (percentage of screen height from top)
  // Higher value = lower position
  const SNAP_POINTS = {
    COLLAPSED: "calc(100% - 140px)", // Shows handle + filters + top of list
    EXPANDED: "15%", // Almost full screen
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
    controls.start({ y: SNAP_POINTS.COLLAPSED });
  }, [controls]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={controls}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }} // Constraints are managed by controls
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="absolute bottom-0 left-0 right-0 z-40 h-[85vh] bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex flex-col will-change-transform"
    >
      {/* Handle Bar */}
      <div className="w-full flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div>

      {/* Header & Filters */}
      <div className="px-5 pb-4 border-b border-gray-100 shrink-0 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">
            내 주변 리솔샵 <span className="text-blue-600">{SHOPS.length}</span>
          </h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <FilterChip label="전체" active />
          <FilterChip label="비브람" />
          <FilterChip label="택배가능" />
          <FilterChip label="영업중" />
        </div>
      </div>

      {/* Shop List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-2 bg-gray-50/50">
        <div className="space-y-3 pb-20">
          {" "}
          {/* Bottom padding for FAB */}
          {SHOPS.map((shop) => (
            <div
              key={shop.id}
              className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow active:scale-[0.99] duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    {shop.name}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {shop.address}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={clsx(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded border",
                      shop.status === "영업중"
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-gray-100 text-gray-500 border-gray-200",
                    )}
                  >
                    {shop.status}
                  </span>
                  <div className="flex items-center text-yellow-500 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current mr-0.5" />
                    {shop.rating}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {shop.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {/* Loading / End of list */}
          <div className="text-center py-4 text-xs text-gray-400">
            모든 업체를 불러왔습니다.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
