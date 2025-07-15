/*
* =======================================================================
* 새 파일: client/src/components/Header.jsx (헤더 부분)
* =======================================================================
* 설명: 모든 페이지 상단에 공통으로 보일 헤더(로고, 메뉴)입니다.
* 이제 메뉴를 클릭하면 App.jsx로부터 전달받은 setCurrentPage 함수를 호출하여
* 실제로 페이지를 변경합니다.
*/
import React, { useState } from 'react';

const PoshPetLogo = () => (
  <img 
    src="/assets/image_9791c6.jpg" 
    alt="PoshPet Logo" 
    className="h-12 w-auto"
  />
);

export default function Header({ setCurrentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const brandColors = { bg: '#F8F5F0', textSecondary: '#8D6E63', accent: '#A1887F', textPrimary: '#5D4037' };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false); // 모바일 메뉴 클릭 후 닫기
  };

  return (
    <header className="shadow-sm sticky top-0 z-50" style={{ backgroundColor: brandColors.bg }}>
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
        <button onClick={() => handleNavClick('home')} className="cursor-pointer">
          /* <PoshPetLogo /> */
        </button>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="hover:opacity-75" style={{ color: brandColors.textSecondary }}>서비스</a>
          <a href="#booking" className="hover:opacity-75" style={{ color: brandColors.textSecondary }}>예약 방법</a>
          <a href="#about" className="hover:opacity-75" style={{ color: brandColors.textSecondary }}>소개</a>
          <button onClick={() => handleNavClick('login')} className="hover:opacity-75" style={{ color: brandColors.textSecondary }}>로그인</button>
        </div>
        <button onClick={() => handleNavClick('reservation')} className="hidden md:block text-white px-6 py-2 rounded-full hover:opacity-90 transition" style={{ backgroundColor: brandColors.accent }}>
          실시간 예약
        </button>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="focus:outline-none" style={{ color: brandColors.textPrimary }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="md:hidden py-4" style={{ backgroundColor: brandColors.bg }}>
          <a href="#services" className="block px-6 py-2" style={{ color: brandColors.textSecondary }}>서비스</a>
          <a href="#booking" className="block px-6 py-2" style={{ color: brandColors.textSecondary }}>예약 방법</a>
          <a href="#about" className="block px-6 py-2" style={{ color: brandColors.textSecondary }}>소개</a>
          <button onClick={() => handleNavClick('login')} className="block w-full text-left px-6 py-2" style={{ color: brandColors.textSecondary }}>로그인</button>
          <div className="px-6 mt-2">
            <button onClick={() => handleNavClick('reservation')} className="block w-full text-center text-white px-6 py-2 rounded-full transition" style={{ backgroundColor: brandColors.accent }}>
              실시간 예약
            </button>
          </div>
        </div>
      )}
    </header>
  );
}