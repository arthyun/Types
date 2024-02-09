import React from 'react';
import axios from 'axios';
import SearchAndList from './components/SearchAndList';
import LocationFooter from './components/LocationFooter';
// import Image from 'next/image';
// import backGroundImage from '/public/pharmacy.jpg';

// 유틸
export const createParam = (paramObj: any) =>
  Object.keys(paramObj)
    .map((key) =>
      Array.isArray(paramObj[key])
        ? paramObj[key].map((value: any) => `${key}=${encodeURIComponent(value)}`).join('&')
        : `${key}=${encodeURIComponent(paramObj[key] ?? '')}`
    )
    .join('&');

export const getData = async (text1?: string, text2?: string, text3?: string, limit?: number, pageCnt?: number) => {
  const params = {
    serviceKey: process.env.NEXT_PUBLIC_API_KEY,
    Q0: text1 ?? '', // 시/도
    Q1: text2 ?? '', // 시/군/구
    QT: '1', // 요일
    QN: text3 ?? '', // 기관명
    ORD: 'NAME', // 순서
    pageNo: pageCnt ?? '1',
    numOfRows: limit ?? '10',
  };
  const response = await axios.get(`https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?${createParam(params)}`);
  const result = response.data;
  return result;
};

const Location = async () => {
  // fetch data
  const result = await getData();
  let data = result.response?.body?.items?.item;
  let pagiData = result.response?.body;

  return (
    <>
      <div className="locationWrap">
        {/* <Image src={backGroundImage} alt="bg" layout="fill" objectFit="auto" objectPosition="center" className="z-0" /> */}
        <SearchAndList data={data} pagiData={pagiData} />
      </div>
      <LocationFooter />
    </>
  );
};

export default Location;
