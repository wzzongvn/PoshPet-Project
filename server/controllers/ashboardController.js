/*
* =======================================================================
* 2단계: 백엔드(서버) 개발 - 대시보드 데이터 API 생성
* =======================================================================
* 설명: 차트에 필요한 데이터를 계산하여 프론트엔드로 보내주는
* 새로운 API를 서버에 추가합니다.
*/

/*
* 2.1. 새 파일: server/controllers/dashboardController.js
* -----------------------------------------------------------------------
* 설명: 월별 매출, 서비스별 예약 수 등 통계 데이터를 계산하는 로직입니다.
*/
const Reservation = require('../models/Reservation');
const mongoose = require('mongoose');

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. 월별 매출 통계
    const monthlySales = await Reservation.aggregate([
      {
        $match: { status: 'Completed' } // '완료'된 예약만 매출로 집계
      },
      {
        $lookup: { // Reservation과 Service 컬렉션을 조인
          from: 'services',
          localField: 'service',
          foreignField: '_id',
          as: 'serviceDetails'
        }
      },
      {
        $unwind: '$serviceDetails'
      },
      {
        $group: {
          _id: { year: { $year: "$reservationDate" }, month: { $month: "$reservationDate" } },
          totalRevenue: { $sum: "$serviceDetails.price" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // 2. 서비스별 예약 수 통계
    const serviceCounts = await Reservation.aggregate([
      {
        $lookup: {
          from: 'services',
          localField: 'service',
          foreignField: '_id',
          as: 'serviceDetails'
        }
      },
      { $unwind: '$serviceDetails' },
      {
        $group: {
          _id: "$serviceDetails.name",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json({ monthlySales, serviceCounts });

  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ msg: '대시보드 데이터를 불러오는 중 오류 발생' });
  }
};