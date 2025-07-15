/*
* =======================================================================
* 새 파일: client/src/pages/HomePage.jsx (메인 페이지 내용)
* =======================================================================
* 설명: 기존 App.jsx에 있던 메인 페이지의 실제 내용(<main> 태그 안)만
* 이곳으로 옮겨왔습니다.
*/
import React, { useState } from 'react';

// 아이콘 SVG 컴포넌트들
const ScissorsIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg> );
const HotelIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 4l9 5.5"></path><path d="M19 13v6.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 015 19.5V13"></path><path d="M12 15v5"></path><path d="M9 12v8"></path><path d="M15 12v8"></path></svg> );
const SpaIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 00-7-7c0-2 1-4 3-5s4-1 6 0c2 1 3 3 3 5a7 7 0 00-7 7z"></path><path d="M12 15V3"></path><path d="M9 3h6"></path><path d="M9 6h6"></path></svg> );
const TrainingIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14l-8-8 1.5-1.5L12 11l6.5-6.5L20 6l-8 8z"></path><path d="M12 14v8"></path></svg> );
const HealthCareIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L12 22"></path><path d="M20 10L4 10"></path></svg> );

export default function HomePage() {
  const [serverStatus, setServerStatus] = useState('서버 상태 확인 버튼을 눌러주세요.');

  const checkServer = async () => {
    try {
      const serverUrl = 'https://poshpet-server.onrender.com';
      setServerStatus('서버에 연결하는 중...');
      const response = await fetch(serverUrl);
      const data = await response.text();
      setServerStatus(`서버 응답: ${data}`);
    } catch (error) {
      console.error('Server connection failed:', error);
      setServerStatus('서버에 연결할 수 없습니다. 주소를 확인해주세요.');
    }
  };

  const services = [
    { name: '미용', description: '숙련된 그루머가 최신 스타일로 완벽하게 케어합니다.', icon: <ScissorsIcon /> },
    { name: '호텔', description: '넓고 쾌적한 공간에서 편안하고 안전하게 머무릅니다.', icon: <HotelIcon /> },
    { name: '스파', description: '피부와 모질 개선을 위한 프리미엄 스파 서비스입니다.', icon: <SpaIcon /> },
    { name: '훈련', description: '전문 훈련사와 함께하는 긍정 강화 행동 교정 프로그램입니다.', icon: <TrainingIcon /> },
    { name: '건강 관리', description: '정기적인 건강 체크와 맞춤형 영양 상담을 제공합니다.', icon: <HealthCareIcon /> },
  ];

  const brandColors = { bg: '#F8F5F0', textPrimary: '#5D4037', textSecondary: '#8D6E63', accent: '#A1887F', accentLight: '#EFEBE9' };

  return (
    <main>
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white px-6"><div className="absolute inset-0 bg-black opacity-30"></div><img src="https://images.unsplash.com/photo-1559947239-42357731034a?q=80&w=2070&auto=format&fit=crop" alt="행복하게 미용받는 강아지" className="absolute inset-0 w-full h-full object-cover"/><div className="relative z-10"><h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>내 소중한 반려가족을 위한<br />프리미엄 케어, <span style={{color: '#FFD1DC'}}>PoshPet</span></h1><p className="text-lg md:text-xl max-w-2xl mx-auto mb-8" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>전문가의 손길로 사랑과 정성을 다해 최고의 서비스를 제공합니다.</p><a href="#" className="text-white px-10 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition transform hover:scale-105" style={{ backgroundColor: brandColors.accent }}>지금 바로 예약하기</a></div></div>
      <section id="services" className="py-20" style={{ backgroundColor: 'white' }}><div className="container mx-auto px-6 text-center"><h2 className="text-3xl font-bold mb-4" style={{ color: brandColors.textPrimary }}>PoshPet의 특별한 서비스</h2><p className="max-w-2xl mx-auto mb-12" style={{ color: brandColors.textSecondary }}>각 분야 최고의 전문가들이 최상의 케어를 약속합니다.</p><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">{services.map((service, index) => ( <div key={index} className="p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300" style={{ backgroundColor: brandColors.bg }}><div className="flex items-center justify-center h-16 w-16 rounded-full mx-auto mb-6" style={{ backgroundColor: brandColors.accentLight, color: brandColors.accent }}>{service.icon}</div><h3 className="text-lg md:text-xl font-semibold mb-3" style={{ color: brandColors.textPrimary }}>{service.name}</h3><p className="text-sm md:text-base" style={{ color: brandColors.textSecondary }}>{service.description}</p></div> ))}</div></div></section>
      <section id="booking" className="py-20"><div className="container mx-auto px-6"><h2 className="text-3xl font-bold text-center mb-12" style={{ color: brandColors.textPrimary }}>간편한 예약 절차</h2><div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"><div className="text-center flex flex-col items-center"><div className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-4"><span className="text-3xl font-bold" style={{ color: brandColors.accent }}>1</span></div><h3 className="text-xl font-semibold mb-2" style={{ color: brandColors.textPrimary }}>서비스 선택</h3><p style={{ color: brandColors.textSecondary }}>원하시는 서비스를 선택하세요.</p></div><div className="hidden md:block text-4xl" style={{ color: '#D7CCC8' }}>→</div><div className="text-center flex flex-col items-center"><div className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-4"><span className="text-3xl font-bold" style={{ color: brandColors.accent }}>2</span></div><h3 className="text-xl font-semibold mb-2" style={{ color: brandColors.textPrimary }}>날짜/시간 선택</h3><p style={{ color: brandColors.textSecondary }}>예약 가능한 날짜와 시간을 확인해요.</p></div><div className="hidden md:block text-4xl" style={{ color: '#D7CCC8' }}>→</div><div className="text-center flex flex-col items-center"><div className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-4"><span className="text-3xl font-bold" style={{ color: brandColors.accent }}>3</span></div><h3 className="text-xl font-semibold mb-2" style={{ color: brandColors.textPrimary }}>예약 및 결제</h3><p style={{ color: brandColors.textSecondary }}>간편하게 예약하고 결제를 완료해요.</p></div></div></div></section>
      <div className="text-center py-10 bg-white"><h3 className="text-xl font-bold mb-4" style={{ color: brandColors.textPrimary }}>서버 연결 테스트</h3><button onClick={checkServer} className="text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition" style={{ backgroundColor: brandColors.accent }}>서버 상태 확인</button><p className="mt-4 p-4 rounded-lg" style={{ backgroundColor: brandColors.accentLight, color: brandColors.textSecondary }}>{serverStatus}</p></div>
    </main>
  );
}