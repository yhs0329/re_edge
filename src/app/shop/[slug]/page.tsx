import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // 슬러그를 기반으로 업체 정보 가져오기
  const { data: shop } = await supabase
    .from("shops")
    .select("name, notice, address, images")
    .eq("slug", slug)
    .single();

  if (!shop) {
    return {
      title: "업체를 찾을 수 없습니다 | Re:Edge",
    };
  }

  const title = `${shop.name} - 전국 암벽화 수선 전문점 | Re:Edge`;
  const description =
    shop.notice ||
    `${shop.address}에 위치한 암벽화 수선 전문점 ${shop.name}의 상세 정보와 후기를 확인하세요.`;
  const image = shop.images?.[0] || "/og-image.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ShopDetailPage({ params }: Props) {
  const { slug } = await params;

  // 메인 페이지로 리다이렉트하되, shop 파라미터(슬러그)를 유지하여 해당 업체가 선택되게 함
  redirect(`/?shop=${slug}`);
}
