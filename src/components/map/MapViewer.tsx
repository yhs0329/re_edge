"use client";

import { NaverMap, Container as MapDiv, useNavermaps } from "react-naver-maps";

export default function MapViewer() {
  return (
    <MapDiv
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MyMap />
    </MapDiv>
  );
}

function MyMap() {
  const navermaps = useNavermaps();

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(37.5666805, 126.9784147)}
      defaultZoom={15}
    >
      {/* Markers will be added here later */}
    </NaverMap>
  );
}
