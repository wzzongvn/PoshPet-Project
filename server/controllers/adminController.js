// 파일: server/controllers/adminController.js
const Reservation = require('../models/Reservation');
const User = require('../models/User');

// 모든 예약 내역 가져오기
exports.getAllReservations = async (req, res) => {
  try {
    // 최신 예약이 위로 오도록 정렬하고, 사용자 및 펫 정보를 함께 가져옵니다.
    const reservations = await Reservation.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email') // User 모델에서 name과 email 필드만 가져옴
      .populate('pet', 'name type');   // Pet 모델에서 name과 type 필드만 가져옴
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};

// 예약 상태 변경하기
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