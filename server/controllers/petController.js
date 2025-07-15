/*
* =======================================================================
* 파일: server/controllers/petController.js (최종본)
* =======================================================================
*/
const Pet = require('../models/Pet');

exports.addPet = async (req, res) => {
  try {
    const { name, type, breed, birthDate, notes } = req.body;
    const newPet = new Pet({ owner: req.user.id, name, type, breed, birthDate, notes });
    const pet = await newPet.save();
    res.status(201).json(pet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};

exports.getMyPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user.id });
    res.json(pets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
};