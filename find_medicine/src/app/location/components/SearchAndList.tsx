'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { createParam } from '../page';
import axios from 'axios';
import ResultListPaging from '../../common/ResultListPaging';
import ResultPageView from '@/app/common/ResultPageView';

const SearchAndList = ({ data, pagiData }: { data: any; pagiData: any }) => {
  const [rowList, setRowList] = useState<string[]>([]);
  const [selectForm, setSelectForm] = useState<string>('');
  const [text, setText] = useState<string>('');

  // Pagination state
  const [limit, setLimit] = useState<number>(10);
  const [pageCnt, setPageCnt] = useState<number>(1);
  const [totalpage, setTotalPage] = useState<number>(0);
  const [totalcnt, setTotalCnt] = useState<number>(0);

  // 최초 진입시
  useEffect(() => {
    setRowList(data);
    //numOfRows / pageNo / totalCount
    setPageCnt(pagiData.pageNo);
    setTotalCnt(pagiData.totalCount);
  }, []);

  // 함수들
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const refreshData = async (data: string) => {
    const params = {
      serviceKey: '9D7Rg6V6wDr4R1GG9TV/Y1c4JU9ttSuq9KL8/+5PMw4tls0giUwdYXMH751nxznUp7lL3wQL0YDgFZYc/dNtwQ==',
      Q0: '서울특별시', // 주소
      Q1: '강남구', // 시/도
      QT: '1', // 요일
      QN: data, // 기관명
      ORD: 'NAME', // 순서
      pageNo: '1',
      numOfRows: '10'
    };
    const response = await axios.get(`https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?${createParam(params)}`);
    const result = response.data;
    return result;
    // rowList = result.response?.body?.items?.item;
  };

  // 제출
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await refreshData(text);
    setRowList(result.response?.body?.items?.item);
  };

  return (
    <div className="clientSide bg-white p-16 box-border text-center">
      <h3 className="text-center text-md font-bold text-4xl mb-10">Find Pharmacy</h3>
      <form onSubmit={onSubmit} className="searchArea w-[50%] min-w-[350px m-auto text-center">
        <select value={selectForm} onChange={(e) => setSelectForm(e.target.value)} className="bg-gray-100 rounded-md py-2.5 w-[15%] pl-2">
          <option value="">선택</option>
          <option value="약국명">약국명</option>
          <option value="지역명">지역명</option>
        </select>
        <input
          type="text"
          value={text}
          placeholder={selectForm !== '' ? `${selectForm}을 입력하세요.` : '구분을 선택하세요'}
          onChange={onChange}
          className="w-[65%] ml-2 py-1.5 pl-2 border-2 border-green-400 rounded-md"
        />
        <button type="submit" className="w-[15%] ml-2 py-2 text-white font-bold bg-green-400 rounded-md">
          검색
        </button>
      </form>
      <br />
      <div className="listArea text-start w-[70%] m-auto mb-4">
        <ResultPageView limit={limit} setLimit={setLimit} />
        <ul className="w-full flex flex-wrap justify-center gap-2 m-auto">
          {rowList?.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className="w-[49.5%] rounded-xl shadow-lg cursor-pointer"
                onClick={() => {
                  // const windowData = {
                  //   lat: item.wgs84Lat,
                  //   lon: item.wgs84Lon
                  // };
                  const openPopup = window.open('/navermap', '네이버지도 팝업', 'status=no,width=750px,height=500px');
                  openPopup.lat = item.wgs84Lat;
                  openPopup.lon = item.wgs84Lon;
                }}
              >
                <dl className="p-10 box-border">
                  {/* <dd>{item.rnum}</dd> */}
                  <dt className="font-bold">{item.dutyAddr.split(',')[0]}</dt>
                  <dt className="font-bold">{item.dutyAddr.substring(item.dutyAddr.indexOf(',') + 1)}</dt>
                  <dd className="my-2.5">{item.dutyName}</dd>
                  <dd>{item.dutyTel1}</dd>
                  {/* <dd>{item.wgs84Lat}</dd>
                  <dd>{item.wgs84Lon}</dd> */}
                </dl>
              </li>
            );
          })}
        </ul>
      </div>
      <ResultListPaging limit={limit} page={pageCnt} totalpage={totalpage} totalcnt={totalcnt} setPageCnt={setPageCnt} />
    </div>
  );
};

export default SearchAndList;
