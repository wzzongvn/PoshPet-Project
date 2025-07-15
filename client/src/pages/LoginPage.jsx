/*
* =======================================================================
* 새 파일: client/src/pages/LoginPage.jsx (로그인 페이지)
* =======================================================================
* 설명: 앞으로 로그인 폼을 만들 공간입니다. 지금은 간단한 제목만 보여줍니다.
*/
import React from 'react';

export default function LoginPage({ setCurrentPage }) {
  return (
    <div className="bg-cream-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-brown-800 font-serif">
            로그인
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm" placeholder="이메일 주소" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm" placeholder="비밀번호" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-brown-600 hover:text-brown-500">
                비밀번호를 잊으셨나요?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brown-600 hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500">
              로그인
            </button>
          </div>
        </form>
         <div className="text-sm text-center">
            <p className="text-gray-600">
                계정이 없으신가요?
              <button onClick={() => alert('회원가입 페이지로 이동합니다.')} className="font-medium text-brown-600 hover:text-brown-500 ml-1">
                회원가입
              </button>
            </p>
          </div>
      </div>
    </div>
  );
}