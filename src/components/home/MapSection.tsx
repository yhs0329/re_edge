"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import TopBar from "@/components/layout/TopBar";
import ClientMapWrapper from "@/components/map/ClientMapWrapper";
import ShopBottomSheet from "@/components/home/ShopBottomSheet";
import ShopSidebar from "@/components/home/ShopSidebar";
import FloatingActionButton from "@/components/common/FloatingActionButton";
import ShopDetailView from "@/components/shop/ShopDetailView";
import { Shop } from "@/lib/constants";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MapSection({ initialShops }: { initialShops: Shop[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL 파라미터와 동기화되는 로컬 상태
  const [selectedShopId, setSelectedShopId] = useState<string | null>(
    searchParams.get("shop"),
  );

  // 모바일 뷰 모드 ('LIST' | 'MAP')
  const [mobileViewMode, setMobileViewMode] = useState<"LIST" | "MAP">("LIST");

  // URL 파라미터가 변경될 때 로컬 상태 동기화
  useEffect(() => {
    const shopId = searchParams.get("shop");
    setSelectedShopId(shopId);

    // 업체가 선택되면 모바일에서도 상세 페이지가 보여야 하므로 LIST 모드로 간주할 수 있음
    // 하지만 지도를 보고 있는 상태에서 업체를 찍었을 때는 MAP 모드를 유지해야 함
  }, [searchParams]);

  const handleSelectShop = (slug: string | null, switchToList?: boolean) => {
    setSelectedShopId(slug);

    if (switchToList) {
      setMobileViewMode("LIST");
    }

    const params = new URLSearchParams(window.location.search);
    if (slug && slug !== "0") {
      params.set("shop", slug);
    } else {
      params.delete("shop");
    }

    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  const toggleMobileView = () => {
    const nextMode = mobileViewMode === "LIST" ? "MAP" : "LIST";

    // MAP -> LIST 전환 시, 만약 업체가 선택되어 있었다면 목록을 보여주기 위해 선택 해제
    if (mobileViewMode === "MAP" && nextMode === "LIST") {
      handleSelectShop(null);
    }

    setMobileViewMode(nextMode);
  };

  const selectedShop = initialShops.find((s) => s.slug === selectedShopId);

  return (
    <section
      id="map-section"
      className="relative h-screen w-full snap-start overflow-hidden bg-white flex flex-col"
    >
      {/* Global Header (100% width) - Hidden on Mobile LIST mode because ShopBottomSheet will have its own sticky header */}
      <header
        className={clsx(
          "w-full h-16 border-b border-slate-100 flex items-center px-6 shrink-0 bg-white z-50",
          mobileViewMode === "LIST" ? "hidden md:flex" : "flex",
        )}
      >
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Re:<span className="text-blue-600">Edge</span>
        </h1>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 w-full overflow-hidden bg-slate-50 relative">
        {/* Mobile View: LIST / SHOP DETAIL (100%) */}
        <div
          className={clsx(
            "md:hidden absolute inset-0 z-40 bg-white overflow-hidden flex flex-col transition-transform duration-300",
            mobileViewMode === "MAP" ? "translate-x-full" : "translate-x-0",
          )}
        >
          <ShopBottomSheet
            selectedShopId={selectedShopId}
            onSelectShop={handleSelectShop}
            shops={initialShops}
          />
        </div>

        {/* Desktop Sidebar (Fixed width on left) - 20% area */}
        <ShopSidebar
          selectedShopId={selectedShopId}
          onSelectShop={handleSelectShop}
          shops={initialShops}
        />

        {/* Center Detail/Guide Board (50%) - Desktop Only */}
        <div className="hidden md:flex w-[50%] h-full relative z-20 shrink-0 border-r border-slate-200 bg-white">
          <AnimatePresence mode="wait">
            {/* ... same as before, preserved for desktop ... */}
            <motion.div
              key={selectedShopId || "guide"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full h-full"
            >
              {selectedShopId ? (
                selectedShop && (
                  <ShopDetailView
                    shop={selectedShop}
                    onClose={() => handleSelectShop(null)}
                    isMobile={false}
                  />
                )
              ) : (
                <ShopDetailView
                  onClose={() => {}}
                  isMobile={false}
                  isGuide={true}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Map Area (Desktop: 30% on right, Mobile: 100% on MAP mode) */}
        <div
          className={clsx(
            "relative h-full overflow-hidden bg-slate-100 transition-all duration-300",
            "flex-1 md:flex-none md:w-[30%]",
          )}
        >
          <div className="absolute inset-0 z-0">
            <ClientMapWrapper
              shops={initialShops}
              onSelectShop={handleSelectShop}
              selectedShopId={selectedShopId}
            />
          </div>

          <FloatingActionButton
            mode={mobileViewMode}
            onClick={toggleMobileView}
          />
        </div>
      </div>
    </section>
  );
}
