"use client";

import {
  NaverMap,
  Container as MapDiv,
  useNavermaps,
  Marker,
} from "react-naver-maps";

export default function MapViewer({ shops }: { shops: any[] }) {
  return (
    <MapDiv
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MyMap shops={shops} />
    </MapDiv>
  );
}

function MyMap({ shops }: { shops: any[] }) {
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
        />
      ))}
    </NaverMap>
  );
}
