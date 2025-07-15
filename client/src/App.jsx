/*
* =======================================================================
* 파일: client/src/App.jsx (수정)
* =======================================================================
* 설명: 이제 App.jsx는 로그인 상태(사용자 정보, 토큰)를 관리하는
* 가장 중요한 역할을 합니다. 로그인에 성공하면 사용자 정보를 저장하고,
* 로그아웃하면 정보를 삭제합니다.
*/
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ReservationPage from './pages/ReservationPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // 앱이 처음 시작될 때, 브라우저 저장소(localStorage)에
  // 사용자 정보가 남아있는지 확인합니다.
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 로그인 처리 함수
  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
    setCurrentPage('home'); // 로그인 성공 시 홈으로 이동
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentPage('home'); // 로그아웃 시 홈으로 이동
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} onLogin={handleLogin} />;
      case 'reservation':
        return <ReservationPage setCurrentPage={setCurrentPage} user={user} />;
      case 'home':
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="antialiased text-gray-800">
      <Header setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}