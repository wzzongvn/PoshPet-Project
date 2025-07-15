// 파일: server/routes/reservationRoutes.js (수정)
// ... 기존 코드 ...
const reservationController = require('../controllers/reservationController');

// GET /api/reservations/available-slots?date=YYYY-MM-DD : 가능한 시간 슬롯 보기
router.get('/available-slots', reservationController.getAvailableSlots);

router.post('/', auth, reservationController.createReservation);
router.get('/', auth, reservationController.getMyReservations);

module.exports = router;