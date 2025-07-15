// 파일: server/models/Pet.js
const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  owner: { // 반려동물의 주인
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User 모델을 참조합니다.
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: { // e.g., 'Dog', 'Cat'
    type: String,
    required: true,
  },
  breed: { // 품종
    type: String,
  },
  birthDate: {
    type: Date,
  },
  notes: { // 특이사항
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);