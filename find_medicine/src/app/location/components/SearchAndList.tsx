'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import ResultListPaging from '../../common/ResultListPaging';
import ResultPageView from '@/app/common/ResultPageView';
import { createParam } from '../page';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { faHouseMedical } from '@fortawesome/free-solid-svg-icons';

const SearchAndList = ({ data, pagiData }: { data: any; pagiData: any }) => {
  const [rowList, setRowList] = useState<string[]>([]);
  const [selectForm1, setSelectForm1] = useState<string>('');
  const [selectForm2, setSelectForm2] = useState<string>('');
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

  const refreshData = async (selectForm1: string, selectForm2: string, text: string, limit: number) => {
    const params = {
      serviceKey: process.env.NEXT_PUBLIC_API_KEY,
      Q0: selectForm1, // 시/도
      Q1: selectForm2, // 시/군/구
      QT: '', // 요일
      QN: text, // 기관명
      ORD: 'NAME', // 순서
      pageNo: '1',
      numOfRows: limit,
    };
    // if (selectForm1 !== '') {
    //   params.Q0 = data1;
    // } else if (selectForm2 !== '') {
    //   params.Q1 = data2;
    // }
    const response = await axios.get(`https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?${createParam(params)}`);
    const result = response.data;
    return result;
  };

  // 제출
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(selectForm1, selectForm2);
    const result = await refreshData(selectForm1, selectForm2, text, limit);
    setRowList(result.response?.body?.items?.item);
  };

  useEffect(() => {
    refreshData(selectForm1, selectForm2, text, limit).then((res) => setRowList(res.response?.body?.items?.item));
  }, [limit]);

  return (
    <div className="clientSide bg-white p-16 box-border text-center">
      {/* <h3 className="text-center text-md font-bold text-4xl mb-10">Find Pharmacy</h3> */}
      <header className="bg-white z-10 w-full flex border-b-2 border-black-300 px-4 py-4 fixed top-0 left-0 items-center text-start">
        <FontAwesomeIcon icon={faHouseMedical} style={{ display: 'block', width: '25%', color: '#29F2A9', fontSize: '40px' }} />
        <form onSubmit={onSubmit} className="searchArea w-[75%] min-w-[350px m-auto">
          <select
            value={selectForm1}
            onChange={(e) => setSelectForm1(e.target.value)}
            className="border-2 border-[#29F2A9] rounded-md min-w-[115px] py-2 ml-2"
          >
            <option value="">시/도</option>
            <option value="서울특별시">서울특별시</option>
            <option value="대구광역시">대구광역시</option>
            <option value="대전광역시">대전광역시</option>
            <option value="부산광역시">부산광역시</option>
            <option value="경기도">경기도</option>
          </select>
          <select
            value={selectForm2}
            onChange={(e) => setSelectForm2(e.target.value)}
            className="border-2 border-[#29F2A9] rounded-md min-w-[115px] py-2 ml-2"
          >
            <option value="">시/군/구</option>
            <option value="강남구">강남구</option>
            <option value="강서구">강서구</option>
          </select>
          <input
            type="text"
            value={text}
            placeholder="상호명을 입력하세요"
            onChange={onChange}
            className="min-w-[350px] ml-2 py-1.5 pl-2 border-2 border-[#29F2A9] rounded-md"
          />
          <button type="submit" className="min-w-[75px] ml-2 py-2 text-white font-bold bg-[#29F2A9] rounded-md">
            검색
          </button>
        </form>
      </header>
      <div className="listArea text-start w-[85%] mx-auto my-10">
        <ResultPageView limit={limit} setLimit={setLimit} />
        <ul className="w-full flex flex-wrap justify-center gap-2 m-auto">
          {rowList?.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className="w-[48.5%] border-2 rounded-xl relative"
                // onClick={() => {
                //   const openPopup = window.open("/navermap", "네이버지도 팝업", "status=no,width=500px,height=550px") as Window;
                //   openPopup.opener.sendData = {
                //     lat: item.wgs84Lat,
                //     lon: item.wgs84Lon,
                //   };
                // }}
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
                <span
                  className="block cursor-pointer absolute bottom-7 right-10 hover:bg-red-300"
                  onClick={() => {
                    const openPopup = window.open('/navermap', '네이버지도 팝업', 'status=no,width=500px,height=650px') as Window;
                    openPopup.opener.sendData = {
                      lat: item.wgs84Lat,
                      lon: item.wgs84Lon,
                    };
                  }}
                >
                  <FontAwesomeIcon icon={faMap as IconProp} /> 길찾기
                </span>
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
