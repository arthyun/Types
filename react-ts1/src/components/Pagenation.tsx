/* eslint-disable */
import React from "react";

interface iProps {
   pageCnt: number;
   setPageCnt: React.Dispatch<React.SetStateAction<number>>;
   totalCnt: number;
}

const Pagenation = ({ pageCnt, setPageCnt, totalCnt }: iProps) => {
   // 페이징을 위한 필수 state 값들
   const totalPage = Math.ceil(totalCnt / 10);
   const pageGroup = Math.ceil(pageCnt / 10);
   const firstPageNum = (pageGroup - 1) * 10 + 1;
   const lastPageNum = pageGroup * 10 > totalPage ? totalPage : pageGroup * 10;

   // 뿌릴 번호 배열 만들기
   let pageListArr = [];
   for (let i = 0; i < totalPage; i++) {
      pageListArr.push(i + 1);
   }

   // console.log("보여질 그룹: ", pageGroup);
   // console.log("그룹 첫번째 페이지번호: ", firstPageNum);
   // console.log("그룹 마지막 페이지번호: ", lastPageNum);

   return (
      <div style={{ display: "flex", justifyContent: "center" }}>
         <button
            type="button"
            onClick={() => {
               if (pageCnt > 1) {
                  setPageCnt(pageCnt - 1);
               }
            }}
         >
            이전
         </button>
         <ul style={{ display: "flex", justifyContent: "center", gap: "15px", padding: "0 15px" }}>
            {pageListArr?.slice(firstPageNum - 1, lastPageNum).map((item, i) => {
               return (
                  <li
                     key={i}
                     style={{ width: "20px" }}
                  >
                     <a
                        href="#!"
                        className={item === pageCnt ? "activePageNum" : undefined}
                        onClick={() => setPageCnt(item)}
                     >
                        {item}
                     </a>
                  </li>
               );
            })}
         </ul>
         <button
            type="button"
            onClick={() => {
               if (pageCnt < totalPage) {
                  setPageCnt(pageCnt + 1);
               }
            }}
         >
            다음
         </button>
         <style>
            {`
               .activePageNum {
                  display: block;
                  background: #ccc;
                  color: #333;
                  font-weight: bold;
               }
            `}
         </style>
      </div>
   );
};

export default Pagenation;
