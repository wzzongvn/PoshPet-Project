/*
* =======================================================================
* 파일: server/middleware/auth.js (최종본)
* =======================================================================
*/
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: '인증 토큰이 없어 접근이 거부되었습니다.' });
  }
  try {
    const decoded = jwt.verify(token, 'mySecretToken');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: '토큰이 유효하지 않습니다.' });
  }
};