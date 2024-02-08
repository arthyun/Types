'use client';
import React, { ChangeEvent, FormEvent, SetStateAction, useRef, useState } from 'react';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { faHouseMedical } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  selectForm1: string;
  selectForm2: string;
  setSelectForm1: React.Dispatch<SetStateAction<string>>;
  setSelectForm2: React.Dispatch<SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<SetStateAction<string>>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LocationHeader = ({ onSubmit, selectForm1, selectForm2, setSelectForm1, setSelectForm2, text, setText, onChange }: IProps) => {
  const formRef: any | HTMLFormElement = useRef(undefined);

  return (
    <header className="bg-white z-10 w-full flex border-b-2 border-black-300 px-4 py-4 fixed top-0 left-0 items-center text-start justify-center">
      <FontAwesomeIcon icon={faHouseMedical} style={{ display: 'block', width: '7%', color: '#29F2A9', fontSize: '40px' }} />
      <form onSubmit={onSubmit} className="searchArea min-w-[350px]" ref={formRef}>
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
        <button
          type="button"
          className="min-w-[75px] ml-2 py-2 text-white font-bold bg-gray-400 rounded-md"
          onClick={() => {
            setSelectForm1('');
            setSelectForm2('');
            setText('');
            // onSubmit?.();
          }}
        >
          초기화
        </button>
      </form>
    </header>
  );
};

export default LocationHeader;
