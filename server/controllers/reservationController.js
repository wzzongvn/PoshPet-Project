// 파일: server/controllers/reservationController.js (수정)
const Reservation = require('../models/Reservation');
const Service = require('../models/Service');

// 특정 날짜에 예약 가능한 시간 슬롯 가져오기
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query; // e.g., '2025-12-25'
    const searchDate = new Date(date);
    const nextDate = new Date(date);
    nextDate.setDate(searchDate.getDate() + 1);

    // 해당 날짜의 모든 예약을 찾습니다.
    const reservationsOnDate = await Reservation.find({
      reservationDate: {
        $gte: searchDate,
        $lt: nextDate,
      },
    });
    const bookedTimes = reservationsOnDate.map(res => res.reservationDate.toISOString());

    // 예시: 오전 10시부터 오후 6시까지, 2시간 간격으로 슬롯 생성
    const availableSlots = [];
    for (let hour = 10; hour < 18; hour += 2) {
        const slotTime = new Date(date);
        slotTime.setHours(hour, 0, 0, 0);

        // 이미 예약된 시간이 아니라면, 가능한 슬롯으로 추가
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

// 새 예약 생성 (수정)
exports.createReservation = async (req, res) => {
  try {
    // serviceName 대신 service(ID)를 받습니다.
    const { petId, serviceId, reservationDate, notes } = req.body;

    // 중복 예약 확인
    const existingReservation = await Reservation.findOne({ reservationDate });
    if (existingReservation) {
        return res.status(400).json({ msg: '이미 예약된 시간입니다.' });
    }

    const newReservation = new Reservation({
      user: req.user.id,
      pet: petId,
      service: serviceId, // 서비스 ID로 저장
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

// 내 예약 목록 보기 (수정)
exports.getMyReservations = async (req, res) => {
  try {
    // service 필드의 name과 price를 함께 가져오도록 수정
    const reservations = await Reservation.find({ user: req.user.id })
        .populate('pet', 'name type')
        .populate('service', 'name price');
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};