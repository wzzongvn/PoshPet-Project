/*
* =======================================================================
* 새 파일: client/src/pages/MyPage.jsx
* =======================================================================
* 설명: 사용자가 자신의 반려동물 목록을 보고, 새로 추가할 수 있는 페이지입니다.
*/
import React, { useState, useEffect } from 'react';
import { getMyPets, addPet } from '../services/api';

export default function MyPage({ user }) {
  const [pets, setPets] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // 폼 입력 상태
  const [name, setName] = useState('');
  const [type, setType] = useState('Dog');
  const [breed, setBreed] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 페이지가 로드될 때 내 반려동물 목록을 불러옵니다.
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getMyPets();
        setPets(response.data);
      } catch (err) {
        setError('반려동물 정보를 불러오는 데 실패했습니다.');
      }
    };
    fetchPets();
  }, []);

  const handleAddPet = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await addPet({ name, type, breed });
      setPets([...pets, response.data]); // 목록에 새 펫 추가
      setSuccess(`${name} 정보가 성공적으로 추가되었습니다.`);
      setShowAddForm(false); // 폼 숨기기
      // 폼 초기화
      setName('');
      setType('Dog');
      setBreed('');
    } catch (err) {
      setError(err.response?.data?.msg || '반려동물 추가에 실패했습니다.');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brown-800 font-serif mb-8">마이페이지</h1>
      
      {/* 내 반려동물 목록 */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-brown-700">나의 사랑스러운 펫</h2>
          <button onClick={() => setShowAddForm(!showAddForm)} className="bg-brown-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brown-700">
            {showAddForm ? '취소' : '새 펫 추가하기'}
          </button>
        </div>

        {pets.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {pets.map(pet => (
              <li key={pet._id} className="py-4 flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{pet.name}</p>
                  <p className="text-sm text-gray-500">{pet.type} - {pet.breed}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">아직 등록된 반려동물이 없습니다.</p>
        )}
      </div>

      {/* 새 반려동물 추가 폼 */}
      {showAddForm && (
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-brown-700 mb-6">새로운 가족 등록하기</h2>
          <form onSubmit={handleAddPet} className="space-y-6">
            <div>
              <label htmlFor="pet-name" className="block text-sm font-medium text-gray-700">이름</label>
              <input type="text" id="pet-name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="pet-type" className="block text-sm font-medium text-gray-700">종류</label>
              <select id="pet-type" value={type} onChange={e => setType(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm rounded-md">
                <option>Dog</option>
                <option>Cat</option>
                <option>Other</option>
              </select>
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
  );
}
