// 파일: server/controllers/serviceController.js (수정)
const Service = require('../models/Service');

// (관리자용) 새 서비스 추가
exports.createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    console.error("Service creation error:", err.message); // 서버 로그에 에러 기록
    // ★★★ 문제 해결: 프론트엔드로 더 구체적인 에러 메시지를 전달합니다. ★★★
    if (err.code === 11000) { // 중복된 이름(unique) 오류일 경우
      return res.status(400).json({ msg: '이미 존재하는 서비스 이름입니다.' });
    }
    res.status(500).json({ msg: '서버 오류가 발생했습니다. 입력값을 확인해주세요.' });
  }
};

// (고객용) 모든 서비스 목록 가져오기
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: '서버 오류' });
  }
};