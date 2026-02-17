"use client";

import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import ClientMapWrapper from "@/components/map/ClientMapWrapper";
import ShopBottomSheet from "@/components/home/ShopBottomSheet";
import ShopSidebar from "@/components/home/ShopSidebar";
import FloatingActionButton from "@/components/common/FloatingActionButton";

export default function MapSection() {
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);

  const handleSelectShop = (id: number) => {
    setSelectedShopId(id);
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
      />

      {/* Main Content (Map + Overlays) */}
      <div className="relative flex-1 h-full overflow-hidden">
        {/* Top Bar */}
        <TopBar />

        {/* Fullscreen Map Background */}
        <div className="absolute inset-0 z-0">
          <ClientMapWrapper />
        </div>

        {/* Floating Action Button */}
        <FloatingActionButton />

        {/* Mobile Bottom Sheet (Hidden on desktop via md:hidden internally) */}
        <ShopBottomSheet
          selectedShopId={selectedShopId}
          onSelectShop={handleSelectShop}
        />
      </div>
    </section>
  );
}
