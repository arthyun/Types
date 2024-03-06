'use client';
import React from 'react';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMap, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function OpenMap({ item }: { item: any }) {
  return (
    <span
      className="block cursor-pointer absolute bottom-12 right-12 bg-[#2573D9] text-white w-[120px] h-[40px] rounded-xl text-center leading-10 hover:bg-[#0081cc] transition-all duration-300"
      onClick={() => {
        const openPopup = window.open('/navermap', '네이버지도 팝업', 'status=no,width=500px,height=650px') as Window;
        openPopup.opener.sendData = {
          lat: item?.wgs84Lat,
          lon: item?.wgs84Lon,
          hpid: item?.hpid
        };
      }}
    >
      <FontAwesomeIcon icon={faMap as IconProp} className="text-white" />
      &nbsp;&nbsp;위치 보기
    </span>
  );
}
