"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import ClientMapWrapper from "@/components/map/ClientMapWrapper";
import ShopBottomSheet from "@/components/home/ShopBottomSheet";
import ShopSidebar from "@/components/home/ShopSidebar";
import FloatingActionButton from "@/components/common/FloatingActionButton";
import { Shop } from "@/lib/constants";
import { useState, useEffect } from "react";

export default function MapSection({ initialShops }: { initialShops: Shop[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL 파라미터와 동기화되는 로컬 상태 (즉각적인 UI 반응을 위함)
  const [selectedShopId, setSelectedShopId] = useState<string | null>(
    searchParams.get("shop"),
  );

  // URL 파라미터가 변경될 때 로컬 상태 동기화 (뒤로가기 등 대응)
  useEffect(() => {
    setSelectedShopId(searchParams.get("shop"));
  }, [searchParams]);

  const handleSelectShop = (slug: string | null) => {
    // 1. 로컬 상태 즉시 업데이트 (Instant UI)
    setSelectedShopId(slug);

    // 2. 브라우저 URL 업데이트 (Next.js 라우터 오버헤드 없이 History API 사용)
    const params = new URLSearchParams(window.location.search);
    if (slug && slug !== "0") {
      params.set("shop", slug);
    } else {
      params.delete("shop");
    }

    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  return (
    <section
      id="map-section"
      className="relative h-screen w-full snap-start overflow-hidden bg-gray-50 flex"
    >
      {/* Desktop Sidebar (Fixed width on left) */}
      <ShopSidebar
        selectedShopId={selectedShopId}
        onSelectShop={handleSelectShop}
        shops={initialShops}
      />

      {/* Main Content (Map + Overlays) */}
      <div className="relative flex-1 h-full overflow-hidden">
        {/* Top Bar */}
        <TopBar />

        {/* Fullscreen Map Background */}
        <div className="absolute inset-0 z-0">
          <ClientMapWrapper
            shops={initialShops}
            onSelectShop={handleSelectShop}
            selectedShopId={selectedShopId}
          />
        </div>

        {/* Floating Action Button */}
        <FloatingActionButton />

        {/* Mobile Bottom Sheet (Hidden on desktop via md:hidden internally) */}
        <ShopBottomSheet
          selectedShopId={selectedShopId}
          onSelectShop={handleSelectShop}
          shops={initialShops}
        />

        {/* 
          TODO: Map Relayout & Pan Logic
          1. 사이드바 확장(selectedShopId 변경) 감지
          2. transition duration(500ms) 이후 또는 도중에 map.relayout() 호출
          3. 선택된 상점의 좌표로 map.panTo(position) 호출하여 중앙 보정
        */}
      </div>
    </section>
  );
}
