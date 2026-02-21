"use client";

import MapViewer from "./MapViewer";
import { Shop } from "@/lib/constants";

export default function ClientMapWrapper({
  shops,
  onSelectShop,
  selectedShopId,
}: {
  shops: Shop[];
  onSelectShop: (slug: string | null, switchToList?: boolean) => void;
  selectedShopId: string | null;
}) {
  const NEXT_PUBLIC_NAVER_MAP_CLIENT_ID =
    process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  if (!NEXT_PUBLIC_NAVER_MAP_CLIENT_ID) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
        <div className="text-center p-4">
          <p className="font-bold">Map API Key Missing</p>
          <p className="text-sm">
            Please set NEXT_PUBLIC_NAVER_MAP_CLIENT_ID in .env.local
          </p>
        </div>
      </div>
    );
  }

  return (
    <MapViewer
      shops={shops}
      onSelectShop={onSelectShop}
      selectedShopId={selectedShopId}
    />
  );
}
