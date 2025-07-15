/*
* =======================================================================
* 파일: server/controllers/serviceController.js (최종본)
* =======================================================================
*/
const Service = require('../models/Service');

exports.createService = async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;
    console.log('Received new service data:', req.body);
    if (!name || !price || !duration) {
      return res.status(400).json({ msg: '서비스명, 가격, 소요 시간은 필수 항목입니다.' });
    }
    const newService = new Service({ name, description, price, duration });
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    console.error("Service creation error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ msg: '이미 존재하는 서비스 이름입니다.' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: `입력값 오류: ${err.message}` });
    }
    res.status(500).json({ msg: '서버 내부 오류가 발생했습니다.' });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error("Get all services error:", err);
    res.status(500).json({ msg: '서버에서 서비스 목록을 가져오는 중 오류가 발생했습니다.' });
  }
};