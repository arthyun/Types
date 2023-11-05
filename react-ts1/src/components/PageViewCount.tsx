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
            <option value={10}>10개</option>
            <option value={20}>20개</option>
            <option value={30}>30개</option>
            <option value={40}>40개</option>
            <option value={50}>50개</option>
         </select>
      </>
   );
};

export default PageViewCount;
