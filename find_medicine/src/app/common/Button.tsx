'use client';

import React from 'react';

interface IProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  onFunc: () => void;
  buttonName: string;
}

const Button: React.FC<IProps> = ({ type, onFunc, buttonName }) => {
  return (
    <button type={type} onClick={onFunc} className="block border-2 border-gray-500 text-xs p-1 box-border">
      {buttonName}
    </button>
  );
};

export default Button;
