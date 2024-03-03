import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from './loading-animation.json';

const LoadingSplash = () => {
  return (
    <div className="loadingBox absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
      <Lottie animationData={loadingAnimation} />
    </div>
  );
};

export default LoadingSplash;
