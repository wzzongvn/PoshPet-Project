/*
* =======================================================================
* 새 파일: client/src/pages/ReservationPage.jsx (예약 페이지)
* =======================================================================
* 설명: 실시간 예약 기능을 만들 공간입니다. 지금은 간단한 제목만 보여줍니다.
*/
import React from 'react';

export default function ReservationPage({ setCurrentPage }) {
  const services = [
    { name: '전문 미용', price: '70,000 VND', duration: '2시간' },
    { name: '안심 호텔 (1박)', price: '50,000 VND', duration: '24시간' },
    { name: '프리미엄 스파', price: '90,000 VND', duration: '1.5시간' },
  ];

  return (
    <div className="bg-cream-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-brown-800 font-serif">실시간 예약</h2>
          <p className="mt-4 text-lg text-gray-500">원하시는 서비스와 시간을 선택해주세요.</p>
        </div>

        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">
          <form className="space-y-8">
            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">1. 서비스 선택</label>
              <select id="service" name="service" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm rounded-md">
                {services.map(s => <option key={s.name}>{s.name} - {s.price}</option>)}
              </select>
            </div>

            {/* Pet Information */}
            <div>
              <label htmlFor="pet-name" className="block text-sm font-medium text-gray-700">2. 반려동물 정보</label>
              <div className="mt-1 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <input type="text" name="pet-name" id="pet-name" placeholder="이름" className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="sm:col-span-3">
                  <input type="text" name="pet-breed" id="pet-breed" placeholder="품종" className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
            </div>
            
            {/* Date & Time Selection */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">3. 날짜 및 시간 선택</label>
              <input type="date" name="date" id="date" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              {/* 시간 선택 UI는 추후 달력 라이브러리와 연동하여 구현 */}
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">4. 요청사항</label>
              <div className="mt-1">
                <textarea id="notes" name="notes" rows={3} className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="미용 시 특별히 주의해야 할 점이나 특이사항을 알려주세요."></textarea>
              </div>
            </div>
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button type="button" onClick={() => setCurrentPage('home')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500">
                  취소
                </button>
                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brown-600 hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500">
                  예약 확정
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}