import React, { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    window.location.replace('/');
  }, []);

  return <div>잘못된 접근입니다.</div>;
};

export default NotFound;
