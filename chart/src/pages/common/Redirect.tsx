import React, { useEffect } from 'react';

export default function Redirect() {
  useEffect(() => {
    window.location.replace('/');
  }, []);

  return <>404 NOT FOUND</>;
}
