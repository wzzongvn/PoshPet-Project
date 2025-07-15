// 파일: server/models/Reservation.js
const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  user: { // 예약한 사용자
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pet: { // 예약된 반려동물
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
  },
  serviceName: { // 예약한 서비스 이름 (e.g., '전문 미용')
    type: String,
    required: true,
  },
  reservationDate: { // 예약 날짜 및 시간
    type: Date,
    required: true,
  },
  status: { // 예약 상태
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  notes: { // 고객 요청사항
      type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);