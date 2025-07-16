/*
* =======================================================================
* 파일: client/src/pages/LoginPage.jsx
* =======================================================================
*/
import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/api.js';

export default function LoginPage({ setCurrentPage, onLogin }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLoginView) {
      try {
        const response = await loginUser({ email, password });
        onLogin(response.data.user, response.data.token);
      } catch (err) {
        setError(err.response?.data?.msg || '로그인에 실패했습니다.');
      }
    } else {
      try {
        const response = await registerUser({ name, email, password });
        setSuccess(response.data.msg + ' 이제 로그인해주세요.');
        setIsLoginView(true);
      } catch (err) {
        setError(err.response?.data?.msg || '회원가입에 실패했습니다.');
      }
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div><h2 className="mt-6 text-center text-3xl font-extrabold text-brown-800 font-serif">{isLoginView ? '로그인' : '회원가입'}</h2></div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLoginView && ( <div><label htmlFor="name" className="sr-only">이름</label><input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm" placeholder="이름" /></div> )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div><label htmlFor="email-address" className="sr-only">이메일 주소</label><input id="email-address" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${isLoginView ? 'rounded-t-md' : ''} focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm`} placeholder="이메일 주소" /></div>
            <div><label htmlFor="password" className="sr-only">비밀번호</label><input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm" placeholder="비밀번호" /></div>
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {success && <p className="text-sm text-green-600 text-center">{success}</p>}
          <div className="flex items-center justify-between"><div className="text-sm"><a href="#" className="font-medium text-brown-600 hover:text-brown-500">비밀번호를 잊으셨나요?</a></div></div>
          <div><button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brown-600 hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500">{isLoginView ? '로그인' : '가입하기'}</button></div>
        </form>
         <div className="text-sm text-center"><p className="text-gray-600">{isLoginView ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}<button onClick={() => { setIsLoginView(!isLoginView); setError(''); setSuccess(''); }} className="font-medium text-brown-600 hover:text-brown-500 ml-1">{isLoginView ? '회원가입' : '로그인'}</button></p></div>
      </div>
    </div>
  );
}