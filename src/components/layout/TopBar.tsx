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

      {/* Search Input (Fake) */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="암벽화 수선 전문점 찾기..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all shadow-inner"
            readOnly // MVP: Just UI for now
          />
        </div>
      </div>
    </header>
  );
}
