'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import image1 from '/public/food0.png';
import image2 from '/public/food1.png';
import image3 from '/public/food2.png';

const List = () => {
  let 상품: string[] = ['Tomatoes', 'Pasta', 'Coconut'];
  let 이미지: StaticImageData[] = [image1, image2, image3];

  const [count, setCount] = useState<number[]>([0, 0, 0]);

  return (
    <div>
      <h4 className="title">상품목록</h4>
      {상품.map((item, i) => {
        return (
          <div className="food" key={i}>
            <Image src={이미지[i]} className="food-img" alt={item} />
            <h4>{item} $40</h4>
            <span>{count[i]}</span>&nbsp;
            <button
              onClick={() => {
                let copy = [...count];
                if (copy[i] >= 0) {
                  copy[i]++;
                  setCount(copy);
                }
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                let copy = [...count];
                if (copy[i] > 0) {
                  copy[i]--;
                  setCount(copy);
                }
              }}
            >
              -
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default List;
