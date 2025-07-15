/*
* =======================================================================
* 파일: client/src/components/Header.jsx
* =======================================================================
*/
import React, { useState } from 'react';

const PawIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brown-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
);

export default function Header({ setCurrentPage, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-cream-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button onClick={() => handleNavClick('home')} className="flex items-center space-x-2">
              <PawIcon />
              <span className="text-2xl font-bold text-brown-800 font-serif">Posh Pet</span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {user && (
                <button onClick={() => handleNavClick('my-page')} className="text-brown-700 hover:bg-brown-100 px-3 py-2 rounded-md text-sm font-medium">
                  마이페이지
                </button>
              )}
              {user ? (
                <>
                  <span className="text-brown-700 px-3 py-2 rounded-md text-sm font-medium">
                    {user.name}님
                  </span>
                  <button onClick={onLogout} className="text-brown-700 hover:bg-brown-100 px-3 py-2 rounded-md text-sm font-medium">
                    로그아웃
                  </button>
                </>
              ) : (
                <button onClick={() => handleNavClick('login')} className="text-brown-700 hover:bg-brown-100 px-3 py-2 rounded-md text-sm font-medium">
                  로그인
                </button>
              )}
            </div>
          </div>
          <div className="hidden md:block">
             <button onClick={() => handleNavClick('reservation')} className="bg-brown-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-brown-700 transition duration-300">
                실시간 예약
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          {/* Mobile menu content */}
        </div>
      )}
    </header>
  );
}