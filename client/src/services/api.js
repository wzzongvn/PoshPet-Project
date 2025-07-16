/*
* =======================================================================
* 파일: client/src/services/api.js (수정)
* =======================================================================
* 설명: 모든 API 요청에 자동으로 인증 토큰을 포함하도록 수정합니다.
* 이 수정으로 인해 관리자 페이지의 모든 기능이 정상적으로 작동하게 됩니다.
*/
import axios from 'axios';

const API_URL = 'https://poshpet-server.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ★★★ 문제 해결: 모든 요청에 자동으로 인증 토큰을 포함시킵니다. ★★★
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);
export const getMyPets = () => api.get('/pets');
export const addPet = (petData) => api.post('/pets', petData);
export const createReservation = (reservationData) => api.post('/reservations', reservationData);
export const getMyReservations = () => api.get('/reservations');
export const getAllReservations = () => api.get('/admin/reservations');
export const updateReservationStatus = (id, status) => api.put(`/admin/reservations/${id}`, { status });
export const getAllServices = () => api.get('/services');
export const createService = (serviceData) => api.post('/services', serviceData);
export const getAvailableSlots = (date) => api.get(`/reservations/available-slots?date=${date}`);
// ★★★ 대시보드 통계 API 함수 추가 ★★★
export const getDashboardStats = () => api.get('/dashboard/stats');