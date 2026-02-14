"use client";

import { NavermapsProvider } from "react-naver-maps";
import MapViewer from "./MapViewer";

export default function ClientMapWrapper() {
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
    <NavermapsProvider
      ncpClientId={NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}
      // error={<div className="p-4 text-red-500">Failed to load Naver Map</div>}
      // loading={<div className="p-4 text-gray-500">Loading Map...</div>}
    >
      <MapViewer />
    </NavermapsProvider>
  );
}
