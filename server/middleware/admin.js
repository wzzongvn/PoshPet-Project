// 파일: server/middleware/admin.js

module.exports = function(req, res, next) {
  // auth 미들웨어에서 req.user에 사용자 정보를 넣어주었다고 가정합니다.
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ msg: '접근 권한이 없습니다. 관리자만 접근할 수 있습니다.' });
  }
  // 사용자가 관리자일 경우, 다음 단계로 진행합니다.
  next();
};