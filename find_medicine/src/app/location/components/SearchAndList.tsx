'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import ResultListPaging from '../../common/ResultListPaging';
import ResultPageView from '@/app/common/ResultPageView';
import { createParam } from '../page';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMap, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import LocationHeader from './LocationHeader';

const SearchAndList = ({ data, pagiData }: { data: any; pagiData: any }) => {
  // states
  const [rowList, setRowList] = useState<string[]>([]);
  const [selectForm1, setSelectForm1] = useState<string>('');
  const [selectForm2, setSelectForm2] = useState<string>('');
  const [text, setText] = useState<string>('');
  // Pagination state
  const [limit, setLimit] = useState<number>(10);
  const [pageCnt, setPageCnt] = useState<number>(1);
  const [totalpage, setTotalPage] = useState<number>(0);
  const [totalcnt, setTotalCnt] = useState<number>(0);

  // 함수들
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  };

  // 검색용 함수
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
    setPageCnt(result.response?.body?.pageNo);
    setTotalCnt(result.response?.body?.totalCount);
  };

  // 화면 진입시 - 몇개씩 보기 및 초기화버튼 컨트롤하면 재 호출
  // 최초에는 서버데이터를 보여주기
  useEffect(() => {
    // console.log(data);
    // console.log(pagiData);
    setRowList(data);
    setPageCnt(pagiData.pageNo);
    setTotalCnt(pagiData.totalCount);
    // refreshData(selectForm1, selectForm2, text, limit).then((res) => {
    //   setRowList(res.response?.body?.items?.item);
    //   setPageCnt(res.response?.body?.pageNo);
    //   setTotalCnt(res.response?.body?.totalCount);
    // });
  }, [limit]);

  return (
    <div className="clientSide bg-white p-16 box-border text-center">
      {/* <h3 className="text-center text-md font-bold text-4xl mb-10">Find Pharmacy</h3> */}
      <LocationHeader
        onSubmit={onSubmit}
        selectForm1={selectForm1}
        selectForm2={selectForm2}
        setSelectForm1={setSelectForm1}
        setSelectForm2={setSelectForm2}
        text={text}
        setText={setText}
        onChange={onChange}
      />
      <div className="listArea text-start w-[85%] mx-auto my-10">
        <ResultPageView limit={limit} setLimit={setLimit} />
        <ul className="w-full flex flex-wrap justify-center gap-2 m-auto">
          {rowList?.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className="w-[48.5%] h-[225px] border-2 border-[#49F2D3] rounded-xl relative"
                // onClick={() => {
                //   const openPopup = window.open("/navermap", "네이버지도 팝업", "status=no,width=500px,height=550px") as Window;
                //   openPopup.opener.sendData = {
                //     lat: item.wgs84Lat,
                //     lon: item.wgs84Lon,
                //   };
                // }}
              >
                <dl className="px-12 box-border mt-12">
                  {/* <dd>{item.rnum}</dd> */}
                  <dt className="font-bold">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                    {/* {item.dutyAddr} */}
                    {item.dutyAddr.split(',')[0]}
                  </dt>
                  <dd className="my-2.5">
                    <FontAwesomeIcon icon={faHeart} className="mr-2" />
                    {item.dutyName}
                  </dd>
                  <dd>
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    {item.dutyTel1}
                  </dd>
                  {/* <dd>{item.wgs84Lat}</dd>
                  <dd>{item.wgs84Lon}</dd> */}
                </dl>
                <span
                  className="block cursor-pointer absolute bottom-12 right-12 bg-[#2573D9] text-white w-[120px] h-[40px] rounded-xl text-center leading-10 hover:bg-[#0081cc] transition-all duration-300"
                  onClick={() => {
                    const openPopup = window.open('/navermap', '네이버지도 팝업', 'status=no,width=500px,height=650px') as Window;
                    openPopup.opener.sendData = {
                      lat: item.wgs84Lat,
                      lon: item.wgs84Lon,
                    };
                  }}
                >
                  <FontAwesomeIcon icon={faMap as IconProp} className="text-white" />
                  &nbsp;&nbsp;위치 보기
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
