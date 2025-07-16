// 파일: server/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reviewController = require('../controllers/reviewController');

// POST /api/reviews : 새 리뷰 작성하기 (로그인 필요)
router.post('/', auth, reviewController.createReview);

// GET /api/reviews : 모든 리뷰 목록 보기 (누구나 가능)
router.get('/', reviewController.getAllReviews);

module.exports = router;