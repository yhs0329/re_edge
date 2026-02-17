"use client";

import { useParams, useRouter } from "next/navigation";
import { SHOPS } from "@/lib/constants";
import { ChevronLeft, MapPin, Phone, Star, Clock } from "lucide-react";

export default function ShopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const shopId = Number(params.id);
  const shop = SHOPS.find((s) => s.id === shopId);

  if (!shop) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            상점을 찾을 수 없습니다.
          </h1>
          <button
            onClick={() => router.back()}
            className="text-blue-600 font-medium"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{shop.name}</h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Content Area */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Placeholder Image */}
        <div className="aspect-video w-full bg-slate-200 rounded-2xl mb-6 flex items-center justify-center text-slate-400 font-bold overflow-hidden shadow-inner">
          <img
            src={`https://images.unsplash.com/photo-1564860367919-ed1fa1070ab2?q=80&w=800&auto=format&fit=crop`}
            alt={shop.name}
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Basic Info Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">
                {shop.name}
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                {shop.address}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-bold px-2 py-1 bg-green-50 text-green-600 rounded-full border border-green-100 uppercase">
                {shop.status}
              </span>
              <div className="flex items-center text-yellow-500 font-bold">
                <Star className="w-4 h-4 fill-current mr-1" />
                {shop.rating}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
            {shop.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full font-medium border border-gray-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* More Details (Placeholders) */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-dotted border-gray-200 text-center py-10">
            <p className="text-gray-400 text-sm">
              PRD Phase 1: 업체 상세 정보는 작업 중입니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
