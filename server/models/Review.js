// 파일: server/models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { // 리뷰 작성자
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reservation: { // 어떤 예약에 대한 리뷰인지 연결
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
    unique: true, // 하나의 예약에는 하나의 리뷰만 작성 가능
  },
  service: { // 어떤 서비스에 대한 리뷰인지 연결
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  rating: { // 평점 (1~5)
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  text: { // 후기 내용
    type: String,
    required: true,
  },
  photoUrl: { // 고객이 올린 후기 사진 URL
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);