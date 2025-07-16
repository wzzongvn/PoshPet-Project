/*
* 2.2. 파일 수정: client/src/pages/AdminDashboard.jsx
* -----------------------------------------------------------------------
* 설명: KPI 카드, 고객 관리 탭, 고객 목록 테이블을 추가하여
* 대시보드를 최종적으로 업그레이드합니다.
*/
import React, { useState, useEffect } from 'react';
import { getAllReservations, updateReservationStatus, getDashboardStats, getAllUsers } from '../services/api.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// 아이콘 컴포넌트 추가
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 1.003m-3-3.75a4 4 0 110-5.292M12 4.354a4 4 0 010 5.292" /></svg>;
const RevenueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const BookingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;

export default function AdminDashboard() {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'reservations', 'users'
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ monthlySales: [], serviceCounts: [], totalRevenue: 0, totalUsers: 0, totalReservations: 0 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [reservationsRes, statsRes, usersRes] = await Promise.all([
          getAllReservations(),
          getDashboardStats(),
          getAllUsers()
        ]);
        
        setReservations(reservationsRes.data);
        setUsers(usersRes.data);
        
        const formattedSales = statsRes.data.monthlySales.map(item => ({
          name: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
          '월 매출 (VND)': item.totalRevenue,
        }));
        const formattedServiceCounts = statsRes.data.serviceCounts.map(item => ({ name: item._id, '예약 수': item.count }));

        setStats({ ...statsRes.data, monthlySales: formattedSales, serviceCounts: formattedServiceCounts });

      } catch (err) {
        // ★★★ 디버그 코드: 서버가 보내는 실제 에러 메시지를 표시합니다. ★★★
        const errorMsg = err.response?.data?.msg || err.message || '알 수 없는 오류가 발생했습니다.';
        setError(`관리자 정보를 불러오는 데 실패했습니다: ${errorMsg}`);
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

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl shadow-lg text-white`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="p-3 bg-white/20 rounded-lg">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brown-800 font-serif">관리자 대시보드</h1>
        <div>
          <button onClick={() => setView('dashboard')} className={`px-4 py-2 text-sm font-medium rounded-l-lg ${view === 'dashboard' ? 'bg-brown-600 text-white' : 'bg-white border'}`}>통계</button>
          <button onClick={() => setView('reservations')} className={`px-4 py-2 text-sm font-medium ${view === 'reservations' ? 'bg-brown-600 text-white' : 'bg-white border'}`}>예약 목록</button>
          <button onClick={() => setView('users')} className={`px-4 py-2 text-sm font-medium rounded-r-lg ${view === 'users' ? 'bg-brown-600 text-white' : 'bg-white border'}`}>고객 관리</button>
        </div>
      </div>
      
      {view === 'dashboard' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="총 매출" value={`${stats.totalRevenue.toLocaleString()} VND`} icon={<RevenueIcon />} color="from-green-500 to-green-400" />
            <StatCard title="총 예약 수" value={`${stats.totalReservations} 건`} icon={<BookingsIcon />} color="from-blue-500 to-blue-400" />
            <StatCard title="총 고객 수" value={`${stats.totalUsers} 명`} icon={<UsersIcon />} color="from-indigo-500 to-indigo-400" />
          </div>
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg">
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
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
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
        </div>
      )}
      
      {view === 'reservations' && (
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

      {view === 'users' && (
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-brown-700 mb-6">전체 고객 목록</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">권한</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {user.role}
                      </span>
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