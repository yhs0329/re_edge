"use client";

import {
  NaverMap,
  Container as MapDiv,
  useNavermaps,
  Marker,
} from "react-naver-maps";

export default function MapViewer({
  shops,
  onSelectShop,
  selectedShopId,
}: {
  shops: any[];
  onSelectShop: (slug: string | null) => void;
  selectedShopId: string | null;
}) {
  return (
    <MapDiv
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MyMap
        shops={shops}
        onSelectShop={onSelectShop}
        selectedShopId={selectedShopId}
      />
    </MapDiv>
  );
}

function MyMap({
  shops,
  onSelectShop,
  selectedShopId,
}: {
  shops: any[];
  onSelectShop: (slug: string | null) => void;
  selectedShopId: string | null;
}) {
  const navermaps = useNavermaps();

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(37.5666805, 126.9784147)}
      defaultZoom={12}
    >
      {shops.map((shop) => (
        <Marker
          key={shop.id}
          position={new navermaps.LatLng(shop.lat, shop.lng)}
          title={shop.name}
          onClick={() => onSelectShop(shop.slug)}
        />
      ))}
    </NaverMap>
  );
}
