import HeroSection from "@/components/home/HeroSection";
import MapSection from "@/components/home/MapSection";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-slate-900">
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Map & App */}
      <MapSection />
    </main>
  );
}
