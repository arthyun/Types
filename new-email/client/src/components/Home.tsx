import React from 'react';

const Home = () => {
  return (
    <div className="w-[100vw] h-[100vh] border-4 border-red-600">
      <form className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[35%] h-aut mx-auto p-7 box-border border-2 border-black">
        <h1 className="font-bold text-2xl py-4">로그인이 필요합니다.</h1>
        <div className="flex border-2 border-gray-300">
          <label htmlFor="id" className="pl-6 leading-10">
            ID
          </label>
          <input id="id" className="w-full ml-6 pl-2 py-1 text-lg box-border bg-gray-100" type="text" placeholder="..." />
        </div>
        <div className="flex mt-2 border-2 border-gray-300">
          <label htmlFor="pass" className="pl-6 leading-10">
            PASSWORD
          </label>
          <input id="pass" className="w-full ml-6 pl-2 py-1 text-lg box-border bg-gray-100" type="password" placeholder="..." />
        </div>
        <button type="submit" className="w-full mt-2 py-3 font-bold text-xl bg-green-400 text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default Home;
