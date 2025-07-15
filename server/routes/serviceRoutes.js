// 파일: server/routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const serviceController = require('../controllers/serviceController');

// POST /api/services : 새 서비스 만들기 (관리자)
router.post('/', [auth, admin], serviceController.createService);
// GET /api/services : 모든 서비스 목록 보기 (모든 사용자)
router.get('/', serviceController.getAllServices);

module.exports = router;