// 파일: server/models/Service.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { // 서비스 이름 (e.g., '전문 미용')
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  price: { // 가격
    type: Number,
    required: true,
  },
  duration: { // 소요 시간 (분 단위)
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Service', ServiceSchema);