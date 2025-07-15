컨트롤러 생성: server/controllers 폴더 안에 serviceController.js 파일을 만들고 아래 코드를 붙여넣습니다.

// 파일: server/controllers/serviceController.js
const Service = require('../models/Service');

// (관리자용) 새 서비스 추가
exports.createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: '서버 오류' });
  }
};

// (고객용) 모든 서비스 목록 가져오기
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: '서버 오류' });
  }
};