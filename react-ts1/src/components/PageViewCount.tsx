import React, { ChangeEvent } from "react";

interface iProps {
   limit: number;
   setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const PageViewCount = ({ limit, setLimit }: iProps) => {
   const onChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setLimit(Number(value));
   };

   return (
      <>
         <select
            style={{ width: "120px", padding: "5px 10px", fontSize: "16px", borderRadius: "15px" }}
            value={limit}
            onChange={onChangeLimit}
         >
            <option value={20}>20개</option>
            <option value={40}>40개</option>
            <option value={60}>60개</option>
            <option value={80}>80개</option>
            <option value={100}>100개</option>
         </select>
      </>
   );
};

export default PageViewCount;
