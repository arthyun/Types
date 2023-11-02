import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

// Custom Components
const HomeContainer = styled.div`
   width: 100%;
   padding: 1rem;
   box-sizing: border-box;
   border: 1px solid #fff;
`;
const LabelSearch = styled.label`
   display: none;
   font-size: 20px;
   margin-right: 15px;
`;
const InputSearch = styled.input`
   width: 300px;
   padding: 10px 5px;
   font-size: 16px;
`;

const Home = () => {
   const [text, setText] = useState<string>("");
   const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setText(value);
   };

   // 초기 데이터 호출
   const openKey: string = "1fa67d81d0db4d32bbd263f5a3cc05af";
   const getData = async (text: string): Promise<void> => {
      try {
         const response = await fetch(`https://openapi.gg.go.kr/PlaceThatDoATasteyFoodSt?KEY=${openKey}&Type=json&pIndex=1&pSize=200&SIGUN_NM=${text}`);
         const result = await response.json();
         console.log(result);
         return result;
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      getData(text);
   }, []);

   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // console.log("form!");
      getData(text);
   };

   return (
      <>
         <Sidebar />
         <HomeContainer>
            <h3>경기도 맛집 찾기</h3>
            <form onSubmit={onSubmit}>
               <LabelSearch htmlFor="search">검색창</LabelSearch>
               <InputSearch
                  id="search"
                  type="text"
                  value={text}
                  onChange={onChangeText}
                  placeholder="검색어를 입력하세요"
               />
               <button type="submit">검색</button>
            </form>
         </HomeContainer>
      </>
   );
};

export default Home;
