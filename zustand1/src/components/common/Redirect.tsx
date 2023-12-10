import React, { useEffect } from 'react';

const Redirect = () => {
  useEffect(() => {
    window.location.replace('/');
  }, []);

  return <></>;
};

export default Redirect;
