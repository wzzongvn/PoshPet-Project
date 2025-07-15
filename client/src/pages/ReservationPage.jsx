/*
* =======================================================================
* 파일: client/src/pages/ReservationPage.jsx (수정)
* =======================================================================
* 설명: 예약 페이지를 새로운 시스템에 맞게 완전히 수정합니다.
* 날짜를 선택하면, API를 통해 예약 가능한 시간 슬롯을 받아와 버튼으로 보여줍니다.
*/
import React, { useState, useEffect } from 'react';
import { getMyPets, createReservation, getAllServices, getAvailableSlots } from '../services/api.js';

export default function ReservationPage({ setCurrentPage, user }) {
  const [myPets, setMyPets] = useState([]);
  const [services, setServices] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  
  const [selectedPet, setSelectedPet] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      const fetchInitialData = async () => {
        try {
          const petsRes = await getMyPets();
          setMyPets(petsRes.data);
          if (petsRes.data.length > 0) setSelectedPet(petsRes.data[0]._id);

          const servicesRes = await getAllServices();
          setServices(servicesRes.data);
          if (servicesRes.data.length > 0) setSelectedService(servicesRes.data[0]._id);

        } catch (err) {
          setError('정보를 불러오는 데 실패했습니다.');
        }
      };
      fetchInitialData();
    }
  }, [user]);

  useEffect(() => {
    if (selectedDate) {
      const fetchSlots = async () => {
        try {
          const response = await getAvailableSlots(selectedDate);
          setAvailableSlots(response.data);
          setSelectedSlot('');
        } catch (err) {
          setError('예약 가능 시간을 불러오는 데 실패했습니다.');
          setAvailableSlots([]);
        }
      };
      fetchSlots();
    }
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedPet || !selectedService || !selectedSlot) {
      setError('펫, 서비스, 예약 시간을 모두 선택해주세요.');
      return;
    }

    try {
      const reservationData = {
        petId: selectedPet,
        serviceId: selectedService,
        reservationDate: selectedSlot,
        notes,
      };
      await createReservation(reservationData);
      setSuccess('예약이 성공적으로 접수되었습니다. 마이페이지에서 확인해주세요.');
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
              {myPets.length > 0 ? ( <select id="pet" value={selectedPet} onChange={e => setSelectedPet(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm rounded-md">{myPets.map(p => <option key={p._id} value={p._id}>{p.name} ({p.breed})</option>)}</select> ) : ( <p className="text-sm text-gray-500 mt-2">등록된 반려동물이 없습니다. <button type="button" onClick={() => setCurrentPage('my-page')} className="font-medium text-brown-600 hover:text-brown-500 ml-1">마이페이지에서 추가해주세요.</button></p> )}
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">2. 서비스 선택</label>
              <select id="service" value={selectedService} onChange={e => setSelectedService(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm rounded-md">
                {services.map(s => <option key={s._id} value={s._id}>{s.name} - {s.price.toLocaleString()} VND</option>)}
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">3. 날짜 선택</label>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} name="date" id="date" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>

            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700">4. 시간 선택</label>
                <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableSlots.length > 0 ? (
                    availableSlots.map(slot => (
                      <button 
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-2 text-sm rounded-md transition ${selectedSlot === slot ? 'bg-brown-600 text-white' : 'bg-cream-100 hover:bg-brown-200'}`}
                      >
                        {new Date(slot).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 col-span-full">선택하신 날짜에 예약 가능한 시간이 없습니다.</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">5. 요청사항</label>
              <div className="mt-1"><textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} name="notes" rows={3} className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="미용 시 특별히 주의해야 할 점이나 특이사항을 알려주세요."></textarea></div>
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