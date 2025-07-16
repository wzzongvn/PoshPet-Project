/*
* =======================================================================
* 파일: server/models/Service.js (최종본)
* =======================================================================
*/
const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
});
module.exports = mongoose.model('Service', ServiceSchema);