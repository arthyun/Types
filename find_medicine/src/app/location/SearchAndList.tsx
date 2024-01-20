'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { createParam } from './page';
import axios from 'axios';

const SearchAndList = ({ data }: { data: any }) => {
  const [rowList, setRowList] = useState<string[]>([]);
  const [text, setText] = useState<string>('');

  // 최초 진입시
  useEffect(() => {
    setRowList(data);
  }, []);

  // 함수들
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const refreshData = async (text: string) => {
    const params = {
      serviceKey: '9D7Rg6V6wDr4R1GG9TV/Y1c4JU9ttSuq9KL8/+5PMw4tls0giUwdYXMH751nxznUp7lL3wQL0YDgFZYc/dNtwQ==',
      Q0: '서울특별시', // 주소
      Q1: '강남구', // 시/도
      QT: '1', // 요일
      QN: text, // 기관명
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
    <div className="clientSide">
      <form onSubmit={onSubmit} className="searchArea">
        <input type="text" value={text} placeholder="약국명을 입력하세요" onChange={onChange} />
        <button type="submit">검색</button>
      </form>
      <br />
      <div className="listArea">
        <ul>
          {rowList?.map((item: any, index: number) => {
            return (
              <li key={index}>
                <dl>
                  <dt>{item.dutyAddr}</dt>
                  <dd>{item.dutyName}</dd>
                  <dd>{item.dutyTel1}</dd>
                  <dd>{item.rnum}</dd>
                  <dd>{item.wgs84Lat}</dd>
                  <dd>{item.wgs84Lon}</dd>
                </dl>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchAndList;
