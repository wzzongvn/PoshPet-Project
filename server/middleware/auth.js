// 파일: server/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 요청 헤더에서 토큰을 가져옵니다.
  const token = req.header('x-auth-token');

  // 토큰이 없는 경우
  if (!token) {
    return res.status(401).json({ msg: '인증 토큰이 없어 접근이 거부되었습니다.' });
  }

  // 토큰 검증
  try {
    const decoded = jwt.verify(token, 'mySecretToken'); // 로그인 시 사용했던 비밀키
    req.user = decoded.user; // 요청 객체에 사용자 정보를 추가
    next(); // 다음 단계로 진행
  } catch (err) {
    res.status(401).json({ msg: '토큰이 유효하지 않습니다.' });
  }
};
