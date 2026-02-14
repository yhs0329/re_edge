"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const handleScrollDown = () => {
    const mapSection = document.getElementById("map-section");
    mapSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden snap-start">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900" />

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white mb-2">
            Re:<span className="text-blue-400">Edge</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg sm:text-xl text-blue-200/80 font-light mt-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          당신의 암벽화에
          <br />
          <span className="text-white font-medium">새로운 엣지</span>를
        </motion.p>

        {/* Sub-description */}
        <motion.p
          className="text-sm text-slate-400 mt-6 max-w-xs mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          검증된 전국 리솔 업체 정보를 한눈에.
          <br />내 암벽화의 수명을 기록하고 관리하세요.
        </motion.p>

        {/* CTA Badges */}
        <motion.div
          className="flex justify-center gap-3 mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-xs text-blue-200 font-medium">
            ✓ 직접 검증된 업체
          </span>
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-xs text-blue-200 font-medium">
            ✓ 전국 리솔 지도
          </span>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-blue-300/60 hover:text-blue-300 transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          리솔샵 찾기
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
