// 파일: server/controllers/reservationController.js
const Reservation = require('../models/Reservation');

// 새 예약 생성
exports.createReservation = async (req, res) => {
  try {
    const { petId, serviceName, reservationDate, notes } = req.body;
    const newReservation = new Reservation({
      user: req.user.id,
      pet: petId,
      serviceName,
      reservationDate,
      notes,
    });
    const reservation = await newReservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};

// 내 예약 목록 보기
exports.getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate('pet', 'name type');
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};
