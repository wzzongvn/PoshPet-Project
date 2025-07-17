/*
* 4.1. 파일 수정: client/src/components/Header.jsx
* -----------------------------------------------------------------------
*/
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // ★★★ 1. useTranslation 훅 import


const PoshPetLogo = () => (
    <img 
      src="/assets/image_9791c6.jpg" 
      alt="PoshPet Logo" 
      className="h-16 w-auto"
    />
);

export default function Header({ setCurrentPage, user, onLogout }) {
  const { t, i18n } = useTranslation(); // ★★★ 2. 훅 사용
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };
  
  const LanguageSwitcher = () => (
    <div className="flex items-center border border-gray-300 rounded-full">
      <button onClick={() => i18n.changeLanguage('ko')} className={`px-3 py-1 text-xs rounded-full ${i18n.language === 'ko' ? 'bg-brown-700 text-white' : ''}`}>KO</button>
      <button onClick={() => i18n.changeLanguage('en')} className={`px-3 py-1 text-xs rounded-full ${i18n.language === 'en' ? 'bg-brown-700 text-white' : ''}`}>EN</button>
      <button onClick={() => i18n.changeLanguage('vi')} className={`px-3 py-1 text-xs rounded-full ${i18n.language === 'vi' ? 'bg-brown-700 text-white' : ''}`}>VI</button>
    </div>
  );

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <button onClick={() => handleNavClick('home')} className="focus:outline-none">
              <PoshPetLogo />
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <a href="#services" className="text-brown-700 hover:text-brown-800 px-3 py-2 rounded-md text-sm font-semibold">{t('menu.services')}</a>
            <a href="#pricing" className="text-brown-700 hover:text-brown-800 px-3 py-2 rounded-md text-sm font-semibold">{t('menu.pricing')}</a>
            {user ? (
              <>
                <button onClick={() => handleNavClick('my-page')} className="text-brown-700 hover:text-brown-800 px-3 py-2 rounded-md text-sm font-semibold">{t('menu.myPage')}</button>
                <button onClick={onLogout} className="text-brown-700 hover:text-brown-800 px-3 py-2 rounded-md text-sm font-semibold">{t('menu.logout')}</button>
                {user.role === 'admin' && (
                  <button onClick={() => handleNavClick('admin-dashboard')} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-red-600 transition">{t('menu.admin')}</button>
                )}
              </>
            ) : (
              <button onClick={() => handleNavClick('login')} className="text-brown-700 hover:text-brown-800 px-3 py-2 rounded-md text-sm font-semibold">{t('menu.login')}</button>
            )}
          </div>
          <div className="hidden md:block ml-4">
             <button onClick={() => handleNavClick('reservation')} className="bg-brown-700 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-brown-800 transition duration-300 shadow-lg transform hover:scale-105">
                {t('menu.realtimeBooking')}
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} type="button" className="bg-white p-2 rounded-md text-brown-700 hover:bg-cream-100 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <a href="#services" className="text-brown-700 hover:bg-cream-100 block px-3 py-2 rounded-md text-base font-medium">{t('menu.services')}</a>
             <a href="#pricing" className="text-brown-700 hover:bg-cream-100 block px-3 py-2 rounded-md text-base font-medium">{t('menu.pricing')}</a>
            {user ? (
              <>
                <button onClick={() => handleNavClick('my-page')} className="text-brown-700 hover:bg-cream-100 block w-full text-left px-3 py-2 rounded-md text-base font-medium">{t('menu.myPage')}</button>
                <button onClick={onLogout} className="text-brown-700 hover:bg-cream-100 block w-full text-left px-3 py-2 rounded-md text-base font-medium">{t('menu.logout')}</button>
                {user.role === 'admin' && <button onClick={() => handleNavClick('admin-dashboard')} className="text-red-500 font-bold hover:bg-cream-100 block w-full text-left px-3 py-2 rounded-md text-base">{t('menu.admin')}</button>}
              </>
            ) : (
              <button onClick={() => handleNavClick('login')} className="text-brown-700 hover:bg-cream-100 block w-full text-left px-3 py-2 rounded-md text-base font-medium">{t('menu.login')}</button>
            )}
             <div className="pt-4 px-2"><button onClick={() => handleNavClick('reservation')} className="w-full bg-brown-700 text-white px-4 py-3 rounded-full text-base font-semibold hover:bg-brown-800 transition">{t('menu.realtimeBooking')}</button></div>
          </div>
        </div>
      )}
    </header>
  );
}