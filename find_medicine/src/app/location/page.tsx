import React from 'react';
import axios from 'axios';
import OpenMap from './components/OpenMap';
import LocationFooter from './components/LocationFooter';
import ResultPageView from '../common/ResultPageView';
import ResultListPaging from '../common/ResultListPaging';
import ResultNoData from '../common/ResultNoData';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMap, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

interface iProps<T> {
  serviceKey: T;
  Q0: T;
  Q1: T;
  QT: T;
  QN: T;
  ORD: T;
  pageNo: number;
  numOfRows: number;
}

const getData = async (serviceKey: string | undefined, Q0: string, Q1: string, QT: string, QN: string, ORD: string, pageNo: number, numOfRows: number) => {
  const params = {
    serviceKey: process.env.NEXT_PUBLIC_API_KEY ?? serviceKey,
    Q0: Q0 ?? '', // 시/도
    Q1: Q1 ?? '', // 시/군/구
    QT: QT ?? '1', // 요일
    QN: QN ?? '', // 기관명
    ORD: ORD ?? 'NAME', // 순서
    pageNo: pageNo ?? 1,
    numOfRows: numOfRows ?? 10
  };
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axios.get(`https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire`, { params });
  const result = response.data;
  return result;
};

const Location = async ({ searchParams }: { searchParams: iProps<string> }) => {
  const { serviceKey, Q0, Q1, QT, QN, ORD, pageNo, numOfRows }: iProps<string> = searchParams;
  const result = await getData(serviceKey, Q0, Q1, QT, QN, ORD, pageNo, numOfRows);
  let data = result.response?.body?.items?.item;
  let pagiData = result.response?.body;
  // console.log(data);

  return (
    <>
      <div className='locationWrap'>
        <div className='clientSide bg-white p-16 box-border text-center'>
          <div className='listArea text-start w-[85%] mx-auto my-10'>
            <ResultPageView serviceKey={serviceKey} Q0={Q0} Q1={Q1} QT={QT} QN={QN} ORD={ORD} page={pagiData?.pageNo} limit={pagiData?.numOfRows} />
            <ul className='w-full flex flex-wrap justify-center gap-2 m-auto'>
              {data?.map((item: any, index: number) => {
                return (
                  <li key={index} className='w-[48.5%] h-[225px] border-2 border-[#49F2D3] rounded-xl relative'>
                    <dl className='px-12 box-border mt-12'>
                      {/* <dd>{item.rnum}</dd> */}
                      <dt className='font-bold'>
                        <FontAwesomeIcon icon={faLocationDot} className='mr-2' />
                        {/* {item.dutyAddr} */}
                        {item?.dutyAddr.split(',')[0]}
                      </dt>
                      <dd className='my-2.5'>
                        <FontAwesomeIcon icon={faHeart} className='mr-2' />
                        {item?.dutyName}
                      </dd>
                      <dd>
                        <FontAwesomeIcon icon={faPhone} className='mr-2' />
                        {item?.dutyTel1}
                      </dd>
                    </dl>
                    <OpenMap item={item} />
                  </li>
                );
              })}
            </ul>
            {(data === undefined && <ResultNoData />) || (data?.length === 0 && <ResultNoData />)}
          </div>
          <ResultListPaging serviceKey={serviceKey} Q0={Q0} Q1={Q1} QT={QT} QN={QN} ORD={ORD} page={pagiData?.pageNo} limit={pagiData?.numOfRows} totalcnt={pagiData?.totalCount} />
        </div>
      </div>
      <LocationFooter />
    </>
  );
};

export default Location;
