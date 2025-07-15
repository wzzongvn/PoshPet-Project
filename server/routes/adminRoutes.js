// 파일: server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // 1차: 로그인 인증
const admin = require('../middleware/admin'); // 2차: 관리자 권한 확인
const adminController = require('../controllers/adminController');

// GET /api/admin/reservations : 모든 예약 목록 보기 (로그인 + 관리자 권한 필요)
router.get('/reservations', [auth, admin], adminController.getAllReservations);

// PUT /api/admin/reservations/:id : 특정 예약의 상태 변경하기 (로그인 + 관리자 권한 필요)
router.put('/reservations/:id', [auth, admin], adminController.updateReservationStatus);

module.exports = router;
