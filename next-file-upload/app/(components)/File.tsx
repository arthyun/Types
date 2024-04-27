'use client';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';

export default function File() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileDownload, setFileDownload] = useState<string | null>(null);
  const [pValue, setpValue] = useState(0);

  // 파일 첨부
  const fileOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setFile(files[0]);
    }
  };

  // 다운로드
  const downloadFile = () => {
    if (fileDownload) {
      const a = document.createElement('a');
      a.href = fileDownload; // /uploads/
      a.download = fileDownload.substring(9);
      a.click();
    }
  };

  // 초기화
  const reset = () => {
    if (fileRef.current) {
      fileRef.current.value = '';
      setFile(null);
      setpValue(0);
      setFileDownload(null);
    }
  };

  return (
    <div>
      <form
        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData();
          if (file) {
            formData.append('file', file);
            await axios
              .post('/api/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent: any) => {
                  let pert = (progressEvent.loaded * 100) / progressEvent.total;
                  setpValue(pert / 100);
                }
              })
              .then((res) => setFileDownload(res.data.path))
              .catch((err) => alert(err))
              .finally(() => setTimeout(() => alert('업로드 성공'), 1000));
          } else {
            alert('파일을 선택하세요.');
            return false;
          }
        }}
      >
        <input className='block' type='file' onChange={fileOnchange} ref={fileRef} />

        {!fileDownload ? (
          <button className='w-full border-2 border-white-500 py-2 my-4' type='submit'>
            업로드
          </button>
        ) : (
          <button className='w-full border-2 border-white-500 py-2 my-4' type='button' onClick={downloadFile}>
            다운로드
          </button>
        )}
      </form>
      {!fileDownload ? (
        <progress className='w-full' value={pValue} />
      ) : (
        <button className='w-full border-2 border-white-500 py-2' type='button' onClick={reset}>
          돌아가기
        </button>
      )}
    </div>
  );
}
