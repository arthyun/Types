import React from 'react';
import { age } from './data';

export default function Cart() {
  let 장바구니: string[] = ['Tomatoes', 'Pasta'];

  return (
    <div>
      <h4>Cart</h4>
      <CartItem 상품={장바구니[0]} />
      <CartItem 상품={장바구니[1]} />
    </div>
  );
}

function CartItem({ 상품 }: { 상품: string }) {
  return (
    <div className="cart-item">
      <p>{상품}</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  );
}
