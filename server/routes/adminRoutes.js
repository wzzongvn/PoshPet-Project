/*
* 1.2. 파일 수정: server/routes/adminRoutes.js
* -----------------------------------------------------------------------
* 설명: 모든 사용자 목록을 조회하는 API 주소를 추가합니다.
*/
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const adminController = require('../controllers/adminController');

router.get('/reservations', [auth, admin], adminController.getAllReservations);
router.put('/reservations/:id', [auth, admin], adminController.updateReservationStatus);

// ★★★ 모든 사용자 목록 보기 API 라우트 추가 ★★★
router.get('/users', [auth, admin], adminController.getAllUsers);

module.exports = router;