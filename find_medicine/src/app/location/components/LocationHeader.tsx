'use client';
import React, { ChangeEvent, FormEvent, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseMedical } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  onSubmit: (e?: FormEvent<HTMLFormElement>) => Promise<void>;
  selectForm1: string;
  selectForm2: string;
  setSelectForm1: React.Dispatch<SetStateAction<string>>;
  setSelectForm2: React.Dispatch<SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<SetStateAction<string>>;
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
  setSsr?: React.Dispatch<SetStateAction<boolean>>;
  sidoInfo: string[] | any[];
  siGunGu: string[] | any[];
}

const LocationHeader = ({
  serviceKey,
  Q0,
  Q1,
  QT,
  QN,
  ORD,
  pageNo,
  numOfRows
}: {
  serviceKey: string;
  Q0: string;
  Q1: string;
  QT: string;
  QN: string;
  ORD: string;
  pageNo: string | number;
  numOfRows: string | number;
}) => {
  const router = useRouter();

  // States
  const [selectForm1, setSelectForm1] = useState<string>('');
  const [selectForm2, setSelectForm2] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [sidoInfo, setSidoInfo] = useState<string[] | any[]>([]);
  const [siGunGu, setSiGunGu] = useState<string[] | any[]>([]);

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
    router.replace(`/location?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&Q0=${selectForm1}&Q1=${selectForm2}&QT=1&QN=${text}&ORD=NAME&pageNo=${1}&numOfRows=${10}`);
    // setSsr(false);
    // const result = await getData(selectForm1, selectForm2, text, limit);
    // // result?.response?.body?.items?.item
    // setRowList(Array.isArray(result?.response?.body?.items?.item) ? result?.response?.body?.items?.item : []);
    // setPageCnt(result?.response?.body?.pageNo);
    // setTotalCnt(result?.response?.body?.totalCount);
  };

  const onReset = async () => {
    // try {
    //   setSelectForm1('');
    //   setSelectForm2('');
    //   setText('');
    //   // setSsr(true);
    //   //  onSubmit?.();
    // } catch (error) {
    //   console.error(error);
    // }
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
    getSido().then((res) => setSidoInfo(res.response.result?.featureCollection?.features?.reduce((acc: any, cur: any) => acc.concat(cur.properties), [])));
    // if (!ssr) {
    //    getData(selectForm1, selectForm2, text, limit, pageCnt).then((result) => {
    //       setRowList(result.response?.body?.items?.item);
    //       setPageCnt(result.response?.body?.pageNo);
    //       setTotalCnt(result.response?.body?.totalCount);
    //    });
    // }
  }, []);

  useMemo(() => {
    if (selectForm1 !== '') {
      getSiGunGu().then((res) => {
        let newData = res.response.result.featureCollection.features.reduce((acc: any, cur: any) => acc.concat(cur.properties), []);
        setSiGunGu(newData.filter((item: any) => item.full_nm.startsWith(selectForm1)));
      });
    }
  }, [selectForm1]);

  return (
    <header className='bg-white z-10 w-full flex border-b-2 border-black-300 px-4 py-4 fixed top-0 left-0 items-center text-start justify-center'>
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
        <select value={selectForm1} id='siDo' onChange={onChange} className='border-2 border-[#29F2A9] rounded-md min-w-[115px] py-2 ml-2'>
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
        <select value={selectForm2} id='siGunGu' onChange={onChange} className='border-2 border-[#29F2A9] rounded-md min-w-[115px] py-2 ml-2'>
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
          type='text'
          id='text'
          value={text}
          placeholder='상호명을 입력하세요'
          onChange={onChange}
          className='min-w-[350px] ml-2 py-1.5 pl-2 border-2 border-[#29F2A9] rounded-md'
        />
        <button type='submit' className='min-w-[75px] ml-2 py-2 text-white font-bold bg-[#29F2A9] rounded-md'>
          검색
        </button>
        <button type='button' className='min-w-[75px] ml-2 py-2 text-white font-bold bg-gray-400 rounded-md' onClick={onReset}>
          초기화
        </button>
      </form>
    </header>
  );
};

export default LocationHeader;
