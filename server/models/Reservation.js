// 파일: server/models/Reservation.js (수정)
const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  // ... user, pet 필드는 변경 없음 ...
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },

  // --- 이 부분을 수정합니다 ---
  service: { // 예약한 서비스
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service', // Service 모델을 참조
    required: true,
  },
  // --------------------------

  reservationDate: { // 예약 날짜 및 시간
    type: Date,
    required: true,
  },
  // ... status, notes, timestamps 등은 변경 없음 ...
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);