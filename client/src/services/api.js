/*
* =======================================================================
* 파일: client/src/services/api.js (수정)
* =======================================================================
* 설명: 서버와 통신하는 모든 함수를 이곳에 모아 관리합니다.
* 반려동물 추가/조회, 예약 생성 API 함수를 추가하고,
* 모든 요청에 자동으로 인증 토큰을 포함하도록 수정합니다.
*/
import axios from 'axios';

const API_URL = 'https://poshpet-server.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: API 요청을 보내기 전에 토큰을 헤더에 추가
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

// 회원가입 요청 함수
export const registerUser = (userData) => api.post('/users/register', userData);

// 로그인 요청 함수
export const loginUser = (userData) => api.post('/users/login', userData);

// --- 반려동물 API 함수 추가 ---
// 내 반려동물 목록 가져오기
export const getMyPets = () => api.get('/pets');

// 새 반려동물 추가하기
export const addPet = (petData) => api.post('/pets', petData);

// --- 예약 API 함수 추가 ---
// 새 예약 생성하기
export const createReservation = (reservationData) => api.post('/reservations', reservationData);
