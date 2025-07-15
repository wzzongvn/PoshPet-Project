/*
* =======================================================================
* 파일: server/models/Reservation.js (최종본)
* =======================================================================
*/
const mongoose = require('mongoose');
const ReservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  reservationDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
  notes: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('Reservation', ReservationSchema);