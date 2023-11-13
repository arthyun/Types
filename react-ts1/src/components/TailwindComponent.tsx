import React, { useEffect, useRef } from "react";

const TailwindComponent = () => {
   const listRef = useRef<HTMLLIElement[]>([]);

   useEffect(() => {
      if (listRef.current) {
         listRef.current[0].classList.add("text-3xl");
         listRef.current[1].classList.add("text-3xl");
         listRef.current[2].classList.add("text-3xl");
      }
   }, []);

   return (
      <div className="md:w-full md:container md:mx-auto">
         <ul className="flex md:flex-col lg:flex-row gap-10 justify-center w-full">
            <li
               ref={(el) => (listRef.current[0] = el as HTMLLIElement)}
               className="bg-white font-bold text-red-500 rounded-lg hover:bg-pink-500 md:w-40 lg:w-60 py-16"
            >
               1
            </li>
            <li
               ref={(el) => (listRef.current[1] = el as HTMLLIElement)}
               className="bg-white font-bold text-red-500 rounded-lg md:w-40 lg:w-60 py-16"
            >
               2
            </li>
            <li
               ref={(el) => (listRef.current[2] = el as HTMLLIElement)}
               className="bg-white font-bold text-red-500 rounded-lg md:w-40 lg:w-60 py-16 relative"
            >
               <span className="w-16 h-6 overflow-hidden text-sm bg-gray-500 absolute top-0 right-0">position</span>
            </li>
         </ul>
      </div>
   );
};

export default TailwindComponent;
