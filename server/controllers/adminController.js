/*
* =======================================================================
* 파일: server/controllers/adminController.js (최종본)
* =======================================================================
*/
const Reservation = require('../models/Reservation');

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 }).populate('user', 'name email').populate('pet', 'name type');
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};

exports.updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservationId = req.params.id;
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ msg: '예약을 찾을 수 없습니다.' });
    }
    reservation.status = status;
    await reservation.save();
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};