/*
* =======================================================================
* 1단계: 파일 수정 - client/src/services/api.js
* =======================================================================
* 설명: 리뷰 작성 및 조회를 위한 API 함수를 추가합니다.
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
export const getAllServices = () => api.get('/services');
export const createService = (serviceData) => api.post('/services', serviceData);
export const getAvailableSlots = (date) => api.get(`/reservations/available-slots?date=${date}`);
export const getDashboardStats = () => api.get('/dashboard/stats');
export const getAllUsers = () => api.get('/admin/users');

// ★★★ 리뷰 API 함수 추가 ★★★
export const createReview = (reviewData) => api.post('/reviews', reviewData);
export const getAllReviews = () => api.get('/reviews');