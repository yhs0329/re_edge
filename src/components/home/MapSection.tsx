"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import ClientMapWrapper from "@/components/map/ClientMapWrapper";
import ShopBottomSheet from "@/components/home/ShopBottomSheet";
import ShopSidebar from "@/components/home/ShopSidebar";
import FloatingActionButton from "@/components/common/FloatingActionButton";

export default function MapSection({ initialShops }: { initialShops: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL에서 shop 파라미터 읽기
  const selectedShopId = searchParams.get("shop");

  const handleSelectShop = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug && slug !== "0") {
      params.set("shop", slug);
    } else {
      params.delete("shop");
    }

    // URL 업데이트 (상태 변경 대신 내비게이션 사용)
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
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
