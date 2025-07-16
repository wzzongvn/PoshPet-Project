/*
* 1.3. 파일 수정: server/controllers/dashboardController.js
* -----------------------------------------------------------------------
* 설명: 총 매출, 총 고객 수, 총 예약 수 등 핵심 지표를 계산하는 로직을 추가합니다.
*/
const Reservation = require('../models/Reservation');
const User = require('../models/User'); // User 모델 import
const mongoose = require('mongoose');

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. 핵심 성과 지표 (KPI)
    const totalRevenue = await Reservation.aggregate([
      { $match: { status: 'Completed' } },
      { $lookup: { from: 'services', localField: 'service', foreignField: '_id', as: 'serviceDetails' } },
      { $unwind: '$serviceDetails' },
      { $group: { _id: null, total: { $sum: "$serviceDetails.price" } } }
    ]);

    const totalUsers = await User.countDocuments();
    const totalReservations = await Reservation.countDocuments();

    // 2. 월별 매출 통계 (변경 없음)
    const monthlySales = await Reservation.aggregate([
        // ... (이전과 동일한 코드)
    ]);

    // 3. 서비스별 예약 수 통계 (변경 없음)
    const serviceCounts = await Reservation.aggregate([
        // ... (이전과 동일한 코드)
    ]);
    
    res.json({
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      totalUsers,
      totalReservations,
      monthlySales,
      serviceCounts
    });

  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ msg: '대시보드 데이터를 불러오는 중 오류 발생' });
  }
};