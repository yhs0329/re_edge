import { supabase } from "@/lib/supabase";
import HeroSection from "@/components/home/HeroSection";
import MapSection from "@/components/home/MapSection";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; shop?: string }>;
}) {
  const { region: regionParam } = await searchParams;

  // 1. RPC 함수를 통해 위경도가 포함된 업체 목록을 서버에서 가져옵니다.
  const { data: shopsData } = await supabase.rpc("get_shops_with_coords");

  // 2. region 필드가 RPC 리턴값에 누락되어 있으므로 테이블에서 직접 가져와 병합합니다.
  const { data: regionalData } = await supabase
    .from("shops")
    .select("id, region");

  // 3. 가격 정보 가져오기
  const { data: pricesData } = await supabase
    .from("shop_prices")
    .select("service_name, price, description, shop_id");

  // 4. 데이터 병합 (coords + region + prices)
  const shops = (shopsData || [])
    .map((shop) => {
      const region = (regionalData || []).find((r) => r.id === shop.id)?.region;
      return {
        ...shop,
        region,
        prices: (pricesData || []).filter((p) => p.shop_id === shop.id),
      };
    })
    // 5. 서버 사이드 필터링 적용
    .filter((shop) => !regionParam || shop.region === regionParam);

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-slate-900">
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Map & App */}
      <MapSection initialShops={shops as any} />
    </main>
  );
}
