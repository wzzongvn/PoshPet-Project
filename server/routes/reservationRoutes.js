/*
* =======================================================================
* 파일: server/routes/reservationRoutes.js (최종본)
* =======================================================================
*/
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reservationController = require('../controllers/reservationController');
router.get('/available-slots', reservationController.getAvailableSlots);
router.post('/', auth, reservationController.createReservation);
router.get('/', auth, reservationController.getMyReservations);
module.exports = router;