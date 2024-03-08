'use client';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { createParam } from '@/app/util/stringUtils';

interface InfoProps {
  dutyAddr?: string;
  dutyName?: string;
  dutyTel1?: string;
  dutyTime1c?: number;
  dutyTime1s?: string;
  dutyTime2c?: number;
  dutyTime2s?: string;
  dutyTime3c?: number;
  dutyTime3s?: string;
  dutyTime4c?: number;
  dutyTime4s?: string;
  dutyTime5c?: number;
  dutyTime5s?: string;
  dutyTime6c?: number;
  dutyTime6s?: string;
  hpid?: string;
  postCdn1?: number;
  postCdn2?: string;
  wgs84Lat?: number;
  wgs84Lon?: number;
}

const fetchHpidData = async () => {
  const params = {
    serviceKey: process.env.NEXT_PUBLIC_API_KEY,
    HPID: window.opener.sendData.hpid,
    pageNo: '1',
    numOfRows: '10'
  };
  try {
    const result = await axios.get(`https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyBassInfoInqire?${createParam(params)}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

const NaverMapComponent = () => {
  const mapRef: any = useRef();

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [pharmacyInfo, setPharmacyInfo] = useState<InfoProps>({});

  useEffect(() => {
    // 내 위치 조회
    // navigator?.geolocation?.getCurrentPosition((position) => {
    //   setLat(position.coords.latitude);
    //   setLng(position.coords.longitude);
    // });

    // 약국 정보 가져오기
    fetchHpidData().then((result) => setPharmacyInfo(result.response?.body?.items?.item));

    // 위치 적용
    setLat(window.opener.sendData.lat);
    setLng(window.opener.sendData.lon);

    if (lat !== 0 && lng !== 0) {
      const location = new naver.maps.LatLng(lat, lng);
      //지도 그리기
      const map = (mapRef.current = new naver.maps.Map('map', {
        center: location,
        zoomControl: true, // 줌 설정
        zoom: 15,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT
        },
        mapTypeControl: true
      }));
      //마커 설정
      mapRef.current = new naver.maps.Marker({
        map,
        position: location //마커 좌표
      });
    }
  }, [lat, lng]);

  //  onClick={onFullScreen} isFullScreen={fullScreen}
  return (
    <div className='w-full h-[100vh] px-10 py-14 bg-[#2573D9] relative'>
      <div id='map' ref={mapRef} style={{ width: '85%', height: '350px', margin: '0 auto', borderRadius: '10px' }} />

      <dl className='w-[85%] m-auto my-8'>
        <dt className='font-bold my-2 text-white'>{pharmacyInfo?.dutyAddr?.split(',')[0]}</dt>
        <dd className='font-bold my-2 text-white'>{pharmacyInfo?.dutyName}</dd>
        <dd className='font-bold my-2 text-white'>{pharmacyInfo?.dutyTel1}</dd>
      </dl>

      <span
        className='block bg-[#49F2D3] text-[#333] w-[85%] h-[40px] m-auto leading-10 text-center text-lg font-bold rounded-md cursor-pointer hover:text-black hover:bg-[#1cc6a7] transition-all duration-300'
        onClick={() => window.close()}
      >
        닫기
      </span>
    </div>
  );
};

export default NaverMapComponent;
