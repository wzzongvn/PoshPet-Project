/*
* =======================================================================
* 3단계: 파일 수정 - client/src/pages/MyPageComponent.jsx (최종 수정본)
* =======================================================================
* 설명: 사라졌던 '펫 관리' 기능을 복원하고, 예약 내역과 리뷰 기능을 통합한
* 완전한 최종 버전입니다.
*/
import React, { useState, useEffect } from 'react';
import { getMyPets, addPet, getMyReservations } from '../services/api.js';
import ReviewModal from '../components/ReviewModal.jsx';

export default function MyPageComponent({ user }) {
  const [pets, setPets] = useState([]);
  const [reservations, setReservations] = useState([]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('Dog');
  const [breed, setBreed] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReservationForReview, setSelectedReservationForReview] = useState(null);

  const fetchMyData = async () => {
    try {
      const [petsRes, reservationsRes] = await Promise.all([
        getMyPets(),
        getMyReservations(),
      ]);
      setPets(petsRes.data);
      setReservations(reservationsRes.data);
    } catch (err) {
      setError('정보를 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyData();
    }
  }, [user]);

  const handleAddPet = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccess('');
    try {
      const response = await addPet({ name, type, breed });
      setPets([...pets, response.data]);
      setSuccess(`${name} 정보가 성공적으로 추가되었습니다.`);
      setShowAddForm(false);
      setName(''); 
      setType('Dog'); 
      setBreed('');
    } catch (err) {
      setError(err.response?.data?.msg || '반려동물 추가에 실패했습니다.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  const openReviewModal = (reservation) => {
    setSelectedReservationForReview(reservation);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = (reviewSubmitted = false) => {
    setIsReviewModalOpen(false);
    setSelectedReservationForReview(null);
    if (reviewSubmitted) {
      alert("소중한 후기 감사합니다!");
      fetchMyData(); // 리뷰 작성 후 목록 새로고침
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brown-800 font-serif mb-8">마이페이지</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 왼쪽: 반려동물 관리 */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-brown-700">나의 사랑스러운 펫</h2>
              <button onClick={() => setShowAddForm(!showAddForm)} className="bg-brown-100 text-brown-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-brown-200">
                {showAddForm ? '닫기' : '추가'}
              </button>
            </div>
            {pets.length > 0 ? (
              <ul className="divide-y divide-gray-200">{pets.map(pet => ( <li key={pet._id} className="py-3 flex items-center"><p className="text-sm font-medium text-gray-900">{pet.name}</p><p className="text-sm text-gray-500 ml-auto">{pet.type} - {pet.breed}</p></li> ))}</ul>
            ) : ( <p className="text-gray-500 text-sm">아직 등록된 반려동물이 없습니다.</p> )}
          </div>

          {showAddForm && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-brown-700 mb-4">새로운 가족 등록하기</h2>
              <form onSubmit={handleAddPet} className="space-y-4">
                <div>
                  <label htmlFor="pet-name" className="block text-sm font-medium text-gray-700">이름</label>
                  <input type="text" id="pet-name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="pet-type" className="block text-sm font-medium text-gray-700">종류</label>
                  <select id="pet-type" value={type} onChange={e => setType(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm rounded-md"><option>Dog</option><option>Cat</option><option>Other</option></select>
                </div>
                <div>
                  <label htmlFor="pet-breed" className="block text-sm font-medium text-gray-700">품종</label>
                  <input type="text" id="pet-breed" value={breed} onChange={e => setBreed(e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}
                <div className="text-right">
                  <button type="submit" className="bg-brown-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-brown-700">저장하기</button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* 오른쪽: 예약 내역 */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-brown-700 mb-6">예약 내역</h2>
          <div className="space-y-4">
            {reservations.length > 0 ? (
              reservations.map(res => (
                <div key={res._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-brown-800">{res.service.name}</p>
                    <p className="text-sm text-gray-600">펫: {res.pet.name}</p>
                    <p className="text-sm text-gray-500">{formatDate(res.reservationDate)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${res.status === 'Completed' ? 'bg-green-100 text-green-800' : res.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {res.status}
                    </span>
                    {res.status === 'Completed' && (
                      <button onClick={() => openReviewModal(res)} className="bg-blue-500 text-white px-3 py-1 text-xs rounded-full hover:bg-blue-600">리뷰 작성</button>
                    )}
                  </div>
                </div>
              ))
            ) : ( <p className="text-gray-500 text-center py-10">예약 내역이 없습니다.</p> )}
          </div>
        </div>
      </div>
      
      {isReviewModalOpen && (
        <ReviewModal reservation={selectedReservationForReview} onClose={closeReviewModal} />
      )}
    </div>
  );
}