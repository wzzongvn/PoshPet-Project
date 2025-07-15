/*
* =======================================================================
* 파일: client/src/App.jsx (수정)
* =======================================================================
* 설명: 관리자가 '서비스 관리' 페이지로 이동할 수 있도록 라우팅 로직을 추가합니다.
*/
import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ReservationPage from './pages/ReservationPage.jsx';
import MyPage from './pages/MyPageComponent.jsx'; 
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminServicesPage from './pages/AdminServicesPage.jsx'; // 서비스 관리 페이지 import

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
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
      case 'my-page':
        return user ? <MyPage user={user} /> : <LoginPage setCurrentPage={setCurrentPage} onLogin={handleLogin} />;
      case 'admin-dashboard':
        return user && user.role === 'admin' ? <AdminDashboard /> : <HomePage setCurrentPage={setCurrentPage} />;
      // ★★★ 서비스 관리 페이지 렌더링 로직 추가 ★★★
      case 'admin-services':
        return user && user.role === 'admin' ? <AdminServicesPage /> : <HomePage setCurrentPage={setCurrentPage} />;
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