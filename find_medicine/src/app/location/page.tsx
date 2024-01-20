import React from 'react';
import axios from 'axios';
import SearchAndList from './SearchAndList';

// 유틸
export const createParam = (paramObj: any) =>
  Object.keys(paramObj)
    .map((key) => (Array.isArray(paramObj[key]) ? paramObj[key].map((value: any) => `${key}=${encodeURIComponent(value)}`).join('&') : `${key}=${encodeURIComponent(paramObj[key] ?? '')}`))
    .join('&');

const getData = async () => {
  const params = {
    serviceKey: '9D7Rg6V6wDr4R1GG9TV/Y1c4JU9ttSuq9KL8/+5PMw4tls0giUwdYXMH751nxznUp7lL3wQL0YDgFZYc/dNtwQ==',
    Q0: '서울특별시', // 주소
    Q1: '강남구', // 시/도
    QT: '1', // 요일
    QN: '', // 기관명
    ORD: 'NAME', // 순서
    pageNo: '1',
    numOfRows: '10'
  };
  const response = await axios.get(`https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?${createParam(params)}`);
  const result = response.data;
  return result;
};

const Location = async () => {
  const result = await getData();
  let data = result.response?.body?.items?.item;

  return (
    <div>
      <h3 className="text-md font-bold">전체 약국 목록 및 정보</h3>
      <br />
      <SearchAndList data={data} />
    </div>
  );
};

export default Location;
