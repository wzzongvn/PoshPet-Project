/*
* =======================================================================
* 새 파일: client/src/pages/AdminDashboard.jsx
* =======================================================================
* 설명: 관리자 전용 페이지입니다. 모든 예약 내역을 테이블 형태로 보여주고,
* 각 예약의 상태를 변경할 수 있는 드롭다운 메뉴를 제공합니다.
*/
import React, { useState, useEffect } from 'react';
import { getAllReservations, updateReservationStatus } from '../services/api.js';

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getAllReservations();
        setReservations(response.data);
      } catch (err) {
        setError('예약 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateReservationStatus(id, newStatus);
      // 상태 변경 성공 시, 화면의 예약 목록을 업데이트
      setReservations(reservations.map(res => 
        res._id === id ? { ...res, status: newStatus } : res
      ));
    } catch (err) {
      alert('상태 변경에 실패했습니다.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('ko-KR', options);
  };

  if (loading) return <div className="text-center py-20">로딩 중...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brown-800 font-serif mb-8">관리자 대시보드</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-brown-700 mb-6">전체 예약 관리</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">예약일</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">고객명</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">펫 정보</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">서비스</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((res) => (
                <tr key={res._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(res.reservationDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{res.user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.pet.name} ({res.pet.type})</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{res.serviceName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select 
                      value={res.status} 
                      onChange={(e) => handleStatusChange(res._id, e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-brown-300 focus:ring focus:ring-brown-200 focus:ring-opacity-50"
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}