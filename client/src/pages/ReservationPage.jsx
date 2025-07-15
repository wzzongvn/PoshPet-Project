/*
* =======================================================================
* 파일: client/src/pages/ReservationPage.jsx (수정)
* =======================================================================
* 설명: 실제 예약 기능을 구현합니다. 등록된 반려동물 목록을 불러와 선택하고,
* 예약 정보를 입력하여 서버로 전송합니다.
*/
import React, { useState, useEffect } from 'react';
import { getMyPets, createReservation } from '../services/api';

export default function ReservationPage({ setCurrentPage, user }) {
  const [myPets, setMyPets] = useState([]);
  
  // 폼 상태
  const [selectedPet, setSelectedPet] = useState('');
  const [selectedService, setSelectedService] = useState('전문 미용');
  const [reservationDate, setReservationDate] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const availableServices = [
    { name: '전문 미용', price: '70,000 VND' },
    { name: '안심 호텔 (1박)', price: '50,000 VND' },
    { name: '프리미엄 스파', price: '90,000 VND' },
  ];

  useEffect(() => {
    if (user) {
      const fetchPets = async () => {
        try {
          const response = await getMyPets();
          setMyPets(response.data);
          if (response.data.length > 0) {
            setSelectedPet(response.data[0]._id); // 첫 번째 펫을 기본으로 선택
          }
        } catch (err) {
          setError('반려동물 정보를 불러오는 데 실패했습니다.');
        }
      };
      fetchPets();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedPet) {
      setError('예약할 반려동물을 선택해주세요. 마이페이지에서 먼저 등록할 수 있습니다.');
      return;
    }
    if (!reservationDate) {
      setError('예약 날짜를 선택해주세요.');
      return;
    }

    try {
      const reservationData = {
        petId: selectedPet,
        serviceName: selectedService,
        reservationDate,
        notes,
      };
      await createReservation(reservationData);
      setSuccess('예약이 성공적으로 접수되었습니다. 확인 후 연락드리겠습니다.');
    } catch (err) {
      setError(err.response?.data?.msg || '예약 생성에 실패했습니다.');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <p>예약을 하시려면 먼저 로그인이 필요합니다.</p>
        <button onClick={() => setCurrentPage('login')} className="mt-4 bg-brown-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brown-700">
          로그인 페이지로 이동
        </button>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-brown-800 font-serif">실시간 예약</h2>
          <p className="mt-4 text-lg text-gray-500">원하시는 서비스와 시간을 선택해주세요.</p>
        </div>

        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="pet" className="block text-sm font-medium text-gray-700">1. 예약할 펫 선택</label>
              {myPets.length > 0 ? (
                <select id="pet" value={selectedPet} onChange={e => setSelectedPet(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm rounded-md">
                  {myPets.map(p => <option key={p._id} value={p._id}>{p.name} ({p.breed})</option>)}
                </select>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  등록된 반려동물이 없습니다. 
                  <button type="button" onClick={() => setCurrentPage('my-page')} className="font-medium text-brown-600 hover:text-brown-500 ml-1">마이페이지에서 추가해주세요.</button>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">2. 서비스 선택</label>
              <select id="service" value={selectedService} onChange={e => setSelectedService(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm rounded-md">
                {availableServices.map(s => <option key={s.name}>{s.name}</option>)}
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">3. 날짜 및 시간 선택</label>
              <input type="datetime-local" value={reservationDate} onChange={e => setReservationDate(e.target.value)} name="date" id="date" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">4. 요청사항</label>
              <div className="mt-1">
                <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} name="notes" rows={3} className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="미용 시 특별히 주의해야 할 점이나 특이사항을 알려주세요."></textarea>
              </div>
            </div>
            
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            {success && <p className="text-sm text-green-600 text-center">{success}</p>}

            <div className="pt-5">
              <div className="flex justify-end">
                <button type="button" onClick={() => setCurrentPage('home')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500">
                  취소
                </button>
                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brown-600 hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500">
                  예약 신청하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}