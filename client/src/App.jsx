/*
* =======================================================================
* 파일: client/src/App.jsx (수정)
* =======================================================================
* 설명: '마이페이지'로 이동할 수 있도록 라우팅 로직을 추가합니다.
*/
import React, { useState, useEffect } from 'react';
// ★★★ 에러 해결: 모든 파일 경로에 .jsx 확장자를 명시적으로 추가합니다. ★★★
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ReservationPage from './pages/ReservationPage.jsx';
import MyPage from './pages/MyPage.jsx'; 

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} onLogin={handleLogin} />;
      case 'reservation':
        return <ReservationPage setCurrentPage={setCurrentPage} user={user} />;
      // --- 마이페이지 렌더링 로직 추가 ---
      case 'my-page':
        // 로그인한 사용자만 마이페이지에 접근 가능
        return user ? <MyPage user={user} /> : <LoginPage setCurrentPage={setCurrentPage} onLogin={handleLogin} />;
      case 'home':
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="antialiased text-gray-800 bg-cream-50">
      <Header setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} />
      <main className="min-h-screen">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}