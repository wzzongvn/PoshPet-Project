/*
* 2.2. 새 파일: server/routes/dashboardRoutes.js
* -----------------------------------------------------------------------
* 설명: 대시보드 데이터 API를 위한 주소를 정의합니다.
*/
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const dashboardController = require('../controllers/dashboardController');

// GET /api/dashboard/stats : 대시보드 통계 데이터 가져오기
router.get('/stats', [auth, admin], dashboardController.getDashboardStats);

module.exports = router;