/*
* =======================================================================
* 파일: client/src/pages/AdminServicesPage.jsx (수정)
* =======================================================================
* 설명: 서버가 보내주는 실제 에러 메시지를 화면에 직접 표시하도록 수정합니다.
*/
import React, { useState, useEffect } from 'react';
import { getAllServices, createService } from '../services/api.js';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        setServices(response.data);
      } catch (err) {
        // ★★★ 디버그 코드: 서버가 보내는 실제 에러 메시지를 표시합니다. ★★★
        const errorMsg = err.response?.data?.msg || err.message || '알 수 없는 오류가 발생했습니다.';
        setError(`서비스 정보를 불러오는 데 실패했습니다: ${errorMsg}`);
      }
    };
    fetchServices();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const serviceData = {
        name,
        description,
        price: parseInt(price, 10),
        duration: parseInt(duration, 10)
      };

      const response = await createService(serviceData);
      setServices([...services, response.data]);
      setSuccess(`${name} 서비스가 성공적으로 추가되었습니다.`);
      setShowAddForm(false);
      setName(''); setDescription(''); setPrice(''); setDuration('');
    } catch (err) {
      // ★★★ 디버그 코드: 서버가 보내는 실제 에러 메시지를 표시합니다. ★★★
      const errorMsg = err.response?.data?.msg || err.message || '알 수 없는 오류가 발생했습니다.';
      setError(`서비스 추가에 실패했습니다: ${errorMsg}`);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brown-800 font-serif mb-8">서비스 관리</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-brown-700">등록된 서비스 목록</h2>
          <button onClick={() => setShowAddForm(!showAddForm)} className="bg-brown-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brown-700">
            {showAddForm ? '취소' : '새 서비스 추가'}
          </button>
        </div>
        {/* 서비스 목록이 비어있을 때와 에러 발생 시를 구분하여 표시 */}
        {error && !showAddForm && <p className="text-sm text-red-600">{error}</p>}
        {!error && services.length === 0 && <p className="text-gray-500">아직 등록된 서비스가 없습니다.</p>}
        <ul className="divide-y divide-gray-200">
          {services.map(service => (
            <li key={service._id} className="py-4">
              <p className="text-sm font-medium text-gray-900">{service.name} ({service.duration}분)</p>
              <p className="text-sm text-gray-500">{service.description}</p>
              <p className="text-sm font-bold text-right">{service.price.toLocaleString()} VND</p>
            </li>
          ))}
        </ul>
      </div>

      {showAddForm && (
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-brown-700 mb-6">새로운 서비스 등록</h2>
          <form onSubmit={handleAddService} className="space-y-4">
            <div>
              <label htmlFor="service-name" className="block text-sm font-medium text-gray-700">서비스명</label>
              <input type="text" id="service-name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="service-desc" className="block text-sm font-medium text-gray-700">설명</label>
              <textarea id="service-desc" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="service-price" className="block text-sm font-medium text-gray-700">가격 (VND)</label>
                <input type="number" id="service-price" value={price} onChange={e => setPrice(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="service-duration" className="block text-sm font-medium text-gray-700">소요 시간 (분)</label>
                <input type="number" id="service-duration" value={duration} onChange={e => setDuration(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>
            {/* 폼 아래에 에러/성공 메시지 표시 */}
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
            <div className="text-right">
              <button type="submit" className="bg-brown-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-brown-700">저장하기</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}