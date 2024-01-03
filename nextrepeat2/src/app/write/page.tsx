'use client';

import React, { FormEvent } from 'react';

const Write = () => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const response = await fetch('/api/test', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <h4>글작성</h4>
      <form onSubmit={onSubmit}>
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default Write;
