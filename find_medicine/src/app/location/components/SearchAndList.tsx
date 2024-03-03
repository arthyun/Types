'use client';
import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import ResultListPaging from '../../common/ResultListPaging';
import ResultPageView from '@/app/common/ResultPageView';
import ResultNoData from '@/app/common/ResultNoData';
import LocationHeader from './LocationHeader';
import { getData } from '../page';
import axios from 'axios';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMap, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

const SearchAndList = ({ data, pagiData }: { data: any; pagiData: any }) => {
  // States
  const [rowList, setRowList] = useState<string[]>([]);
  const [selectForm1, setSelectForm1] = useState<string>('');
  const [selectForm2, setSelectForm2] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [sidoInfo, setSidoInfo] = useState<string[] | any[]>([]);
  const [siGunGu, setSiGunGu] = useState<string[] | any[]>([]);
  const [ssr, setSsr] = useState<boolean>(true);

  // Pagination state
  const [limit, setLimit] = useState<number>(10);
  const [pageCnt, setPageCnt] = useState<number>(1);
  const [totalpage, setTotalPage] = useState<number>(0);
  const [totalcnt, setTotalCnt] = useState<number>(0);

  // OnChange
  const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id === 'siDo') setSelectForm1(value);
    if (id === 'siGunGu') setSelectForm2(value);
    if (id === 'text') setText(value);
  };

  // 검색
  const onSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    const result = await getData(selectForm1, selectForm2, text, limit);
    // result?.response?.body?.items?.item
    setRowList(Array.isArray(result?.response?.body?.items?.item) ? result?.response?.body?.items?.item : []);
    setPageCnt(result?.response?.body?.pageNo);
    setTotalCnt(result?.response?.body?.totalCount);
    setSsr(false);
  };

  // 국토명 API 호출
  const getSido = async () => {
    // key=7CB2C509-B281-3D68-9345-2332A9DDD255
    // domain=http://localhost:3000
    const response = await axios.get(
      `/req/data?key=${process.env.NEXT_PUBLIC_SIDO_KEY}&domain=http://localhost:3000&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADSIDO_INFO`
    );
    const result = response.data;
    return result;
  };
  const getSiGunGu = async () => {
    // key=7CB2C509-B281-3D68-9345-2332A9DDD255
    // domain=http://localhost:3000
    const response = await axios.get(
      `/req/data?key=${process.env.NEXT_PUBLIC_SIDO_KEY}&domain=http://localhost:3000&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADSIGG_INFO`
    );
    const result = response.data;
    return result;
  };

  //  화면 진입시
  useEffect(() => {
    getSido().then((res) => setSidoInfo(res.response.result.featureCollection.features.reduce((acc: any, cur: any) => acc.concat(cur.properties), [])));
    if (!ssr) {
      getData(selectForm1, selectForm2, text, limit, pageCnt).then((result) => {
        setRowList(result.response?.body?.items?.item);
        setPageCnt(result.response?.body?.pageNo);
        setTotalCnt(result.response?.body?.totalCount);
      });
    }
  }, [limit, pageCnt]);

  useMemo(() => {
    if (selectForm1 !== '') {
      getSiGunGu().then((res) => {
        let newData = res.response.result.featureCollection.features.reduce((acc: any, cur: any) => acc.concat(cur.properties), []);
        setSiGunGu(newData.filter((item: any) => item.full_nm.startsWith(selectForm1)));
      });
    }
  }, [selectForm1]);

  /* 기존과 다르게 페이지뷰와 페이지네이션에 setSsr() 추가 */
  return (
    <div className="clientSide bg-white p-16 box-border text-center">
      <LocationHeader
        onSubmit={onSubmit}
        selectForm1={selectForm1}
        selectForm2={selectForm2}
        setSelectForm1={setSelectForm1}
        setSelectForm2={setSelectForm2}
        text={text}
        setText={setText}
        onChange={onChange}
        setSsr={setSsr}
        sidoInfo={sidoInfo}
        siGunGu={siGunGu}
      />
      <div className="listArea text-start w-[85%] mx-auto my-10">
        <ResultPageView limit={limit} setLimit={setLimit} setSsr={setSsr} />
        <ul className="w-full flex flex-wrap justify-center gap-2 m-auto">
          {ssr
            ? data?.map((item: any, index: number) => {
                return (
                  <li key={index} className="w-[48.5%] h-[225px] border-2 border-[#49F2D3] rounded-xl relative">
                    <dl className="px-12 box-border mt-12">
                      {/* <dd>{item.rnum}</dd> */}
                      <dt className="font-bold">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                        {/* {item.dutyAddr} */}
                        {item?.dutyAddr.split(',')[0]}
                      </dt>
                      <dd className="my-2.5">
                        <FontAwesomeIcon icon={faHeart} className="mr-2" />
                        {item?.dutyName}
                      </dd>
                      <dd>
                        <FontAwesomeIcon icon={faPhone} className="mr-2" />
                        {item?.dutyTel1}
                      </dd>
                      {/* <dd>{item.wgs84Lat}</dd>
                <dd>{item.wgs84Lon}</dd> */}
                    </dl>
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
                  </li>
                );
              })
            : rowList?.map((item: any, index: number) => {
                return (
                  <li key={index} className="w-[48.5%] h-[225px] border-2 border-[#49F2D3] rounded-xl relative">
                    <dl className="px-12 box-border mt-12">
                      {/* <dd>{item.rnum}</dd> */}
                      <dt className="font-bold">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                        {/* {item.dutyAddr} */}
                        {item?.dutyAddr.split(',')[0]}
                      </dt>
                      <dd className="my-2.5">
                        <FontAwesomeIcon icon={faHeart} className="mr-2" />
                        {item?.dutyName}
                      </dd>
                      <dd>
                        <FontAwesomeIcon icon={faPhone} className="mr-2" />
                        {item?.dutyTel1}
                      </dd>
                      {/* <dd>{item.wgs84Lat}</dd>
                <dd>{item.wgs84Lon}</dd> */}
                    </dl>
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
                  </li>
                );
              })}
        </ul>
        {rowList?.length === 0 && <ResultNoData />}
      </div>
      <ResultListPaging limit={limit} page={pageCnt || pagiData.pageNo} totalpage={totalpage} totalcnt={totalcnt || pagiData.totalCount} setPageCnt={setPageCnt} setSsr={setSsr} />
    </div>
  );
};

export default SearchAndList;
