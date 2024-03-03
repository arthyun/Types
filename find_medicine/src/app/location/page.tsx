import React from 'react';
import axios from 'axios';
import SearchAndList from './components/SearchAndList';
import LocationFooter from './components/LocationFooter';

// 유틸
export const createParam = (paramObj: any) =>
   Object.keys(paramObj)
      .map((key) =>
         Array.isArray(paramObj[key])
            ? paramObj[key].map((value: any) => `${key}=${encodeURIComponent(value)}`).join('&')
            : `${key}=${encodeURIComponent(paramObj[key] ?? '')}`,
      )
      .join('&');

const getData = async (serviceKey: string, Q0: string, Q1: string, QT: string, QN: string, ORD: string, pageNo: number, numOfRows: number) => {
   const params = {
      serviceKey: process.env.NEXT_PUBLIC_API_KEY,
      Q0: Q0 ?? '', // 시/도
      Q1: Q1 ?? '', // 시/군/구
      QT: QT, // 요일
      QN: QN ?? '', // 기관명
      ORD: ORD, // 순서
      pageNo: pageNo,
      numOfRows: numOfRows,
   };
   console.log(params);
   const response = await axios.get(`https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire`, { params });
   const result = response.data;
   return result;
};

const Location = async (props: any) => {
   const { serviceKey, Q0, Q1, QT, QN, ORD, pageNo, numOfRows } = props.searchParams;

   // fetch data
   const result = await getData(serviceKey, Q0, Q1, QT, QN, ORD, pageNo, numOfRows);
   let data = result.response?.body?.items?.item;
   let pagiData = result.response?.body;

   return (
      <>
         <div className="locationWrap">
            <SearchAndList
               data={data}
               pagiData={pagiData}
            />
         </div>
         <LocationFooter />
      </>
   );
};

export default Location;
