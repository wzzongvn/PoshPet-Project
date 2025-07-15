/*
* =======================================================================
* 파일: client/src/pages/HomePage.jsx
* =======================================================================
*/
import React from 'react';

const ScissorsIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg> );
const HotelIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 4l9 5.5"></path><path d="M19 13v6.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 015 19.5V13"></path><path d="M12 15v5"></path><path d="M9 12v8"></path><path d="M15 12v8"></path></svg> );
const SpaIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 00-7-7c0-2 1-4 3-5s4-1 6 0c2 1 3 3 3 5a7 7 0 00-7 7z"></path><path d="M12 15V3"></path><path d="M9 3h6"></path><path d="M9 6h6"></path></svg> );
const TrainingIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14l-8-8 1.5-1.5L12 11l6.5-6.5L20 6l-8 8z"></path><path d="M12 14v8"></path></svg> );
const HealthCareIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L12 22"></path><path d="M20 10L4 10"></path></svg> );

export default function HomePage({ setCurrentPage }) {
  const services = [
    { name: '전문 미용', description: '숙련된 그루머가 최신 스타일로 완벽하게 케어합니다.', icon: <ScissorsIcon /> },
    { name: '안심 호텔', description: '넓고 쾌적한 공간에서 편안하고 안전하게 머무릅니다.', icon: <HotelIcon /> },
    { name: '프리미엄 스파', description: '피부와 모질 개선을 위한 최고급 스파 서비스입니다.', icon: <SpaIcon /> },
    { name: '긍정 강화 훈련', description: '전문 훈련사와 함께하는 즐거운 행동 교정 프로그램입니다.', icon: <TrainingIcon /> },
    { name: '맞춤 건강 관리', description: '정기적인 건강 체크와 맞춤형 영양 상담을 제공합니다.', icon: <HealthCareIcon /> },
  ];

  return (
    <div className="bg-cream-50">
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
            <button onClick={() => setCurrentPage('reservation')} className="bg-brown-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-brown-700 transition duration-300 transform hover:scale-105">
              지금 바로 예약하기
            </button>
          </div>
        </div>
      </div>
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
              {services.slice(0, 3).map((service) => (
                <div key={service.name} className="pt-6">
                  <div className="flow-root bg-cream-50 rounded-lg px-6 pb-8 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                    <div className="-mt-6">
                      <div><span className="inline-flex items-center justify-center p-3 bg-brown-600 rounded-md shadow-lg text-white">{service.icon}</span></div>
                      <h3 className="mt-8 text-lg font-medium text-brown-800 tracking-tight font-serif">{service.name}</h3>
                      <p className="mt-5 text-base text-gray-500">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
           <div className="mt-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {services.slice(3).map((service) => (
                <div key={service.name} className="pt-6">
                  <div className="flow-root bg-cream-50 rounded-lg px-6 pb-8 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                    <div className="-mt-6">
                      <div><span className="inline-flex items-center justify-center p-3 bg-brown-600 rounded-md shadow-lg text-white">{service.icon}</span></div>
                      <h3 className="mt-8 text-lg font-medium text-brown-800 tracking-tight font-serif">{service.name}</h3>
                      <p className="mt-5 text-base text-gray-500">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="booking" className="py-20 bg-cream-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-brown-800 font-serif">간편한 예약 절차</h2>
                <p className="mt-4 text-lg text-gray-500">단 3단계만으로 소중한 반려동물에게 최고의 시간을 선물하세요.</p>
            </div>
            <div className="mt-12 space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="text-center"><div className="flex items-center justify-center h-12 w-12 rounded-full bg-brown-600 text-white mx-auto">1</div><h3 className="mt-5 text-lg font-medium text-brown-800 font-serif">서비스 선택</h3><p className="mt-2 text-base text-gray-500">원하시는 서비스를 선택하세요.</p></div>
                <div className="text-center"><div className="flex items-center justify-center h-12 w-12 rounded-full bg-brown-600 text-white mx-auto">2</div><h3 className="mt-5 text-lg font-medium text-brown-800 font-serif">날짜/시간 선택</h3><p className="mt-2 text-base text-gray-500">예약 가능한 날짜와 시간을 확인해요.</p></div>
                <div className="text-center"><div className="flex items-center justify-center h-12 w-12 rounded-full bg-brown-600 text-white mx-auto">3</div><h3 className="mt-5 text-lg font-medium text-brown-800 font-serif">예약 및 결제</h3><p className="mt-2 text-base text-gray-500">간편하게 예약하고 결제를 완료해요.</p></div>
            </div>
        </div>
      </section>
    </div>
  );
}