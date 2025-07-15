/*
* =======================================================================
* 파일: client/src/services/api.js
* =======================================================================
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