import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import ListItem from "./ListItem";

// Custom Components
const HomeContainer = styled.div`
   width: 100%;
   padding: 1rem;
   box-sizing: border-box;
   /* border: 1px solid #fff; */
`;
const FormSearch = styled.form`
   width: 100%;
   margin: 4rem 0 2rem 0;
   position: relative;
   z-index: 80;
`;
const LabelSearch = styled.label`
   display: none;
   font-size: 20px;
   margin-right: 15px;
`;
const InputSearch = styled.input`
   width: 100%;
   padding: 15px 0;
   padding-left: 30px;
   font-size: 16px;
   border: 2px solid #18d382;
   border-radius: 30px;
   box-sizing: border-box;
   &::placeholder {
      color: #18d382;
   }
`;
const SearchBtn = styled.button`
   position: absolute;
   right: 0;
   top: 0;
   z-index: 90;
   background-color: #18d382;
   width: 100px;
   height: 52px;
   border-radius: 30px;
   font-size: 20px;
   font-weight: bold;
   margin-left: 15px;
`;

interface HeadData {
   list_total_count?: string;
   RESULT?: {
      CODE: string;
      MESSAGE: string;
   };
   api_version?: string;
}

const Home = () => {
   const [text, setText] = useState<string>("");
   const [headData, setHeadData] = useState<HeadData[]>([]); // 헤더 정보
   const [rowList, setRowList] = useState<never[]>([]); // 불러온 목록
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
         setHeadData(result.PlaceThatDoATasteyFoodSt[0].head);
         setRowList(result.PlaceThatDoATasteyFoodSt[1].row);
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
            <h1 style={{ color: "#18d382" }}>Spoon</h1>
            <FormSearch onSubmit={onSubmit}>
               <LabelSearch htmlFor="search">검색창</LabelSearch>
               <InputSearch
                  id="search"
                  type="text"
                  value={text}
                  onChange={onChangeText}
                  placeholder="검색어를 입력하세요"
               />
               <SearchBtn type="submit">검색</SearchBtn>
            </FormSearch>
            <span>총 {headData[0]?.list_total_count ?? 0} 개의 맛집을 불러왔습니다.</span>
            <ListItem rowList={rowList} />
         </HomeContainer>
      </>
   );
};

export default Home;
