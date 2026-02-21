"use client";

import {
  NaverMap,
  Container as MapDiv,
  useNavermaps,
  Marker,
} from "react-naver-maps";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronRight, X } from "lucide-react";
import { Shop } from "@/lib/constants";

export default function MapViewer({
  shops,
  onSelectShop,
  selectedShopId,
}: {
  shops: Shop[];
  onSelectShop: (slug: string | null, switchToList?: boolean) => void;
  selectedShopId: string | null;
}) {
  const selectedShop = useMemo(
    () => shops.find((s) => s.slug === selectedShopId),
    [shops, selectedShopId],
  );

  return (
    <MapDiv
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MyMap
        shops={shops}
        onSelectShop={onSelectShop}
        selectedShopId={selectedShopId}
      />

      {/* Mini Preview Card (Mobile only, shown when shop is selected) */}
      <div className="md:hidden">
        <AnimatePresence>
          {selectedShop && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-24 left-4 right-4 z-50 bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 flex gap-4 items-center group active:scale-[0.98] transition-all cursor-pointer"
              onClick={() => onSelectShop(selectedShopId, true)} // 상세 페이지로 이동 (LIST 뷰 전환)
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-lg text-slate-900 truncate">
                    {selectedShop.name}
                  </h3>
                  {selectedShop.is_verified && (
                    <span className="px-1.5 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-md border border-green-100/50 whitespace-nowrap">
                      인증됨
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xs text-slate-500 font-bold">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-500/50" />
                  <p className="truncate">{selectedShop.address}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectShop(null);
                  }}
                  className="p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-100 transition-colors self-end"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1 text-blue-600 font-black text-xs">
                  상세보기 <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MapDiv>
  );
}

function MyMap({
  shops,
  onSelectShop,
  selectedShopId,
}: {
  shops: Shop[];
  onSelectShop: (slug: string | null, switchToList?: boolean) => void;
  selectedShopId: string | null;
}) {
  const navermaps = useNavermaps();

  // Guard: navermaps 객체가 로드되지 않은 경우 렌더링 방지
  if (!navermaps) return null;

  const selectedShop = shops.find((s) => s.slug === selectedShopId);

  // 컨텍스트 인지형 초기 좌표 및 줌 설정
  const center = useMemo(() => {
    if (selectedShop) {
      return new navermaps.LatLng(selectedShop.lat, selectedShop.lng);
    }
    return new navermaps.LatLng(37.5666805, 126.9784147); // 서울 중심
  }, [selectedShop, navermaps]);

  const zoom = useMemo(() => {
    return selectedShop ? 16 : 11; // 업체 선택 시 줌인, 아닐 시 전국/서울 보기
  }, [selectedShop]);

  return (
    <NaverMap center={center} zoom={zoom}>
      {shops.map((shop) => {
        const position = new navermaps.LatLng(shop.lat, shop.lng);

        return (
          <Marker
            key={shop.id}
            position={position}
            title={shop.name}
            onClick={() => onSelectShop(shop.slug)}
          />
        );
      })}
    </NaverMap>
  );
}
