/*
* =======================================================================
* 파일: server/controllers/reservationController.js (최종본)
* =======================================================================
*/
const Reservation = require('../models/Reservation');

exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    const searchDate = new Date(date);
    const nextDate = new Date(date);
    nextDate.setDate(searchDate.getDate() + 1);
    const reservationsOnDate = await Reservation.find({ reservationDate: { $gte: searchDate, $lt: nextDate } });
    const bookedTimes = reservationsOnDate.map(res => res.reservationDate.toISOString());
    const availableSlots = [];
    for (let hour = 10; hour < 18; hour += 2) {
        const slotTime = new Date(date);
        slotTime.setHours(hour, 0, 0, 0);
        if (!bookedTimes.includes(slotTime.toISOString())) {
            availableSlots.push(slotTime);
        }
    }
    res.json(availableSlots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};

exports.createReservation = async (req, res) => {
  try {
    const { petId, serviceId, reservationDate, notes } = req.body;
    const existingReservation = await Reservation.findOne({ reservationDate });
    if (existingReservation) {
        return res.status(400).json({ msg: '이미 예약된 시간입니다.' });
    }
    const newReservation = new Reservation({ user: req.user.id, pet: petId, service: serviceId, reservationDate, notes });
    const reservation = await newReservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate('pet', 'name type').populate('service', 'name price');
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};