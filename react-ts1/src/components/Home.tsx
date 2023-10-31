import React, { useEffect } from "react";

const Home = () => {
   const openKey = "1fa67d81d0db4d32bbd263f5a3cc05af";

   useEffect(() => {
      fetch(`https://openapi.gg.go.kr/PlaceThatDoATasteyFoodSt?KEY=${openKey}&Type=json&pIndex=1&pSize=200&SIGUN_NM=과천시`)
         .then((res) => res.json())
         .then((data) => console.log(data));
   }, []);

   return <div>경기도 맛집 찾기</div>;
};

export default Home;
