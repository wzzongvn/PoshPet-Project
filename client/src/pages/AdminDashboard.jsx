/*
* 3.2. 파일 수정: client/src/pages/AdminDashboard.jsx
* -----------------------------------------------------------------------
* 설명: 기존의 예약 목록과 함께, 월별 매출과 서비스별 예약 현황을
* 보여주는 차트를 추가하여 대시보드를 업그레이드합니다.
*/
import React, { useState, useEffect } from 'react';
import { getAllReservations, updateReservationStatus, getDashboardStats } from '../services/api.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminDashboard() {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'list'
  const [reservations, setReservations] = useState([]);
  const [stats, setStats] = useState({ monthlySales: [], serviceCounts: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [reservationsRes, statsRes] = await Promise.all([
          getAllReservations(),
          getDashboardStats()
        ]);
        setReservations(reservationsRes.data);
        
        const formattedSales = statsRes.data.monthlySales.map(item => ({
          name: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
          '월 매출 (VND)': item.totalRevenue,
        }));
        
        const formattedServiceCounts = statsRes.data.serviceCounts.map(item => ({
          name: item._id,
          '예약 수': item.count,
        }));

        setStats({ ...statsRes.data, monthlySales: formattedSales, serviceCounts: formattedServiceCounts });

      } catch (err) {
        setError('관리자 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
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

  if (loading) return <div className="text-center py-20">로딩 중...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brown-800 font-serif">관리자 대시보드</h1>
        <div>
          <button onClick={() => setView('dashboard')} className={`px-4 py-2 text-sm font-medium rounded-l-lg ${view === 'dashboard' ? 'bg-brown-600 text-white' : 'bg-white border'}`}>
            통계
          </button>
          <button onClick={() => setView('list')} className={`px-4 py-2 text-sm font-medium rounded-r-lg ${view === 'list' ? 'bg-brown-600 text-white' : 'bg-white border'}`}>
            전체 예약 목록
          </button>
        </div>
      </div>
      
      {view === 'dashboard' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-brown-700 mb-4">월별 매출 현황</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.monthlySales} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis width={80} tickFormatter={(value) => `${(value/1000).toLocaleString()}K`} />
                <Tooltip formatter={(value) => `${value.toLocaleString()} VND`} />
                <Legend />
                <Line type="monotone" dataKey="월 매출 (VND)" stroke="#8D6E63" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-brown-700 mb-4">서비스별 예약 순위</h3>
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.serviceCounts} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip formatter={(value) => `${value} 건`} />
                <Legend />
                <Bar dataKey="예약 수" fill="#A1887F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.pet ? `${res.pet.name} (${res.pet.type})` : '정보 없음'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{res.service ? res.service.name : '정보 없음'}</td>
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
      )}
    </div>
  );
}
