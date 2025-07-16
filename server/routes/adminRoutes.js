/*
* =======================================================================
* 파일: server/routes/adminRoutes.js (최종본)
* =======================================================================
*/
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const adminController = require('../controllers/adminController');
router.get('/reservations', [auth, admin], adminController.getAllReservations);
router.put('/reservations/:id', [auth, admin], adminController.updateReservationStatus);
router.get('/users', [auth, admin], adminController.getAllUsers);
module.exports = router;