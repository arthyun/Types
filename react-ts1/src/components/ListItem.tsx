import React from "react";
import styled from "styled-components";

interface iProps {
   rowList: {
      REFINE_LOTNO_ADDR?: string;
      REFINE_ROADNM_ADDR?: string;
      REFINE_WGS84_LAT?: string;
      REFINE_WGS84_LOGT?: string;
      REFINE_ZIP_CD?: string;
      REPRSNT_FOOD_NM?: string;
      RESTRT_NM?: string;
      RM_MATR?: null;
      SIGUN_CD?: string;
      SIGUN_NM?: string;
      TASTFDPLC_TELNO?: string;
   }[];
}

const ListContainer = styled.div`
   width: 100%;
   /* max-height: 515px; */
   /* overflow-y: scroll; */
   margin-top: 25px;
`;
const ListUl = styled.ul`
   width: 100%;
   margin: 0 auto;
   padding: 0;
`;
const ListLi = styled.li`
   background: #1d9d65;
   border-radius: 30px;
   cursor: pointer;
   &:hover {
      background: #ccc;
      & > dl {
         color: #333;
      }
   }
`;
const ListDl = styled.dl`
   display: flex;
   padding: 1rem;
   justify-content: end;
   box-sizing: border-box;
`;
const ListDt = styled.dt`
   width: 20%;
   text-align: start;
   font-weight: bold;
   padding-left: 15px;
`;
const ListDd = styled.dd`
   width: 30%;
`;

const ListItem: React.FC<iProps> = ({ rowList }) => {
   return (
      <ListContainer>
         <ListUl>
            {rowList?.map((item, index) => {
               return (
                  <ListLi key={index}>
                     <ListDl>
                        <ListDt>{item.SIGUN_NM}</ListDt>
                        <ListDd>{item.RESTRT_NM}</ListDd>
                        <ListDd>{item.TASTFDPLC_TELNO}</ListDd>
                     </ListDl>
                  </ListLi>
               );
            })}
         </ListUl>
      </ListContainer>
   );
};

export default ListItem;
