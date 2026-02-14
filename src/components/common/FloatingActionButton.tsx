"use client";

import { Footprints } from "lucide-react";

export default function FloatingActionButton() {
  return (
    <button
      className="absolute bottom-36 right-4 z-50 flex items-center justify-center p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
      aria-label="My Gear"
    >
      <Footprints className="w-6 h-6 fill-current" />
      {/* Optional Label for larger screens or expanded state */}
      {/* <span className="ml-2 font-bold">내 장비</span> */}
    </button>
  );
}
