import HeroSection from "@/components/home/HeroSection";
import MapSection from "@/components/home/MapSection";

export default function Home() {
  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Section 1: Hero (Brand Intro) */}
      <HeroSection />

      {/* Section 2: Map App (Shop Finder) */}
      <MapSection />
    </main>
  );
}
