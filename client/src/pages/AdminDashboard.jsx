/*
* =======================================================================
* 3단계: 파일: client/src/pages/AdminDashboard.jsx (수정)
* =======================================================================
* 설명: 기존의 예약 목록 테이블과 새로운 예약 캘린더 뷰를
* 버튼으로 전환하며 볼 수 있도록 페이지 구조를 변경합니다.
*/
import React, { useState, useEffect } from 'react';
import { getAllReservations, updateReservationStatus } from '../services/api.js';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 설정
import '../calendar-styles.css'; // 캘린더 전용 CSS import

moment.locale('ko'); // moment 라이브러리 한국어 설정
const localizer = momentLocalizer(moment);

export default function AdminDashboard() {
  const [view, setView] = useState('list'); // 'list' 또는 'calendar'
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

  // 캘린더에 표시할 이벤트 데이터 형식으로 변환
  const events = reservations.map(res => ({
    id: res._id,
    title: `${res.pet.name} - ${res.serviceName}`,
    start: new Date(res.reservationDate),
    end: moment(res.reservationDate).add(2, 'hours').toDate(), // 예약 시간을 2시간으로 가정
    resource: res, // 원본 예약 데이터
  }));

  if (loading) return <div className="text-center py-20">로딩 중...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brown-800 font-serif">관리자 대시보드</h1>
        {/* 뷰 전환 버튼 */}
        <div>
          <button onClick={() => setView('list')} className={`px-4 py-2 text-sm font-medium rounded-l-lg ${view === 'list' ? 'bg-brown-600 text-white' : 'bg-white'}`}>
            목록 보기
          </button>
          <button onClick={() => setView('calendar')} className={`px-4 py-2 text-sm font-medium rounded-r-lg ${view === 'calendar' ? 'bg-brown-600 text-white' : 'bg-white'}`}>
            캘린더 보기
          </button>
        </div>
      </div>
      
      {view === 'list' ? (
        // 예약 목록 뷰 (기존 테이블)
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
                      <select value={res.status} onChange={(e) => handleStatusChange(res._id, e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-brown-300 focus:ring focus:ring-brown-200 focus:ring-opacity-50">
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
      ) : (
        // 예약 캘린더 뷰
        <div className="h-[75vh]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            messages={{
              next: "다음",
              previous: "이전",
              today: "오늘",
              month: "월",
              week: "주",
              day: "일",
              agenda: "목록"
            }}
          />
        </div>
      )}
    </div>
  );
}