// 파일: server/routes/petRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // 인증 미들웨어
const petController = require('../controllers/petController');

// POST /api/pets : 내 반려동물 추가 (로그인 필요)
router.post('/', auth, petController.addPet);

// GET /api/pets : 내 반려동물 목록 보기 (로그인 필요)
router.get('/', auth, petController.getMyPets);

module.exports = router;