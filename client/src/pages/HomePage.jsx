/*
* =======================================================================
* 파일: client/src/pages/HomePage.jsx (수정)
* =======================================================================
* 설명: 전체적인 디자인을 세련되게 다듬고, 서비스 메뉴를 추가했습니다.
*/
import React from 'react';

const ServiceCard = ({ icon, name, description }) => (
  <div className="pt-6">
    <div className="flow-root bg-cream-50 rounded-lg px-6 pb-8 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg h-full">
      <div className="-mt-6">
        <div>
          <span className="inline-flex items-center justify-center p-3 bg-brown-600 rounded-md shadow-lg text-white">
            {icon}
          </span>
        </div>
        <h3 className="mt-8 text-lg font-medium text-brown-800 tracking-tight font-serif">{name}</h3>
        <p className="mt-5 text-base text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

export default function HomePage({ setCurrentPage }) {
  const services =;

  return (
    <div className="bg-cream-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1598810553911-b7ea245c4b1b?q=80&w=2070&auto=format&fit=crop" alt="행복하게 미용받는 강아지" />
          <div className="absolute inset-0 bg-gray-800 mix-blend-multiply" style={{opacity: 0.5}}></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-serif">
            내 소중한 반려가족을 위한<br/>프리미엄 케어, <span className="text-pink-300">Posh Pet</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-cream-100">
            전문가의 손길로 사랑과 정성을 다해 최고의 서비스를 제공합니다.
          </p>
          <div className="mt-10">
            <button onClick={() => setCurrentPage('reservation')} className="bg-brown-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-brown-700 transition duration-300 transform hover:scale-105 shadow-lg">
              지금 바로 예약하기
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-brown-600 tracking-wider uppercase">Our Services</h2>
            <p className="mt-2 text-3xl font-extrabold text-brown-800 tracking-tight sm:text-4xl font-serif">
              Posh Pet의 특별한 서비스
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              각 분야 최고의 전문가들이 최상의 케어를 약속합니다.
            </p>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.name} {...service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Book Section */}
      <section id="booking" className="py-20 bg-cream-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-brown-800 font-serif">간편한 예약 절차</h2>
                <p className="mt-4 text-lg text-gray-500">단 3단계만으로 소중한 반려동물에게 최고의 시간을 선물하세요.</p>
            </div>
            <div className="mt-12 space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="text-center"><div className="flex items-center justify-center h-12 w-12 rounded-full bg-brown-600 text-white mx-auto font-bold text-lg">1</div><h3 className="mt-5 text-lg font-medium text-brown-800 font-serif">서비스 선택</h3><p className="mt-2 text-base text-gray-500">원하시는 서비스를 선택하세요.</p></div>
                <div className="text-center"><div className="flex items-center justify-center h-12 w-12 rounded-full bg-brown-600 text-white mx-auto font-bold text-lg">2</div><h3 className="mt-5 text-lg font-medium text-brown-800 font-serif">날짜/시간 선택</h3><p className="mt-2 text-base text-gray-500">예약 가능한 날짜와 시간을 확인해요.</p></div>
                <div className="text-center"><div className="flex items-center justify-center h-12 w-12 rounded-full bg-brown-600 text-white mx-auto font-bold text-lg">3</div><h3 className="mt-5 text-lg font-medium text-brown-800 font-serif">예약 및 결제</h3><p className="mt-2 text-base text-gray-500">간편하게 예약하고 결제를 완료해요.</p></div>
            </div>
        </div>
      </section>
    </div>
  );
}