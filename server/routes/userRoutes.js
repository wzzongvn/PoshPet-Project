// 파일: server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /api/users/register
// 회원가입을 위한 주소
router.post('/register', userController.registerUser);

// POST /api/users/login
// 로그인을 위한 주소
router.post('/login', userController.loginUser);

module.exports = router;