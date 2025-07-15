// 파일: server/routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reservationController = require('../controllers/reservationController');

// POST /api/reservations : 새 예약 만들기 (로그인 필요)
router.post('/', auth, reservationController.createReservation);

// GET /api/reservations : 내 예약 목록 보기 (로그인 필요)
router.get('/', auth, reservationController.getMyReservations);

module.exports = router;