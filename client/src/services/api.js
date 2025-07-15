/*
* =======================================================================
* 새 파일: client/src/services/api.js
* =======================================================================
* 설명: 서버와 통신하는 모든 함수를 이곳에 모아 관리합니다.
* 이렇게 하면 코드가 깔끔해지고 유지보수가 쉬워집니다.
* (먼저 client 폴더에 'services' 라는 새 폴더를 만들어주세요.)
*/
import axios from 'axios';

const API_URL = 'https://poshpet-server.onrender.com/api'; // Render 서버 주소

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 회원가입 요청 함수
export const registerUser = (userData) => {
  return api.post('/users/register', userData);
};

// 로그인 요청 함수
export const loginUser = (userData) => {
  return api.post('/users/login', userData);
};

// 나중에 예약 기능 등을 위한 함수들을 여기에 추가할 수 있습니다.
// export const createReservation = (reservationData) => { ... };