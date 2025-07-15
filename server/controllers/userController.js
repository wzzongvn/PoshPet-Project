// 파일: server/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. 회원가입 기능
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 이미 가입된 이메일인지 확인
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: '이미 가입된 이메일입니다.' });
    }

    // 새 사용자 객체 생성
    user = new User({ name, email, password });

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 데이터베이스에 저장
    await user.save();

    res.status(201).json({ msg: '회원가입이 성공적으로 완료되었습니다.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류가 발생했습니다.');
  }
};

// 2. 로그인 기능
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 사용자가 존재하는지 확인
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: '이메일 또는 비밀번호가 유효하지 않습니다.' });
    }

    // 비밀번호가 일치하는지 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: '이메일 또는 비밀번호가 유효하지 않습니다.' });
    }

    // 로그인 성공 시, JWT 토큰 생성
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      'mySecretToken', // 중요: 실제 서비스에서는 이 값을 .env 파일로 옮겨야 합니다.
      { expiresIn: 3600 }, // 1시간 동안 유효
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { name: user.name, email: user.email } });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류가 발생했습니다.');
  }
};