/*
* =======================================================================
* 파일: client/src/services/api.js (수정)
* =======================================================================
* 설명: 나의 예약 내역을 서버로부터 가져오는 API 함수를 추가합니다.
*/
import axios from 'axios';

const API_URL = 'https://poshpet-server.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

// ★★★ 내 예약 목록 가져오기 함수 추가 ★★★
export const getMyReservations = () => api.get('/reservations');