import React, { useEffect } from "react";

const RedirectPage = () => {
   useEffect(() => {
      window.location.replace("/");
   }, []);
   return <></>;
};

export default RedirectPage;
