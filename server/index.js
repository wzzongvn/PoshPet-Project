// server/index.js (수정된 버전)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // mongoose 추가
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// --- DB 연결 코드 추가 ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB 데이터베이스에 성공적으로 연결되었습니다.'))
  .catch(err => console.error('MongoDB 연결 실패:', err));
// -----------------------

app.get('/', (req, res) => {
  res.send('PoshPet 서버가 살아있어요!');
});

// --- 사용자 인증 API 라우트 연결 (이 부분을 추가) ---
app.use('/api/users', require('./routes/userRoutes'));
// ----------------------------------------------------

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
