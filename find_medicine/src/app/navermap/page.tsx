"use client";
import React, { useEffect, useRef, useState } from "react";

const NaverMapComponent = () => {
  const mapRef: any = useRef();

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  useEffect(() => {
    // 내 위치
    // navigator?.geolocation?.getCurrentPosition((position) => {
    //   setLat(position.coords.latitude);
    //   setLng(position.coords.longitude);
    // });

    setLat(window.opener.sendData.lat);
    setLng(window.opener.sendData.lon);

    if (lat !== 0 && lng !== 0) {
      const location = new naver.maps.LatLng(lat, lng);
      //지도 그리기
      const map = (mapRef.current = new naver.maps.Map("map", {
        center: location,
        zoomControl: true, // 줌 설정
        zoom: 15,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT,
        },
        mapTypeControl: true,
      }));
      //마커 설정
      mapRef.current = new naver.maps.Marker({
        map,
        position: location, //마커 좌표
      });
    }
  }, [lat, lng]);

  //  onClick={onFullScreen} isFullScreen={fullScreen}
  return (
    <div className="w-full p-10">
      <div id="map" ref={mapRef} style={{ width: "85%", height: "350px", margin: "0 auto", borderRadius: "10px" }} />
    </div>
  );
};

export default NaverMapComponent;
