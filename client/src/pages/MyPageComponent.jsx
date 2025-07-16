/*
* =======================================================================
* 3단계: 파일 수정 - client/src/pages/MyPageComponent.jsx
* =======================================================================
* 설명: '완료된' 예약 내역 옆에 '리뷰 작성' 버튼을 추가하고,
* 버튼 클릭 시 리뷰 작성 모달을 띄우는 기능을 구현합니다.
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
    setError(''); setSuccess('');
    try {
      const response = await addPet({ name, type, breed });
      setPets([...pets, response.data]);
      setSuccess(`${name} 정보가 성공적으로 추가되었습니다.`);
      setShowAddForm(false);
      setName(''); setType('Dog'); setBreed('');
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
        <div className="lg:col-span-1 space-y-8">{/* ... 펫 관리 부분 ... */}</div>
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