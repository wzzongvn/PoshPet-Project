/*
* =======================================================================
* 파일: client/src/App.jsx (가장 바깥의 틀 역할을 합니다)
* =======================================================================
* 설명: 이 파일은 이제 어떤 페이지를 보여줄지 결정하는 '교통정리' 역할만 합니다.
* Header와 Footer는 모든 페이지에 공통으로 보이게 하고,
* currentPage 상태에 따라 HomePage, LoginPage, ReservationPage를 바꿔서 보여줍니다.
*/
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ReservationPage from './pages/ReservationPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage />;
      case 'reservation':
        return <ReservationPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <Header setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}