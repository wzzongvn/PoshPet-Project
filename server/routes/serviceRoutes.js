/*
* =======================================================================
* 파일: server/routes/serviceRoutes.js (최종본)
* =======================================================================
*/
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const serviceController = require('../controllers/serviceController');
router.post('/', [auth, admin], serviceController.createService);
router.get('/', serviceController.getAllServices);
module.exports = router;