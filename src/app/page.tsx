import { supabase } from "@/lib/supabase";
import HeroSection from "@/components/home/HeroSection";
import MapSection from "@/components/home/MapSection";

export default async function Home() {
  // RPC 함수를 통해 위경도가 포함된 업체 목록을 서버에서 직접 가져옵니다.
  const { data: shops } = await supabase.rpc("get_shops_with_coords");

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-slate-900">
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Map & App */}
      <MapSection initialShops={shops || []} />
    </main>
  );
}
