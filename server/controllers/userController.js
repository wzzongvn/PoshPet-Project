/*
* =======================================================================
* 파일: server/controllers/userController.js (최종본)
* =======================================================================
*/
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: '이미 가입된 이메일입니다.' });
    }
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).json({ msg: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류가 발생했습니다.');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: '이메일 또는 비밀번호가 유효하지 않습니다.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: '이메일 또는 비밀번호가 유효하지 않습니다.' });
    }
    const payload = { user: { id: user.id, name: user.name, role: user.role } };
    jwt.sign(payload, 'mySecretToken', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류가 발생했습니다.');
  }
};