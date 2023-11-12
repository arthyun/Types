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
      <div className="md:container md:mx-auto">
         <ul className="flex gap-10 justify-center">
            <li
               ref={(el) => (listRef.current[0] = el as HTMLLIElement)}
               className="p-20 bg-white font-bold text-red-500 rounded-lg w-16 md:w-32 lg:w-48"
            >
               1
            </li>
            <li
               ref={(el) => (listRef.current[1] = el as HTMLLIElement)}
               className="p-20 bg-white font-bold text-red-500 rounded-lg w-16 md:w-32 lg:w-48"
            >
               2
            </li>
            <li
               ref={(el) => (listRef.current[2] = el as HTMLLIElement)}
               className="p-20 bg-white font-bold text-red-500 rounded-lg w-16 md:w-32 lg:w-48"
            >
               3
            </li>
         </ul>
      </div>
   );
};

export default TailwindComponent;
