'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import './write.css';

// Types
interface SubmitTypes {
  title: string;
  content: string;
}

const Write = () => {
  const { handleSubmit, register, watch } = useForm<SubmitTypes>({
    defaultValues: {
      title: '',
      content: ''
    }
  });

  const router = useRouter();

  const onSubmit = async (formData: SubmitTypes): Promise<void> => {
    const response = await fetch('/api/post/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const result = await response.json();
    if (result !== 'Success') {
      console.error(result);
    } else {
      //   console.log(result);
      router.push('/list');
    }
  };

  return (
    <div className="p-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} placeholder="글제목" />
        <input {...register('content')} placeholder="글내용" />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default Write;
