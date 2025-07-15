// 파일: server/controllers/petController.js
const Pet = require('../models/Pet');

// 로그인한 사용자의 반려동물 추가
exports.addPet = async (req, res) => {
  try {
    const { name, type, breed, birthDate, notes } = req.body;
    const newPet = new Pet({
      owner: req.user.id, // 인증 미들웨어에서 추가해준 사용자 ID
      name,
      type,
      breed,
      birthDate,
      notes,
    });
    const pet = await newPet.save();
    res.status(201).json(pet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};

// 로그인한 사용자의 모든 반려동물 정보 가져오기
exports.getMyPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user.id });
    res.json(pets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};