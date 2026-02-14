"use client";

import TopBar from "@/components/layout/TopBar";
import ClientMapWrapper from "@/components/map/ClientMapWrapper";
import ShopBottomSheet from "@/components/home/ShopBottomSheet";
import FloatingActionButton from "@/components/common/FloatingActionButton";

export default function MapSection() {
  return (
    <section
      id="map-section"
      className="relative h-screen w-full snap-start overflow-hidden bg-gray-50"
    >
      {/* Top Bar */}
      <TopBar />

      {/* Fullscreen Map Background */}
      <div className="absolute inset-0 z-0">
        <ClientMapWrapper />
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Bottom Sheet */}
      <ShopBottomSheet />
    </section>
  );
}
