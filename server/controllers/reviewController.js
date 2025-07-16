// 파일: server/controllers/reviewController.js
const Review = require('../models/Review');
const Reservation = require('../models/Reservation');

// 새 리뷰 작성
exports.createReview = async (req, res) => {
  try {
    const { reservationId, rating, text } = req.body;

    // 1. 유효한 예약인지, 'Completed' 상태인지 확인
    const reservation = await Reservation.findById(reservationId);
    if (!reservation || reservation.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: '리뷰를 작성할 권한이 없습니다.' });
    }
    if (reservation.status !== 'Completed') {
      return res.status(400).json({ msg: '완료된 예약에 대해서만 리뷰를 작성할 수 있습니다.' });
    }

    // 2. 이미 작성된 리뷰가 있는지 확인
    const existingReview = await Review.findOne({ reservation: reservationId });
    if (existingReview) {
      return res.status(400).json({ msg: '이미 이 예약에 대한 리뷰를 작성했습니다.' });
    }

    // 3. 새 리뷰 생성 및 저장
    const newReview = new Review({
      user: req.user.id,
      reservation: reservationId,
      service: reservation.service,
      rating,
      text,
      // photoUrl은 나중에 파일 업로드 기능 추가 시 구현
    });

    await newReview.save();
    res.status(201).json(newReview);

  } catch (err) {
    console.error("Create review error:", err);
    res.status(500).json({ msg: '리뷰를 작성하는 중 서버 오류가 발생했습니다.' });
  }
};

// 모든 리뷰 목록 가져오기 (공개용)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name')
      .populate('service', 'name');
    res.json(reviews);
  } catch (err) {
    console.error("Get all reviews error:", err);
    res.status(500).json({ msg: '리뷰를 불러오는 중 서버 오류가 발생했습니다.' });
  }
};