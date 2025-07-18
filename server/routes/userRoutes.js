/*
* =======================================================================
* 파일: server/routes/userRoutes.js (최종본)
* =======================================================================
*/
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
module.exports = router;