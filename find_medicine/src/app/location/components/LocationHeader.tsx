'use client';
import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import { createParam } from '@/app/util/stringUtils';

const LocationHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // States
  const [selectSido, setSelectSido] = useState<string>('');
  const [selectSiGunGu, setSelectSiGunGu] = useState<string>('');
  const [kiKwanName, setKiKwanName] = useState<string>('');
  const [sidoInfo, setSidoInfo] = useState<string[] | any[]>([]);
  const [siGunGu, setSiGunGu] = useState<string[] | any[]>([]);

  // OnChange
  const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id === 'siDo') setSelectSido(value);
    if (id === 'siGunGu') setSelectSiGunGu(value);
    if (id === 'kiKwanName') setKiKwanName(value);
  };

  // 검색
  const onSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    const serviceKey = searchParams.get('serviceKey');
    const Q0 = searchParams.get('Q0');
    const Q1 = searchParams.get('Q1');
    const QT = searchParams.get('QT');
    const QN = searchParams.get('QN');
    const ORD = searchParams.get('ORD');
    const pageNo = searchParams.get('pageNo');
    const numOfRows = searchParams.get('numOfRows');

    const params: { serviceKey: string | null; Q0: string; Q1: string; QT: string; QN: string; ORD: string; pageNo: number | string; numOfRows: number | string } = {
      serviceKey: process.env.NEXT_PUBLIC_API_KEY ?? serviceKey,
      Q0: selectSido ?? Q0, // 시/도
      Q1: selectSiGunGu ?? Q1, // 시/군/구
      QT: QT ?? '1', // 요일
      QN: kiKwanName ?? QN, // 기관명
      ORD: ORD ?? 'NAME', // 순서
      pageNo: pageNo ?? 1,
      numOfRows: numOfRows ?? 10 // 일단 고정으로 해놓음
    };
    router.push(`/location?${createParam(params)}`);
  };

  const onReset = async () => {
    setSelectSido('');
    setSelectSiGunGu('');
    setKiKwanName('');
    // onSubmit?.();
  };

  // 국토명 API 호출
  const getSido = async () => {
    try {
      const response = await axios.get(
        `/req/data?key=${process.env.NEXT_PUBLIC_SIDO_KEY}&domain=http://localhost:3000&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADSIDO_INFO`
      );
      const result = response.data;
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  const getSiGunGu = async () => {
    try {
      const response = await axios.get(
        `/req/data?key=${process.env.NEXT_PUBLIC_SIDO_KEY}&domain=http://localhost:3000&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADSIGG_INFO`
      );
      const result = response.data;
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  //  화면 진입시
  useEffect(() => {
    getSido().then((res) => setSidoInfo(res.response.result?.featureCollection?.features?.reduce((acc: any, cur: any) => acc.concat(cur.properties), [])));
  }, []);

  useMemo(() => {
    if (selectSido !== '') {
      getSiGunGu().then((res) => {
        let newData = res.response.result.featureCollection.features.reduce((acc: any, cur: any) => acc.concat(cur.properties), []);
        setSiGunGu(newData.filter((item: any) => item.full_nm.startsWith(selectSido)));
      });
    }
  }, [selectSido]);

  return (
    <header className='bg-white z-10 w-full flex border-b-2 border-black-300 px-4 py-4 fixed top-0 left-0 items-center kiKwanName-start justify-center'>
      <FontAwesomeIcon
        icon={faHouseMedical}
        style={{ display: 'block', width: '7%', color: '#29F2A9', fontSize: '40px', cursor: 'pointer' }}
        onClick={() => window.location.replace('/')}
        // onClick={() => window.location.replace('/location')}
      />
      <form
        onSubmit={onSubmit}
        className='searchArea min-w-[350px]'
        // ref={formRef}
      >
        <select value={selectSido} id='siDo' onChange={onChange} className='border-2 border-[#29F2A9] rounded-md min-w-[115px] py-2 ml-2'>
          <option value=''>시/도</option>
          {/* { ctprvn_cd: string; ctp_kor_nm: string; ctp_eng_nm: string } */}
          {sidoInfo?.map((item, i) => {
            return (
              <option key={i} value={item.ctp_kor_nm}>
                {item.ctp_kor_nm}
              </option>
            );
          })}
        </select>
        <select value={selectSiGunGu} id='siGunGu' onChange={onChange} className='border-2 border-[#29F2A9] rounded-md min-w-[115px] py-2 ml-2'>
          <option value=''>시/군/구</option>
          {siGunGu?.map((item, i) => {
            return (
              <option key={i} value={item.sig_kor_nm}>
                {item.sig_kor_nm}
              </option>
            );
          })}
        </select>
        <input
          type='kiKwanName'
          id='kiKwanName'
          value={kiKwanName}
          placeholder='상호명을 입력하세요'
          onChange={onChange}
          className='min-w-[350px] ml-2 py-1.5 pl-2 border-2 border-[#29F2A9] rounded-md'
        />
        <button type='submit' className='min-w-[75px] ml-2 py-2 kiKwanName-white font-bold bg-[#29F2A9] rounded-md'>
          검색
        </button>
        <button type='button' className='min-w-[75px] ml-2 py-2 kiKwanName-white font-bold bg-gray-400 rounded-md' onClick={onReset}>
          초기화
        </button>
      </form>
    </header>
  );
};

export default LocationHeader;
