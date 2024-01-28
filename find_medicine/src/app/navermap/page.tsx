'use client';
import React, { useEffect, useRef, useState } from 'react';

const NaverMapComponent = () => {
  const mapRef: any = useRef();

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });

    const location = new naver.maps.LatLng(lat, lng);
    //지도 그리기
    const map = (mapRef.current = new naver.maps.Map('map', {
      center: location,
      zoomControl: true, // 줌 설정
      zoom: 15,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT
      }
    }));
    //마커 설정
    mapRef.current = new naver.maps.Marker({
      map,
      position: location //마커 좌표
    });
  }, [lat, lng]);

  //  onClick={onFullScreen} isFullScreen={fullScreen}
  return <div id="map" ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default NaverMapComponent;
