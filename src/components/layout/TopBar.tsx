"use client";

import { Search } from "lucide-react";

export default function TopBar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between gap-3 bg-white/70 backdrop-blur-md border-b border-gray-100/50 shadow-sm transition-all duration-300">
      {/* Brand Logo */}
      <div className="shrink-0">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Re:<span className="text-blue-600">Edge</span>
        </h1>
      </div>

      {/* Right placeholder (optional, can be empty) */}
      <div className="w-10 md:hidden" />
    </header>
  );
}
