/*
* =======================================================================
* 파일: client/src/services/api.js (수정)
* =======================================================================
* 설명: 서비스 목록 조회, 새 서비스 추가, 예약 가능 시간 조회 API 함수를 추가합니다.
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
export const getAllReservations = () => api.get('/admin/reservations');
export const updateReservationStatus = (id, status) => api.put(`/admin/reservations/${id}`, { status });

// ★★★ 서비스 및 시간 슬롯 API 함수 추가 ★★★
export const getAllServices = () => api.get('/services');
export const createService = (serviceData) => api.post('/services', serviceData);
export const getAvailableSlots = (date) => api.get(`/reservations/available-slots?date=${date}`);
