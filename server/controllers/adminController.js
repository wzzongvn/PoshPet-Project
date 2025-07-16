/*
* 1.1. 파일 수정: server/controllers/adminController.js
* -----------------------------------------------------------------------
* 설명: 모든 사용자(고객) 목록을 조회하는 기능을 추가합니다.
*/
const Reservation = require('../models/Reservation');
const User = require('../models/User'); // User 모델 import

// 모든 예약 내역 가져오기 (변경 없음)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('pet', 'name type')
      .populate('service', 'name price');
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};

// 예약 상태 변경하기 (변경 없음)
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

// ★★★ 모든 사용자 목록 가져오기 (새 기능 추가) ★★★
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};