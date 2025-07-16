/*
* 2.1. 새 파일: server/controllers/dashboardController.js
* -----------------------------------------------------------------------
* 설명: 월별 매출, 서비스별 예약 수 등 통계 데이터를 계산하는 로직입니다.
*/
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Service = require('../models/Service');

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. 핵심 성과 지표 (KPI)
    const totalRevenueResult = await Reservation.aggregate([
      { $match: { status: 'Completed' } },
      { $lookup: { from: 'services', localField: 'service', foreignField: '_id', as: 'serviceDetails' } },
      { $unwind: '$serviceDetails' },
      { $group: { _id: null, total: { $sum: "$serviceDetails.price" } } }
    ]);
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

    const totalUsers = await User.countDocuments();
    const totalReservations = await Reservation.countDocuments();

    // 2. 월별 매출 통계
    const monthlySales = await Reservation.aggregate([
      { $match: { status: 'Completed' } },
      { $lookup: { from: 'services', localField: 'service', foreignField: '_id', as: 'serviceDetails' } },
      { $unwind: '$serviceDetails' },
      {
        $group: {
          _id: { year: { $year: "$reservationDate" }, month: { $month: "$reservationDate" } },
          totalRevenue: { $sum: "$serviceDetails.price" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // 3. 서비스별 예약 수 통계
    const serviceCounts = await Reservation.aggregate([
      { $lookup: { from: 'services', localField: 'service', foreignField: '_id', as: 'serviceDetails' } },
      { $unwind: '$serviceDetails' },
      {
        $group: {
          _id: "$serviceDetails.name",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      totalRevenue,
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