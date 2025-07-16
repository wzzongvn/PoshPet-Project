/*
* =======================================================================
* 파일: client/src/App.jsx (수정)
* =======================================================================
* 설명: 전체적인 레이아웃과 페이지 전환 로직을 관리합니다.
*/
import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ReservationPage from './pages/ReservationPage.jsx';
import MyPage from './pages/MyPageComponent.jsx'; 
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminServicesPage from './pages/AdminServicesPage.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  },);

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
        return user? <MyPage user={user} /> : <LoginPage setCurrentPage={setCurrentPage} onLogin={handleLogin} />;
      case 'admin-dashboard':
        return user && user.role === 'admin'? <AdminDashboard /> : <HomePage setCurrentPage={setCurrentPage} />;
      case 'admin-services':
        return user && user.role === 'admin'? <AdminServicesPage /> : <HomePage setCurrentPage={setCurrentPage} />;
      case 'home':
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="font-sans antialiased text-brown-800 bg-cream-50">
      <Header setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}