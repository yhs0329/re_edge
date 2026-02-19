"use client";

import { NavermapsProvider } from "react-naver-maps";

export function NaverMapProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  if (!clientId) {
    console.warn("Naver Map Client ID가 설정되지 않았습니다.");
  }

  return (
    <NavermapsProvider ncpKeyId={clientId || ""}>{children}</NavermapsProvider>
  );
}
