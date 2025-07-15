/*
* =======================================================================
* 파일: server/routes/petRoutes.js (최종본)
* =======================================================================
*/
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const petController = require('../controllers/petController');
router.post('/', auth, petController.addPet);
router.get('/', auth, petController.getMyPets);
module.exports = router;