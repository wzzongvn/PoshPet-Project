/*
* =======================================================================
* 파일: server/models/Pet.js (최종본)
* =======================================================================
*/
const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String },
  birthDate: { type: Date },
  notes: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Pet', PetSchema);