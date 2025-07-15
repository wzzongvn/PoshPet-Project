/*
* =======================================================================
* 파일: client/src/pages/AdminServicesPage.jsx (수정)
* =======================================================================
* 설명: 관리자가 서비스를 보고, 새로 추가할 수 있는 페이지입니다.
* '가격'과 '소요 시간'을 서버로 보내기 전에 숫자로 변환하는 로직을 추가했습니다.
*/
import React, { useState, useEffect } from 'react';
import { getAllServices, createService } from '../services/api.js';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(''); // 초기값을 빈 문자열로 변경
  const [duration, setDuration] = useState(''); // 초기값을 빈 문자열로 변경
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        setServices(response.data);
      } catch (err) {
        setError('서비스 정보를 불러오는 데 실패했습니다.');
      }
    };
    fetchServices();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // ★★★ 문제 해결: 서버로 보내기 전에 문자열을 숫자로 변환합니다. ★★★
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
      setError(err.response?.data?.msg || '서비스 추가에 실패했습니다.');
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