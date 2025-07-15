/*
* =======================================================================
* 파일: server/middleware/admin.js (최종본)
* =======================================================================
*/
module.exports = function(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ msg: '접근 권한이 없습니다. 관리자만 접근할 수 있습니다.' });
  }
  next();
};