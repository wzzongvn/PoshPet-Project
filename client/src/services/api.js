/*
* =======================================================================
* 파일: client/src/services/api.js (수정)
* =======================================================================
* 설명: 관리자 전용 API 함수들을 추가합니다.
*/
import axios from 'axios';

const API_URL = 'https://poshpet-server.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);
export const getMyPets = () => api.get('/pets');
export const addPet = (petData) => api.post('/pets', petData);
export const createReservation = (reservationData) => api.post('/reservations', reservationData);
export const getMyReservations = () => api.get('/reservations');

// ★★★ 관리자 API 함수 추가 ★★★
// 모든 예약 내역 가져오기
export const getAllReservations = () => api.get('/admin/reservations');
// 예약 상태 업데이트하기
export const updateReservationStatus = (id, status) => api.put(`/admin/reservations/${id}`, { status });
