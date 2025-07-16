/*
* =======================================================================
* 파일: client/src/pages/HomePage.jsx
* =======================================================================
*/
import React from 'react';

const ServiceCard = ({ imageUrl, title, description }) => (
  <div className="group relative">
    <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
      <img src={imageUrl} alt={title} className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-lg text-brown-800 font-serif">
          <span aria-hidden="true" className="absolute inset-0" />
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

export default function HomePage({ setCurrentPage }) {
  const services = [
    { title: '전문 미용', description: '숙련된 그루머의 섬세한 터치', imageUrl: 'http://googleusercontent.com/file_content/130' },
    { title: '안심 호텔', description: '내 집처럼 편안하고 안전한 공간', imageUrl: 'http://googleusercontent.com/file_content/131' },
    { title: '프리미엄 스파', description: '피부와 모질을 위한 특별 케어', imageUrl: 'http://googleusercontent.com/file_content/132' },
    { title: '유치원 & 놀이터', description: '사회성을 키우는 즐거운 시간', imageUrl: 'http://googleusercontent.com/file_content/133' },
  ];

  return (
    <div className="bg-cream-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="http://googleusercontent.com/file_content/134" alt="PoshPet 매장 전경" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-32 px-4 sm:py-48 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-serif">
            당신의 반려가족을 위한<br/>가장 특별한 하루
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-cream-100">
            Posh Pet은 단순한 케어를 넘어, 사랑과 전문성으로<br/>잊지 못할 경험을 선물합니다.
          </p>
          <div className="mt-10">
            <button onClick={() => setCurrentPage('reservation')} className="bg-white text-brown-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cream-100 transition duration-300 transform hover:scale-105 shadow-2xl">
              지금 바로 예약하기
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-brown-600 tracking-wider uppercase">Our Services</h2>
            <p className="mt-2 text-3xl font-extrabold text-brown-800 tracking-tight sm:text-4xl font-serif">
              최고의 전문가들이 제공하는<br/>프리미엄 케어 서비스
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
             <h2 className="text-base font-semibold text-brown-600 tracking-wider uppercase">Pricing</h2>
            <p className="mt-2 text-3xl font-extrabold text-brown-800 tracking-tight sm:text-4xl font-serif">
              합리적이고 투명한 가격 정책
            </p>
          </div>
          <div className="mt-16">
            <img src="http://googleusercontent.com/file_content/135" alt="PoshPet 가격표" className="rounded-lg shadow-2xl mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
}